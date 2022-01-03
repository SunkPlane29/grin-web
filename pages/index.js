import GrinNavbar from "../components/grinNavbar";
import Posts from "../components/posts";
import { LoginButton, LogoutButton, ChangeStateButton } from "../components/stateButtons";
import style from '../styles/Home.module.scss';
import navStyle from "../styles/GrinNavbar.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { GetCookie, SetCookie } from '../util/cookie';
import CreatePostForm from "../components/createPost";

export default function Home() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    
  useEffect(() => {
    const wasLogged = GetCookie("wasLogged");
    
    if (!isAuthenticated && !isLoading) {
      if (wasLogged === "") {
        SetCookie("wasLogged", false, 7);
      } else if (wasLogged === "true") {
        SetCookie("wasLogged", true, 7);
        loginWithRedirect();
      }
    }
  }, [isLoading]); //there may be some way to abstract this

  return (
    <div>
      <GrinNavbar>
        <button className={`${navStyle.grinNavItem} ${style.navButton}`}>Create Post</button>
        <LoginButton className={`${navStyle.grinNavItem} ${style.navButton}`}>Login (debug)</LoginButton>
        <LogoutButton className={`${navStyle.grinNavItem} ${style.navButton}`}>Logout (debug)</LogoutButton>
        <ChangeStateButton className={`${navStyle.grinNavItem} ${style.navButton}`} loginContent={"Login"} logoutContent={"Logout"} />
      </GrinNavbar>
      <div className={style.content}>
        <Posts />
      </div>
      <CreatePostForm />
    </div>
  );
}
