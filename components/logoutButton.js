import { useAuth0 } from "@auth0/auth0-react";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { SetCookie } from "../util/cookie";

export default function LogoutButton(props) {
    const { logout } = useAuth0();

    return (
        <button 
        onClick={() => {
            logout({returnTo: window !== undefined ? window.location.origin : "http://localhost:3000/"}); 
            SetCookie("wasLogged", false, 7);
        }} 
        className={props.className}
        >Log out</button> 
    );
}