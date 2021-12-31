import LoginButton from "../components/loginButton";
import LogoutButton from "../components/logoutButton";

export default function Home() {
  return (
    <div>
      <h1>Hello :)</h1>
      <br />
      <LoginButton />
      <LogoutButton />
    </div>
  );
}
