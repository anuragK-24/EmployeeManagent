import "./AdminPanel.scss";
import imgIcon from "../../assets/hello.svg";

export default function AdminPanel() {
  return (
    <div className="AdminPanel">
      <h1>Welcome to Admin Panel</h1>
      <img src={imgIcon} alt="" />
      
    </div>
  );
}
