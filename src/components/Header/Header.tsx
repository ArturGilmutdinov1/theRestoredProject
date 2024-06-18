import { useState } from "react";
import { NavLink } from "react-router-dom";
import stl from "./Header.module.css";
import ModuleWindow from "./moduleWndow/ModuleWindow";

type PropsType = {
   isAuth: boolean
   login: null | string
   logout: () => void

}

const Header: React.FC<PropsType> = (props) => {
   let [called, setCalled] = useState(false)
   let pressTheButton = () => {
      setCalled(!called)
   }
   return <header className={stl.header}>
      <img src='https://www.svgrepo.com/show/396535/fox.svg' alt=""></img>
      <div className={stl.login}>
         {props.isAuth
            ? <div onClick={pressTheButton}>
               {props.login}
               {called && <ModuleWindow logout={props.logout} />}
               {!called && null}
            </div>
            : <NavLink to={'/login'}>войти</NavLink>}
      </div>
   </header>

}
export default Header