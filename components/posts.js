import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

async function getSubPosts(sub) {
    const subPosts = sub.map(async (id, i) => {
        const posts = await requestPosts(id);
        console.log(posts)
    })

    return (
        <></>
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

export default function Posts(props) {
    const subscribbed = props.sub;
    const posts = getSubPosts(props.sub);

    return (
        <div></div>
    );
}