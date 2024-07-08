import axios, { AxiosPromise } from "axios";
import { ProfileType, photosType } from "../redux/profileReducer";

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
type ResponseType<D = {}, RC = ResultCodesEnum> = {
   data: D
   messages: Array<string>
   resultCode: RC
}





type GetItemsType = {
   items: any
   totalCount: number
   error: string | null
}
export const usersApi = {
   getUsers(currentPage = 1, pageSize = 10) {
      return intstance.get<GetItemsType>(`users?page=${currentPage}& count=${pageSize}`)
         .then(response => {
            return response.data
         });
   },

   follow(usersId: number) {
      return intstance.post<ResponseType>(`follow/${usersId}`)
   },

   unfollow(usersId: number) {
      return intstance.delete(`follow/${usersId}`) as AxiosPromise<ResponseType>
   },

   getProfile(userId: number) {
      console.log('не пользуйся этим методом')
      return profileApi.getProfile(userId);
   }
}





type SavePhotosResponseDataType = {
   photos: photosType
}

export const profileApi = {
   getProfile(userId: number) {
      return intstance.get<ProfileType>(`profile/` + userId)
   },
   getStatus(userId: number) {
      return intstance.get<string>('profile/status/' + userId)
   },
   updateStatus(status: string) {
      return intstance.put<ResponseType>('profile/status', { status: status })
   },
   savePhoto(photo: any) {
      const formData = new FormData();
      formData.append('image', photo)
      return intstance.put<ResponseType<SavePhotosResponseDataType>>('profile/photo', formData, {
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
   id: number
   email: string
   login: string
}
type loginResponseType = {
   userId: number
}
type getCaptchaType = {
   url: string
}

export const autApi = {
   me() {
      return intstance.get<ResponseType<meResponseType>>(`auth/me/`).then(res => res.data)
   },
   login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
      return intstance.post<ResponseType<loginResponseType, ResultCodesEnum | ResultCodesWitchCapcthaEnum>>(`auth/login`, { email, password, rememberMe, captcha })
   },
   logout() {
      return intstance.delete(`auth/login`)
   },
   getCaptcha() {
      return intstance.get<getCaptchaType>(`/security/get-captcha-url`)
   }
}