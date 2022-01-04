import { useEffect, useState } from "react";
import { GetCookie } from "../util/cookie";
import style from "../styles/Home.module.scss";

async function requestPosts(id) {
    let postData;

    await fetch(`http://localhost:8080/api/users/${id}/posts`, {
        method: "GET", headers: {"Content-Type": "application/json"},
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

    useEffect(() => {
        console.log("fetching posts");

        const id = GetCookie("id");
        if (id === "") {
            console.log("id cookie not found, login may be required");
            return;
        }

        requestPosts(id).then((postData) => {
            setPosts(postData.map((post) => {
                return <p key={post.id}>{post.content}</p>;
            }));
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