import React from "react";
import stl from "./Message.module.css";


type PropsType = {
   message: string
}


const Message: React.FC<PropsType> = (props) => {
   return (
      <div className={stl.messageItem}>
         {props.message}
      </div>
   )
}


export default Message;