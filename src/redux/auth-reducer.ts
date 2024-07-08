import { ResultCodesWitchCapcthaEnum, autApi } from "../API/api";
import { ResultCodesEnum } from './../API/api';
import { BaseThunkType, InferActionsTypes } from "./redux-store";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA = " SET_CAPTCHA"

let initialState: initialStateType = {
   userId: null,
   email: null,
   login: null,
   isAuth: false,
   CaptchaURL: null,
}


const authReducer = (state = initialState, action: ActionType): initialStateType => {
   switch (action.type) {
      case SET_USER_DATA:
         return {
            ...state,
            ...action.data,
         }
      case SET_CAPTCHA:
         return {
            ...state, CaptchaURL: action.Captcha,
         }
      default:
         return state;
   }
}



export const actions = {
   setAuthUsersData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
      type: SET_USER_DATA, data: { userId, email, login, isAuth }
   } as const),

   setCaptchaURL: (Captcha: string) => ({
      type: SET_CAPTCHA, Captcha: Captcha
   } as const),
}





export const getAuthUsersData = (): ThunkType => async (dispatch) => {
   try {
      let meData = await autApi.me();
      if (meData.resultCode === ResultCodesEnum.Success) {
         let { id, login, email } = meData.data;
         dispatch(actions.setAuthUsersData(id, email, login, true))
      }
   } catch (error) {
      alert(error)
   }
}

export const login = (mail: string, password: string, rememberMe: boolean, captcha: any): ThunkType => async (dispatch) => {
   try {
      let response = await autApi.login(mail, password, rememberMe, captcha)
      if (response.data.resultCode === ResultCodesEnum.Success) {

         dispatch(getAuthUsersData())
      }
      else if (response.data.resultCode === ResultCodesWitchCapcthaEnum.CaptchaIsRequierd) {
         debugger
         dispatch(getCaptchaURL());
      }
   } catch (error) {
      alert(error)
   }
}
export const logout = (): ThunkType => async (dispatch) => {
   let response = await autApi.logout()
   if (response.data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setAuthUsersData(null, null, null, false))
   }
}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
   let response = await autApi.getCaptcha()
   dispatch(actions.setCaptchaURL(response.data.url))
}




export type initialStateType = {
   userId: null | number
   email: null | string
   login: null | string
   isAuth: boolean
   CaptchaURL: string | null
}


type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType>


export default authReducer;
