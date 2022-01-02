import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import styles from "../styles/CreateUser.module.scss";
import CreateUserInput from "../components/createUserInput";
import { useRouter } from "next/router";

export default function CreateUser() {
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenWithPopup } = useAuth0();
    const [username, setUsername] = useState("");
    const [alias, setAlias] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            loginWithRedirect();
        }
    }, [isLoading]);

    const handlePost = async (event) => {
        event.preventDefault();

        getAccessTokenWithPopup({audience: "https://afda.herokuapp.com"}).then((token) => {
            fetch("http://localhost:8080/api/users", 
                {method: "POST", headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"}, body: JSON.stringify({username: username, alias: alias})}
            ).then((resp) => {
                if (resp.status == 201) {
                    router.push("http://localhost:3000/");
                }
                else {
                    resp.text().then((text) => {
                        console.log(text);
                    });
                }    
            });
        }).catch((err) => {console.log(err)});
    };

    return (
        <div className={styles.createUserFormContainer}>
            <form className={styles.createUserForm} onSubmit={(e) => handlePost(e)}>
                <div className={styles.createUserFormItem}>
                    <CreateUserInput onChange={(e) => setUsername(e.target.value)} label="Username:" />
                </div>
                <div className={styles.createUserFormItem}>
                    <CreateUserInput onChange={(e) => setAlias(e.target.value)} label="Alias:" />
                </div>
                <div className={styles.createUserFormInputButton}>
                    <input type="submit" value="Create User" />
                </div>
            </form>
        </div>
    );
}