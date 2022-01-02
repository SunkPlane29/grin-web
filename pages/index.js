import GrinNavbar from "../components/grinNavbar";
import LoginButton from "../components/loginButton";
import LogoutButton from "../components/logoutButton";
import Posts from "../components/posts";
import style from '../styles/Home.module.scss';
import navStyle from "../styles/GrinNavbar.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { GetCookie, SetCookie } from '../util/cookie';

export default function Home() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const [posts, setPosts] = useState(<div></div>);
  const [button, setButton] = useState(<LoginButton className={style.navButton} />);

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
  }, [isLoading]);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setPosts(<Posts sub={[user?.sub.split('|')[1]]} />);
      setButton(<LogoutButton className={style.navButton} />);
    }
  }, [user]);

  return (
    <div>
      <GrinNavbar>
        <button className={`${navStyle.grinNavItem} ${style.navButton}`} onClick={() => logout()}>lorem</button>
        <button className={`${navStyle.grinNavItem} ${style.navButton}`}>lorem</button>
        <button className={`${navStyle.grinNavItem} ${style.navButton}`}>lorem</button>
        {button}
      </GrinNavbar>
      <div className={style.content}>
        <div>
          {posts}
        </div>
      </div>
    </div>
  );
}
