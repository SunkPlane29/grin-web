import { useState } from "react";
import { UserForm, UserInput } from "../components/userForm";
import { AuthContext, useAuth } from "../components/authProvider";

//TODO: add link to create-user
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        login(username, password, "/");
    }

    return (
        <UserForm submitValue="Login" onSubmit={(e) => handleSubmit(e)}>
            <UserInput label="Username:" type="text" onChange={(e) => setUsername(e.target.value)}/>
            <UserInput label="Password:" type="password" onChange={(e) => setPassword(e.target.value)} />
        </UserForm>
    );
}