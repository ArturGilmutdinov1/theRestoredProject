import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { TextArea } from "../common/Preloader/FormControll/FormControl";
import Contacts from "./Contacts/Contacts";
import stl from "./Dialogs.module.css";
import Message from "./Message/Message";


const maxLength = maxLengthCreator(20);


const DialogsForm = (props) => {
   return <form onSubmit={props.handleSubmit}>
      <Field className={stl.text} component={TextArea} name={"message"} validate={[required, maxLength]} />
      <div>
         <button className={stl.send}>отправить</button>
      </div>
   </form>
}

const DialogsReduxForm = reduxForm({ form: 'message' })(DialogsForm)

const Dialogs = (props) => {
   let People = props.dialogData.map((el) => <Contacts name={el.name} id={el.id} />)
   let message = props.messageData.map((el) => <Message message={el.message} />)

   let sendAMessage = (value) => {
      props.updateNewMessageBody(value.message);
   }
   return (<div className={stl.border}>
      <div className={stl.content}>
         <div className={stl.dialog}>
            {People}
         </div>
         <div className={stl.message}>
            {message}
         </div>
      </div >
      <div>
         <DialogsReduxForm onSubmit={sendAMessage} />
      </div>
   </div>
   )
}
export default Dialogs;