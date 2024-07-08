import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { login } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Input } from "../common/Preloader/FormControll/FormControl";

type LoginFormValueType = {
   email: string
   password: string
   reremberMe: boolean
   captcha: string
}
type LoginFormOwnProps = {
   captcha: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValueType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
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

const LoginReduxForm = reduxForm<LoginFormValueType, LoginFormOwnProps>({ form: 'contact' })(LoginForm)



type mapStateToPropsType = {
   isAuth: boolean
   captcha: string | null
}
type MapDispatchToPropsType = {
   login: (mail: string, password: string, rememberMe: boolean, captcha: any) => void
}
const Login: React.FC<mapStateToPropsType & MapDispatchToPropsType> = (props) => {
   debugger
   const onSubmit = (formData: any) => {
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



let mapStateToProps = (state: AppStateType) => {
   return {
      isAuth: state.auth.isAuth,
      captcha: state.auth.CaptchaURL
   }
}


export default connect(mapStateToProps, { login })(Login);