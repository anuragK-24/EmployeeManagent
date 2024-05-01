import { Link } from "react-router-dom";
import "./NavBar.scss";
import { useUser } from "../../context/UserContext";

function NavBar() {
  const { user, logoutUser } = useUser();
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar__item">
          <Link to="/allEmployee">Employee List</Link>
        </li>
      </ul>
      <ul className="navbar__leftList">
        {user !== null && (
          <li className="navbar__item">{user.others.username}</li>
        )}
        {user !== null && (
          <li style={{cursor:"pointer"}} className="navbar__item" onClick={logoutUser}>
            Logout
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
