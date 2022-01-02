import styles from "../styles/CreateUserInput.module.scss";

export default function CreateUserInput(props) {
    return (
        <div className={styles.createUserFormItemContainer}>
            <label htmlFor="this_input" className={styles.inputLabel}>{props.label}</label>
            <input type="text" id="this_input" className={styles.userInput} value={props.value} onChange={() => props.onChange(e)}/>
        </div>
    );
}