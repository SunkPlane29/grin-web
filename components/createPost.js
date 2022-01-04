import { useState } from "react";
import { GetCookie } from "../util/cookie";
import style from "../styles/CreatePost.module.scss";
import ExpandUpIcon from "../public/expand-up.svg";
import ExpandDownIcon from "../public/expand-down.svg";

function CreatePostInput(props) {
    return (
        <div className={style.createPostInputContainer}>
            <textarea 
                className={style.createPostInput} 
                onChange={props.onChange} 
                value={props.value} 
            />
        </div>
    );
}

function CreatePostSubmit(props) {
    return (
        <div className={style.createPostSubmitContainer}>
            <button onClick={props.onClick} className={style.createPostSubmit}>{props.children}</button>
        </div>
    );
}

function HiddenContainer(props) {
    if (!props.visible) {
        return <></>
    }

    return <div className={props.className}>{props.children}</div>;
}

function createPostRequest(postContent) {
    const id = GetCookie("id");
    if (id === "") {
        console.log("no id cookie found, login may be required");
        return;
    }

    fetch(`http://localhost:8080/api/posts?id=${id}`, {
        method: "POST", 
        body: JSON.stringify({content: postContent}),
    }).then((resp) => {
        if (resp.status == 201) {
            resp.json().then((data) => {
                console.log(data);
            });
        } else {
            resp.text().then((text) => {
                console.log(text);
            })
        }
    }).catch((err) => {
        console.log(err);
    });
}

export default function CreatePostForm(props) {
    const expandUpIcon = <ExpandUpIcon className={style.expandIcon} height={42} width={42} />;
    const expandDownIcon = <ExpandDownIcon className={style.expandIcon} height={42} width={42} />;

    const [visible, setVisible] = useState(false);

    const changeFormVisibility = () => {
        setVisible(!visible);
    };

    const [postContent, setPostContent] = useState("");

    const handleSubmit = async () => {
        createPostRequest(postContent);
        setPostContent("");
        console.log("updating counter");
        props.updateCounter();
    };
    

    return (
        <div className={style.createPostForm}>
            <div className={style.createPostFormContainer}>    
                <div className={style.changeFormVisibilityBar}>
                    <HiddenContainer visible={!visible}>
                        <button 
                            className={style.iconButton} 
                            onClick={changeFormVisibility}
                        >{expandUpIcon}</button>
                    </HiddenContainer>
                    <HiddenContainer visible={visible}>
                        <button 
                            className={`${style.iconButton} ${style.iconButtonDown}`} 
                            onClick={changeFormVisibility}
                        >{expandDownIcon}</button>
                    </HiddenContainer>
                </div>
                <HiddenContainer visible={visible} className={style.createPostFormHidden}>
                    <CreatePostInput value={postContent} onChange={(e) => setPostContent(e.target.value)} />
                    <CreatePostSubmit onClick={handleSubmit}>Post</CreatePostSubmit>
                </HiddenContainer>
            </div>
        </div>
    );
}
