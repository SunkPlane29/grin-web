import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton(props) {
    const { loginWithRedirect } = useAuth0();
    
    return (
        <button onClick={() => loginWithRedirect()} className={props.className}>Log in</button>
    );
}