import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import styles from "../styles/CreateUser.module.css";

//TODO: abstract into components
export default function CreateUser() {
    const { getAccessTokenWithPopup } = useAuth0();
    const [username, setUsername] = useState("");
    const [alias, setAlias] = useState("");

    const handlePost = async (event) => {
        event.preventDefault();
        
        const token = await getAccessTokenWithPopup({
            audience: "https://afda.herokuapp.com",
        });

        fetch("http://localhost:8080/api/users", 
            {method: "POST", headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"}, body: JSON.stringify({username: username, alias: alias})}
        ).then((resp) => {
            if (resp.status == 201) {
                window?.location.replace("http://localhost:3000/");
            }
            else {
                resp.text().then((text) => {
                    console.log(text);
                });
            }    
        });
    };

    return (
        <div className={styles.createUserFormContainer}>
            <form className={styles.createUserForm} onSubmit={(e) => handlePost(e)}>
                <div className={styles.createUserFormItem}>
                    <div className={styles.createUserFormItemContainer}>
                        <label htmlFor="username-input" className={styles.inputLabel}>Input username:</label>
                        <input type="text" id="username-input" className={styles.userInput} value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>
                <div className={styles.createUserFormItem}>
                    <div className={styles.createUserFormItemContainer}>
                        <label htmlFor="alias-input" className={styles.inputLabel}>Input alias:</label>
                        <input type="text" id="alias-input" className={styles.userInput} value={alias} onChange={(e) => setAlias(e.target.value)} />
                    </div>
                </div>
                <div className={styles.createUserFormInputButton}>
                    <input type="submit" value="Create User" />
                </div>
            </form>
        </div>
    );
}