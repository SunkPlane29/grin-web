import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { SetCookie } from "../util/cookie";

export function LoginButton(props) {
    const { loginWithRedirect } = useAuth0();
    
    const loginUser = () => {
        SetCookie("wasLogged", true, 7);
        loginWithRedirect();
    }

    return <button onClick={loginUser} className={props.className}>{props.children}</button>;
}

export function LogoutButton(props) {
    const { logout } = useAuth0();

    const logoutUser = () => {
        SetCookie("wasLogged", false, 7);
        logout();
    }

    return <button onClick={logoutUser} className={props.className}>{props.children}</button>
}

export function ChangeStateButton(props) {
    const { isLoading, isAuthenticated } = useAuth0();
    const [button, setButton] = useState(<LoginButton className={props.className}>{props.loginContent}</LoginButton>);

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            setButton(<LogoutButton className={props.className}>{props.logoutContent}</LogoutButton>);
        }
    }, [isLoading]);

    return button;
}