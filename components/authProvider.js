import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import { GetCookie, SetCookie } from "../util/cookie";

// initial state
export const AuthContext = createContext({
    login: null,
    loginWithRedirect: null,
    getAccessToken: null,
    refreshAccessToken: null,
    logout: null,
});

export default function AuthProvider(props) {
    const router = useRouter();

    const authBaseDomain = props.authBaseDomain;
    const loginURI = props.loginURI;

    //FIXME: repeated code with loginWithRedirect
    const login = (username, password) => {
        fetch(authBaseDomain + "/api/auth/authenticate", {
            method: "POST", body: JSON.stringify({username: username, password: password}),
        }).then((resp) => {
            if (resp.status == 200) {
                resp.json().then((data) => {
                    console.log(data);
                    SetCookie("access_token", data.access_token, 1);
                    SetCookie("refresh_token", data.refresh_token, 7);
                });
            }

            else if (resp.status == 401) {
                console.log("user not authorized");
            }

            else {
                resp.text().then((text) => {
                    console.log(text);
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const loginWithRedirect = (username, password, redirectURI) => {
        fetch(authBaseDomain + "/api/auth/authenticate", {
            method: "POST", body: JSON.stringify({username: username, password: password}),
        }).then((resp) => {
            if (resp.status == 200) {
                resp.json().then((data) => {
                    SetCookie("access_token", data.access_token, 1);
                    SetCookie("refresh_token", data.refresh_token, 7);

                    router.push(redirectURI ? redirectURI : "/");
                });
            }

            else if (resp.status == 401) {
                router.push(props.createUserURI);
            }

            else {
                resp.text().then((text) => {
                    console.log(text);
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    const getAccessToken = () => {
        return new Promise((resolve, reject) => {
            const accessToken = GetCookie("access_token");
            if (accessToken === "") {
                reject("empty access token, user may not be logged in");
            }

            // maybe later checking if the access_token is valid, if not, the
            // function should also get a new access and refresh token
            resolve(accessToken);
        })
    };

    const refreshAccessToken = () => {
        refreshToken = GetCookie("refresh_token");
        if (refreshToken === "") {
            throw new Error("empty refresh token, user may not be logged in");
        }

        fetch(authBaseDomain + `/api/auth/refresh?token=${accessToken}`, {
            method: "POST",
        }).then((resp) => {
            if (resp.status == 200) {
                resp.json().then((data) => {
                    console.log(data);
                    SetCookie("access_token", data.access_token, 1);
                    SetCookie("refresh_token", data.refresh_token, 7);
                });
            }

            else if (resp.status == 401) {
                router.push(loginURI);
            }

            else {
                resp.text().then((text) => {
                    console.log(text);
                });
            }
        }).catch((err) => {
            console.log(err);
        });

        return refreshToken;
    };

    const logout = () => {
        SetCookie("access_token", null);
        SetCookie("refresh_token", null);
    };

    return (
        <AuthContext.Provider
            value={{login, loginWithRedirect, getAccessToken, refreshAccessToken, logout}}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
