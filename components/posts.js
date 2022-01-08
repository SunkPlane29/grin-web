import { useEffect, useState } from "react";
import style from "../styles/Home.module.scss";
import { useAuth } from "./authProvider";

async function requestPosts(accessToken) {
    let postData;

    await fetch("http://localhost:8080/api/posts/subscribed", {
        method: "GET", headers: {"Content-Type": "application/json", "Authorization": `Bearer ${accessToken}`},
    }).then((resp) => resp.json())
        .then((data) => {
            postData = data;
            console.log(postData);
        })
        .catch((err) => {
            console.log(err);
        }
    );

    return postData
}

//FIXME: need to sort the posts data in the server
export default function Posts(props) {
    const [posts, setPosts] = useState(<></>);
    const { getAccessToken } = useAuth();

    useEffect( () => {
        getAccessToken().then((accessToken) => {
            requestPosts(accessToken).then((postData) => {
                setPosts(postData.map((post) => {
                    return <p key={post.id}>{post.content}</p>
                }));
            });
        }).catch((err) => {
            console.log(err);
        });
    }, [props.updateCount]);

    return (
        <div className={style.posts}>
            <div className={style.postsContainer}>
                <div>
                    {posts}
                </div>
            </div>
        </div>
    );
}