import style from "../styles/GrinNavbar.module.scss";

export default function GrinNavbar(props) {
    return (
        <nav className={style.grinNav}>
            <div className={style.grinNavContainer}>
                <div className={style.grinNavItemContainer}>
                    {props.children}
                </div>
            </div>
        </nav>
    );
}