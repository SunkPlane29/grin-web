import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SetCookie } from "../util/cookie";

export default function Login() {
    const { user } = useAuth0();
    const [ redirectURI, setRedirectURI ] = useState("http://localhost:3000/");
    const router = useRouter();

    useEffect(() => {
        const baseURL = "http://localhost:8080/api/user-exists";
        const id = user?.sub.split('|')[1];
        
        if (id === undefined) {
            return <div>Id is undefined ...</div> 
        }

        if (id === '') {
            // do something
            return <div>Id is invalid ...</div> 
        }

        SetCookie("wasLogged", true, 7);
    
        fetch(`${baseURL}?id=${id}`, {method: 'GET'}).then((resp) => {
            if (resp.status === 302) {
                console.log(user);
                const href = "http://localhost:3000/"
                setRedirectURI(href);
                router.push(href);                
            } else if (resp.status === 404) {
                console.log(user);
                const href = "http://localhost:3000/create-user"
                setRedirectURI(href);
                router.push(href);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [user]);

    return (
        <div>
            <a href={redirectURI}>If redirection fails click this link</a>
        </div>
    );
}