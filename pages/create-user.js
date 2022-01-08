import { useState } from "react";
import { useRouter } from "next/router";
import { UserForm, UserInput } from "../components/userForm";
import commonStyle from "../styles/common.module.scss";
import { useAuth } from "../components/authProvider";

export default function CreateUser() {
    const [username, setUsername] = useState("");
    const [alias, setAlias] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorText, setErrorText] = useState(<></>);

    const router = useRouter();

    const { login, getAccessToken } = useAuth();

    const handlePost = async (event) => {
        event.preventDefault();

        if (confirmPassword !== password) {
            setErrorText(<p style={{color: "#AD1100", marginTop: "32px"}}>Passwords do not match</p>)
            return
        }

        fetch("http://localhost:9090/api/auth/create-user", 
            {method: "POST", body: JSON.stringify({username: username, password: password})}
        ).then(async (resp) => {
            if (resp.status == 201) {
                login(username, password, "/");
                
                const accessToken = await getAccessToken();
                if (accessToken === "") {
                    console.log("no access token");
                    return
                }

                fetch("http://localhost:8080/api/users", {
                    method: "POST",
                    headers: {"Authorization": `Bearer ${accessToken}`},
                    body: JSON.stringify({username: username, alias: alias}),
                }).then((resp) => {
                    resp.json().then((data) => {
                        console.log(data);
                        router.push("/");
                        
                    }).catch((err) => {
                        console.log(err)
                    });
                }).catch((err) => {
                    console.log(err);
                })
            }
            else {
                resp.text().then((text) => {
                    console.log(text);
                });
            }   
        }).catch((err) => {
            console.log(err);
        }).catch((err) => {
            console.log(err)
        });
    };

    return (
        <div>
            <div className={commonStyle.centralize}>
                {errorText}
            </div>
            <UserForm onSubmit={(e) => handlePost(e)} submitValue="Create User">
                <UserInput label="Username:" type="text" placeholder="MyUsername" onChange={(e) => setUsername(e.target.value)} />
                <UserInput label="Alias:" type="text" placeholder="My Alias" onChange={(e) => setAlias(e.target.value)} />
                <UserInput label="Password:" type="password" placeholder="ultra_secret" onChange={(e) => setPassword(e.target.value)} />
                <UserInput label="Confirm Password:" type="password" placeholder="ultra_secret" onChange={(e) => setConfirmPassword(e.target.value)} />
            </UserForm>
        </div>
    );
}