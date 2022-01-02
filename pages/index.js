import GrinNavbar from "../components/grinNavbar";
import LoginButton from "../components/loginButton";
import LogoutButton from "../components/logoutButton";
import style from '../styles/Home.module.scss';
import navStyle from "../styles/GrinNavbar.module.scss";

export default function Home() {
  return (
    <div>
      <GrinNavbar>
        <button className={`${navStyle.grinNavItem} ${style.navButton}`}>lorem</button>
        <button className={`${navStyle.grinNavItem} ${style.navButton}`}>lorem</button>
        <button className={`${navStyle.grinNavItem} ${style.navButton}`}>lorem</button>
        <button className={`${navStyle.grinNavItem} ${style.navButton}`}>lorem</button>
        <button className={`${navStyle.grinNavItem} ${style.navButton}`}>lorem</button>
        <LoginButton className={`${navStyle.grinNavItem} ${style.navButton}`} />
        <LogoutButton className={`${navStyle.grinNavItem} ${style.navButton}`} />
      </GrinNavbar>
      <div className={style.content}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  );
}
