import { profileApi, usersApi } from "../API/api";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = ' SET_USER_PROFILE';
const SET_STATUS_PROFILE = ' SET_STATUS_PROFILE';
const SET_PHOTO_PROFILE = 'SET_PHOTO_PROFILE';

type contactsType = {
   github: string
   vk: string
   facebook: string
   instagram: string
   twitter: string
   website: string
   youtube: string
   mainLink: string
}
export type photosType = {
   small: string
   large: string
}
export type ProfileType = {
   userId: number
   lookingForAJob: boolean
   lookingForAJobDescription: string
   fullName: string
   contacts: contactsType
   photos: photosType
}
export type initialStateType = {
   postData?: Array<{
      id: number
      message: string
      like: number
   }>
   newPostText: string
   profile: ProfileType | null
   status: string
}
let initialState = {
   postData: [
      { id: 1, message: 'хехех', like: 1 },
      { id: 2, message: 'asdхех', like: 2 },
      { id: 3, message: 'adsasdad', like: 3 },
   ],
   newPostText: "",
   profile: null,
   status: "",
}


const profileReducer = (state = initialState, action: any): initialStateType => {

   switch (action.type) {
      case ADD_POST:
         return {
            ...state,
            postData: [...state.postData, {
               id: 5,
               message: action.values,
               like: 0,
            }
            ],
         }
      case SET_USER_PROFILE: {
         return { ...state, profile: action.profile }
      }
      case SET_STATUS_PROFILE: {
         return { ...state, status: action.status }
      }
      case SET_PHOTO_PROFILE: {// @ts-ignore
         return { ...state, profile: { ...state.profile, photos: action.photo } }
      }
      default:
         return state;
   }
}


type addPostType = { type: typeof ADD_POST, values: string }
export const addPostActionCreator = (values: string): addPostType => ({ type: ADD_POST, values: values });

type setUsersType = { type: typeof SET_USER_PROFILE, profile: ProfileType }
const setUsersProfile = (profile: ProfileType): setUsersType => ({ type: SET_USER_PROFILE, profile: profile })

type setStatusType = { type: typeof SET_STATUS_PROFILE, status: string }
const setStatus = (status: string): setStatusType => ({ type: SET_STATUS_PROFILE, status: status })

type setPhotoType = { type: typeof SET_PHOTO_PROFILE, photo: photosType }
const setPhotoSuccess = (photo: photosType): setPhotoType => ({ type: SET_PHOTO_PROFILE, photo: photo })


export const getUsersProfile = (userId: number) => async (dispatch: any) => {
   try {
      let response = await usersApi.getProfile(userId)
      dispatch(setUsersProfile(response.data))
   }
   catch (e) {
      alert(e)
   }
}

export const getStatusProfile = (userId: number) => async (dispatch: any) => {
   try {
      let response = await profileApi.getStatus(userId)
      dispatch(setStatus(response.data))
   }
   catch (e) {
      alert(e)
   }
}
export const updateStatusProfile = (status: string) => async (dispatch: any) => {
   try {
      let response = await profileApi.updateStatus(status)
      if (response.data.resultCode === 0) {
         dispatch(setStatus(status))
      }
   } catch (e) {
      alert(e)
   }
}

export const savePhoto = (photo: photosType) => async (dispatch: any) => {
   try {
      let response = await profileApi.savePhoto(photo);
      if (response.data.resultCode === 0) {
         dispatch(setPhotoSuccess(response.data.data.photos))
      }
   } catch (e) {
      alert(e)
   }
}


export const saveDataProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {

   const userID = getState().auth.userId;

   try {
      let response = await profileApi.saveData(profile);
      if (response.data.resultCode === 0) {
         dispatch(getUsersProfile(userID))
      }
   } catch (e) {
      alert(e)
   }

}


export default profileReducer
