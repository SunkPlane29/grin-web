import styles from "../styles/UserForm.module.scss";

export function UserInput(props) {
    return (
        <div className={styles.userFormItemContainer}>
            <label htmlFor="this_input" className={styles.inputLabel}>{props.label}</label>
            <input placeholder={props.placeholder} type={props.type} id="this_input" className={`${styles.userInput} ${props.className}`} value={props.value} onChange={(e) => props.onChange(e)}/>
        </div>
    );
}

export function UserSubmitButton(props) {
    return (
        <div className={styles.userFormSubmitButton}>
            <input type="submit" value={props.value} />
        </div>
    );
}

export function UserForm(props) {
    const inputs = props.children.map((child, i) => {
        return (
            <div key={i} className={styles.userFormItem}>
                {child}
            </div>
        );
    });

    return (
        <div className={styles.userFormContainer}>
            <form className={styles.userForm} onSubmit={props.onSubmit}>
                {inputs}
                <UserSubmitButton value={props.submitValue} />
            </form>
        </div>
    );
}