import React from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

let mapStateToPropsRedicert = (state) => ({
   isAuth: state.auth.isAuth
})

export const witchAuthRedirect = (Component) => {
   class RedirectComponent extends React.Component {
      render() {
         if (!this.props.isAuth) return <Navigate to='/login' />
         return <Component {...this.props} />
      }
   }
   let ConnectRedirectComponent = connect(mapStateToPropsRedicert)(RedirectComponent)
   return ConnectRedirectComponent

}