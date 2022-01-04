import GrinNavbar from "../components/grinNavbar";
import Posts from "../components/posts";
import { LoginButton, LogoutButton, ChangeStateButton } from "../components/stateButtons";
import style from '../styles/Home.module.scss';
import navStyle from "../styles/GrinNavbar.module.scss";
import CreatePostForm from "../components/createPost";
import { useEffect, useState } from "react";

//FIXME: css stylesheets are repetitive, like i could make a global container class and stuff

export default function Home() {
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    console.log(updateCount);
  }, [updateCount]);

  return (
    <div>
      <GrinNavbar>
        <button className={`${navStyle.grinNavItem} ${style.navButton}`}>Create Post</button>
        <LoginButton className={`${navStyle.grinNavItem} ${style.navButton}`}>Login (debug)</LoginButton>
        <LogoutButton className={`${navStyle.grinNavItem} ${style.navButton}`}>Logout (debug)</LogoutButton>
        <ChangeStateButton className={`${navStyle.grinNavItem} ${style.navButton}`} loginContent={"Login"} logoutContent={"Logout"} />
      </GrinNavbar>
      <div className={style.content}>
        <Posts updateCount={updateCount} />
      </div>
      <CreatePostForm updateCounter={() => setUpdateCount(updateCount+1)} />
    </div>
  );
}
