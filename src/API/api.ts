import axios from "axios";
import { ProfileType } from "../redux/profileReducer";

const intstance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: { "API-KEY": "a9cf1604-ec96-406a-9f8c-365df646aeaf" }
})
export enum ResultCodesEnum {
   Success = 0,
   Error = 1,
}
export enum ResultCodesWitchCapcthaEnum {
   CaptchaIsRequierd = 10,
}


export const usersApi = {
   getUsers(currentPage = 1, pageSize = 10) {
      return intstance.get(`users?page=${currentPage}& count=${pageSize}`)
         .then(response => {
            return response.data
         });
   },

   follow(usersId: number) {
      return intstance.post(`follow/${usersId}`)
   },

   unfollow(usersId: number) {
      return intstance.delete(`follow/${usersId}`)
   },

   getProfile(userId: number) {
      console.log('не пользуйся этим методом')
      return profileApi.getProfile(userId);
   }
}



export const profileApi = {
   getProfile(userId: number) {
      return intstance.get(`profile/` + userId)
   },
   getStatus(userId: number) {
      return intstance.get('profile/status/' + userId)
   },
   updateStatus(status: string) {
      return intstance.put('profile/status', { status: status })
   },
   savePhoto(photo: any) {
      const formData = new FormData();
      formData.append('image', photo)
      return intstance.put('profile/photo', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      })
   },
   saveData(profile: ProfileType) {
      debugger
      return intstance.put(`profile`, profile)
   }
}


type meResponseType = {
   data: {
      id: number
      email: string
      login: string
   }
   messages: Array<string>
   resultCode: ResultCodesEnum
}
type loginResponseType = {
   resultCode: ResultCodesWitchCapcthaEnum | ResultCodesEnum
   messages: Array<string>
   data: {
      userId: number
   }
}
type logoutResponseType = {
   resultCode: ResultCodesEnum
   messages: Array<string>
   data: {}
}
type getCaptchaType = {
   url: string
}

export const autApi = {
   me() {
      return intstance.get<meResponseType>(`auth/me/`).then(res => res.data)
   },
   login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
      return intstance.post<loginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
   },
   logout() {
      return intstance.delete<logoutResponseType>(`auth/login`)
   },
   getCaptcha() {
      return intstance.get<getCaptchaType>(`/security/get-captcha-url`)
   }
}