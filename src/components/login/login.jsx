import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { login } from "../../redux/auth-reducer";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Input } from "../common/Preloader/FormControll/FormControl";


const LoginForm = (props) => {
   const maxLength = maxLengthCreator(50)
   return <form onSubmit={props.handleSubmit}>
      <div>
         <Field placeholder={'login'} name={"email"} component={Input} type="text" validate={[required, maxLength]} />
      </div>
      <div>
         <Field placeholder={'password'} name={"password"} component={Input} validate={[required, maxLength]} type="password" />
      </div>
      <div>
         <Field component={Input} name={"reremberMe"} type="checkbox" />
      </div>
      {props.captcha && <div><img src={props.captcha} alt="" /></div>}
      {props.captcha && <div> введите капчу<Field placeholder={'captcha'} name={"captcha"} component={Input} type="text" /></div>}
      <div>
         <button>войти </button>
      </div>
   </form>
}

const LoginReduxForm = reduxForm({ form: 'contact' })(LoginForm)

const Login = (props) => {
   debugger
   const onSubmit = (formData) => {
      props.login(formData.email, formData.password, formData.reremberMe, formData.captcha)
   }


   if (props.isAuth) {
      return <Navigate to='/profile' />
   }

   else {
      return <main>
         <h2 >
            вход
         </h2>
         <LoginReduxForm captcha={props.captcha} onSubmit={onSubmit} />
      </main>
   }
}


let mapStateToProps = (state) => {
   return {
      isAuth: state.auth.isAuth,
      captcha: state.auth.CaptchaURL
   }
}


export default connect(mapStateToProps, { login })(Login);