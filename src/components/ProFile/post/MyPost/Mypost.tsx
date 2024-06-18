import React from "react";
import stl from "./Mypost.module.css";


type PropsStateType = {
   message: string
   like: number
}

const MyPost: React.FC<PropsStateType> = (props) => {
   return <div className={stl.AreaText}>
      <div className={stl.post}>
         {props.message}
         <div>{props.like}</div>
      </div>
   </div>
}

export default MyPost;