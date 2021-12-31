import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export default function Login() {
    const { user, isLoading } = useAuth0();
    const [ redirectURI, setRedirectURI ] = useState("http://localhost:3000/");

    useEffect(() => {
        if (isLoading) {
            return <div>Loading ...</div> ;
        }

        const baseURL = "http://localhost:8080/api/user-exists";
        const id = user?.sub.split('|')[1];
        
        if (id === undefined) {
            return <div>Id is undefined ...</div> 
        }

        if (id === '') {
            // do something
            return <div>Id is invalid ...</div> 
        }
    
        fetch(`${baseURL}?id=${id}`, {method: 'GET'}).then((resp) => {
            if (resp.status === 302) {
                const URI = "http://localhost:3000/"
                setRedirectURI(URI);
                window?.location.replace(URI); //TODO: hardcoded
            } else if (resp.status === 404) {
                const URI = "http://localhost:3000/create-user"
                setRedirectURI(URI);
                window?.location.replace(URI); //TODO: hardcoded
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [user]);

    return (
        <div>
            <a href={redirectURI}>If redirection fails click this link</a>
            <p>{user?.sub.split("|")[1]}</p> 
        </div>
    );
}