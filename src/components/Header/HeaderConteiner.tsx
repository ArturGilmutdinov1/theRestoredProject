import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import Header from "./Header";

type DispatchPropsType = {
   logout: () => void
}
type PropsStateType = {
   isAuth: boolean
   login: null | string
}
type OwnerType = {
}
type PropsType = DispatchPropsType & PropsStateType & OwnerType


class HeaderConteiner extends React.Component<PropsType> {
   render() {
      return <Header {...this.props} />
   }
}


const mapStateToProps = (state: AppStateType) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login,
});

export default connect<PropsStateType, DispatchPropsType, OwnerType, AppStateType>(mapStateToProps, { logout })(HeaderConteiner);