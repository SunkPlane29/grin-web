import { useRouter } from "next/router";
import { useState } from "react";
import { SetCookie } from "../util/cookie";
import { useAuth } from "./authProvider";

export function LoginButton(props) {
    const router = useRouter();

    const loginUser = () => {
        router.push("/login");
    }

    return <button onClick={loginUser} className={props.className}>{props.children}</button>;
}

export function LogoutButton(props) {
    const { logout } = useAuth();

    const logoutUser = () => {
        logout();
    }

    return <button onClick={logoutUser} className={props.className}>{props.children}</button>
}

export function ChangeStateButton(props) {
    const [button, setButton] = useState(<LoginButton className={props.className}>{props.loginContent}</LoginButton>);

    return button;
}