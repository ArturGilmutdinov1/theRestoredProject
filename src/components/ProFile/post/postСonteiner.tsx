import { connect } from "react-redux";
import { actions } from "../../../redux/profileReducer";
import { AppStateType } from "../../../redux/redux-store";
import Post from "./post";


type PropsStateType = {}
type DispatchPropsType = {
   addPostActionCreator: (newMessageBody: string) => void
}
type OwnerType = {}



let mapStateToProps = (state: AppStateType) => {
   return {
      postData: state.profillePage.postData
   }
}
let mapDispatchToProps = (dispatch: any) => {
   return {
      addPostActionCreator: (newMessageBody: string) => {
         dispatch(actions.addPostActionCreator(newMessageBody));
      }
   }
}

const PostConteiner = connect<PropsStateType, DispatchPropsType, OwnerType, AppStateType>(mapStateToProps, mapDispatchToProps)(Post);

export default PostConteiner;


