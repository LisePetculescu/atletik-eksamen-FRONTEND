import { NavLink } from "react-router-dom";
import "./NavHeader.css";

export default function NavHeader() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/addParticipant">Atleter</NavLink>
        </li>
        <li>
          <NavLink to="/results">Resultater</NavLink>
        </li>
      </ul>
    </nav>
  );
}
