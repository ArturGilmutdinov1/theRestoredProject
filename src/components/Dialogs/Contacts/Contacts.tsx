import React from "react";
import { NavLink } from "react-router-dom";
import stl from "./Contacts.module.css";

type PropsType = {
   name: string
   id: number
}


const Contacts: React.FC<PropsType> = (props) => {
   return <div className={stl.dialogItem}>
      <NavLink to={'/dialogs/' + props.id}>
         {props.name}
      </NavLink>
   </div>
}


export default Contacts;