import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

async function getSubPosts(sub) {
    let postData = [];

    sub.map(async (id, i) => {
        const posts = await requestPosts(id);
        postData = postData.concat(posts);
    });

    console.log(postData);

    return (
        <>
            {postData && postData.map((post) => {
                return <p key={post.id}>{post.content}</p>
            })}
        </>
    );
}

async function requestPosts(id) {
    let postData;

    await fetch(`http://localhost:8080/api/users/${id}/posts`, {
        method: "GET", headers: {"Content-Type": "application/json"},
    }).then((resp) => resp.json())
        .then((data) => {
            postData = data;
        })
        .catch((err) => {
            console.log(err);
        }
    );

    return postData
}

export default function Posts() {
    const [posts, setPosts] = useState(<></>);
    const { isAuthenticated, isLoading, user } = useAuth0();

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            getSubPosts([user?.sub.split('|')[1]]).then((postData) => {
                setPosts(postData);
            });
        }
    }, [isLoading]);

    return (
        <div>{posts}</div>
    );
}