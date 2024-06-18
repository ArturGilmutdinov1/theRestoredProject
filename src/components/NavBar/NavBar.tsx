import { NavLink } from "react-router-dom";
import stl from "./NavBar.module.css";

const NavBar = () => {
   return <nav className={stl.sidebar}>
      <ul>
         <li><NavLink to='/profile' className={navData => navData.isActive ? stl.active : stl.item}>Profile</NavLink></li>
         <li><NavLink to='/dialogs' className={navData => navData.isActive ? stl.active : stl.item}>Message</NavLink></li>
         <li><NavLink to='/news' className={navData => navData.isActive ? stl.active : stl.item}>News</NavLink></li>
         <li><NavLink to='/music' className={navData => navData.isActive ? stl.active : stl.item}>Music</NavLink></li>
         <li className={stl.setting}>Setting</li>
         <li><NavLink to='/friends' className={navData => navData.isActive ? stl.active : stl.item}>Friends</NavLink></li>
      </ul>
   </nav>
}
export default NavBar;
