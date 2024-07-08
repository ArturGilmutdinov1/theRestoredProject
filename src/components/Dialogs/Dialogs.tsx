import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { TextArea } from "../common/Preloader/FormControll/FormControl";
import Contacts from "./Contacts/Contacts";
import stl from "./Dialogs.module.css";
import Message from "./Message/Message";


type DialogsFormType = {
   message: string
}
const DialogsForm: React.FC<InjectedFormProps<DialogsFormType>> = (props) => {
   const maxLength = maxLengthCreator(20);
   return <form onSubmit={props.handleSubmit}>
      <Field className={stl.text} component={TextArea} name={"message"} validate={[required, maxLength]} />
      <div>
         <button className={stl.send}>отправить</button>
      </div>
   </form>
}

const DialogsReduxForm = reduxForm<DialogsFormType>({ form: 'message' })(DialogsForm)


type mapStateToPropsType = {
   dialogData: Array<{
      id: number
      name: string
   }>
   messageData: Array<{ message: string }>
}
type MapDispatchToPropsType = {
   updateNewMessageBody: (value: string) => void
}

const Dialogs: React.FC<mapStateToPropsType & MapDispatchToPropsType> = (props) => {
   let People = props.dialogData.map((el) => <Contacts name={el.name} id={el.id} />)
   let message = props.messageData.map((el) => <Message message={el.message} />)

   let sendAMessage = (value: any) => {
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