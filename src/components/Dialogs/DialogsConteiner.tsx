import { connect } from "react-redux";
import { compose } from "redux";
import { witchAuthRedirect } from "../../hoc/witchAuthRedirect";
import { sendMessageActionCreator } from "../../redux/dialogReducer";
import { AppStateType } from '../../redux/redux-store';
import Dialogs from "./Dialogs";


type DispatchPropsType = {

}
type PropsStateType = {

}
type OwnerType = {
}



let mapStateToProps = (state: AppStateType) => {
   return {
      dialogData: state.dialogPage.dialogData,
      messageData: state.dialogPage.messageData,
   }
};

let mapDispatchToProps = (dispatch: any) => {
   return {
      updateNewMessageBody: (newMessageText: string) => {
         dispatch(sendMessageActionCreator(newMessageText));
      }
   }
};



export default compose(
   connect<PropsStateType, DispatchPropsType, OwnerType, AppStateType>(mapStateToProps, mapDispatchToProps),
   witchAuthRedirect,
)(Dialogs)

