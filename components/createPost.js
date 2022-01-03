import Image from "next/image";
import { useEffect, useState } from "react";
import style from "../styles/CreatePost.module.scss";

const expandUpIcon = <span><Image src="/expand-up.svg" className={style.expandIcon} height={42} width={42} /></span>;
const expandDownIcon = <span><Image src="/expand-down.svg" className={style.expandIcon} height={42} width={42} /></span>;

function CreatePostInput(props) {
    if (props.visible) {
        return (
            <div className={style.createPostInputContainer}>
                <textarea 
                    className={props.className} 
                    onChange={props.onChange} 
                    value={props.value} 
                />
            </div>
        );
    }

    return <></>;
}

export default function CreatePostForm() {
    const [visible, setVisible] = useState(false);
    const [icon, setIcon] = useState(expandUpIcon);

    useEffect(() => {
        if (visible) {
            setIcon(expandDownIcon);
        } else {
            setIcon(expandUpIcon);
        }
    }, [visible]);

    const changeFormVisibility = () => {
        setVisible(!visible);
    };
    
    const [postContent, setPostContent] = useState("");

    return (
        <div className={style.createPostForm}>
            <div className={style.createPostFormContainer}>    
                <div className={style.changeFormVisibilityBar}>
                    <button className={style.iconButton} onClick={changeFormVisibility}>{icon}</button>
                </div>
                <div>
                    <CreatePostInput visible={visible} value={postContent} onChange={(e) => setPostContent(e.target.value)} className={style.createPostInput} />
                </div>
            </div>
        </div>
    );
}
