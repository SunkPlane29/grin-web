import { useState } from "react";
import styles from "../styles/CreateUser.module.scss";
import CreateUserInput from "../components/createUserInput";
import { useRouter } from "next/router";
import { SetCookie } from "../util/cookie";

export default function CreateUser() {
    const [username, setUsername] = useState("");
    const [alias, setAlias] = useState("");
    const router = useRouter();

    const handlePost = async (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/api/users", 
            {method: "POST", body: JSON.stringify({username: username, alias: alias})}
        ).then((resp) => {
            if (resp.status == 201) {
                router.push("http://localhost:3000/");
                resp.json().then((data) => {
                    SetCookie("id", data.id, 7);
                });
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