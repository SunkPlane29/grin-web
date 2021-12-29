import styles from "../styles/CreateUser.module.css";

export default function CreateUser() {
    return (
        <div className={styles.createUserFormContainer}>
            <form className={styles.createUserForm}>
                <div className={styles.createUserFormItem}>
                    <div className={styles.createUserFormItemContainer}>
                        <label htmlFor="username-input" className={styles.inputLabel}>Input username:</label>
                        <input type="text" id="username-input" className={styles.userInput}/>
                    </div>
                </div>
                <div className={styles.createUserFormItem}>
                    <div className={styles.createUserFormItemContainer}>
                        <label htmlFor="alias-input" className={styles.inputLabel}>Input alias:</label>
                        <input type="text" id="alias-input" className={styles.userInput}/>
                    </div>
                </div>
                <div className={styles.createUserFormInputButton}>
                    <input type="submit" value="Create User" />
                </div>
            </form>
        </div>
    );
}