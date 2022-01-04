import Image from "next/image";
import { useEffect, useState } from "react";
import style from "../styles/CreatePost.module.scss";
import ExpandUpIcon from "../public/expand-up.svg";
import ExpandDownIcon from "../public/expand-down.svg";

function CreatePostInput(props) {
    if (props.visible) {
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
    
    return <></>;
}

function ChangeFormVisibilityButton(props) {
    if (props.visible) {
        return <button className={props.className} onClick={props.onClick}>{props.children}</button>;
    }

    return <></>;
}

export default function CreatePostForm() {
    const expandUpIcon = <ExpandUpIcon className={style.expandIcon} height={42} width={42} />;
    const expandDownIcon = <ExpandDownIcon className={style.expandIcon} height={42} width={42} />;

    const [visible, setVisible] = useState(false);
    // const [icon, setIcon] = useState(expandUpIcon);

    // useEffect(() => {
    //     if (visible) {
    //         setIcon(expandDownIcon);
    //     } else {
    //         setIcon(expandUpIcon);
    //     }
    // }, [visible]);

    const changeFormVisibility = () => {
        setVisible(!visible);
    };
    
    const [postContent, setPostContent] = useState("");

    return (
        <div className={style.createPostForm}>
            <div className={style.createPostFormContainer}>    
                <div className={style.changeFormVisibilityBar}>
                    <ChangeFormVisibilityButton className={style.iconButton} onClick={changeFormVisibility} visible={!visible}>{expandUpIcon}</ChangeFormVisibilityButton>
                    <ChangeFormVisibilityButton className={`${style.iconButton} ${style.iconButtonDown}`} onClick={changeFormVisibility} visible={visible}>{expandDownIcon}</ChangeFormVisibilityButton>
                    {/* <button className={style.iconButton} onClick={changeFormVisibility}>{icon}</button> */}
                </div>
                <div>
                    <CreatePostInput visible={visible} value={postContent} onChange={(e) => setPostContent(e.target.value)} />
                </div>
            </div>
        </div>
    );
}
