import { ResultCodesEnum } from './../API/api';
// @ts-ignore
import { ResultCodesWitchCapcthaEnum, autApi } from "../API/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA = " SET_CAPTCHA"

export type initialStateType = {
   userId: null | number
   email: null | string
   login: null | string
   isAuth: boolean
   CaptchaURL: string | null
}
let initialState: initialStateType = {
   userId: null,
   email: null,
   login: null,
   isAuth: false,
   CaptchaURL: null,
}


const authReducer = (state = initialState, action: any): initialStateType => {

   switch (action.type) {
      case SET_USER_DATA:
         return {
            ...action,
            ...action.data,
         }
      case SET_CAPTCHA:
         return {
            ...action, CaptchaURL: action.Captcha,
         }
      default:
         return state;
   }
}

type setAuthUsersDataType = {
   userId: number | null
   email: string | null
   login: string | null
   isAuth: boolean | null
}
type setAuthUsersType = {
   type: typeof SET_USER_DATA
   data: setAuthUsersDataType
}
const setAuthUsersData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUsersType => ({ type: SET_USER_DATA, data: { userId, email, login, isAuth } });

type setCaptchaURLType = {
   type: typeof SET_CAPTCHA
   Captcha: string
}
const setCaptchaURL = (Captcha: string): setCaptchaURLType => ({ type: SET_CAPTCHA, Captcha: Captcha });

export const getAuthUsersData = () => async (dispatch: any) => {
   try {
      let meData = await autApi.me();
      if (meData.resultCode === ResultCodesEnum.Success) {
         let { id, login, email } = meData.data;
         dispatch(setAuthUsersData(id, email, login, true))
      }
   } catch (error) {
      alert(error)
   }
}

export const login = (mail: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
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
export const logout = () => async (dispatch: any) => {
   let response = await autApi.logout()
   if (response.data.resultCode === ResultCodesEnum.Success) {
      dispatch(setAuthUsersData(null, null, null, false))
   }
}

export const getCaptchaURL = () => async (dispatch: any) => {
   let response = await autApi.getCaptcha()
   dispatch(setCaptchaURL(response.data.url))
}

export default authReducer;
