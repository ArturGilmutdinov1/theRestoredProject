import { useEffect, useState } from "react";


let ProfileStatus = (props) => {

   let [editMode, setEditMode] = useState(false);
   let [status, setStatus] = useState(props.status)

   useEffect(() => {
      setStatus(props.status)
   }, [props.status]);

   const activateEditeMode = () => {
      setEditMode(true);
   };
   const deactivateEditeMode = () => {
      setEditMode(false);
      props.updateStatus(status)
   };


   const onStatusChange = (status) => {
      setStatus(status.currentTarget.value);
   }


   return <div>
      {!editMode &&
         <div>
            <span onDoubleClick={activateEditeMode}>{status || 'нет статуса '}</span>
         </div >
      }
      {
         editMode &&
         <div>
            <input
               onChange={onStatusChange}
               autoFocus={true}
               onBlur={deactivateEditeMode}
               value={status}>
            </input>
         </div>
      }
   </div >
}





export default ProfileStatus;