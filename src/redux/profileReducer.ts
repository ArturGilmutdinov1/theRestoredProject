import { profileApi, usersApi } from "../API/api";
import { BaseThunkType, InferActionsTypes } from './redux-store';

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = ' SET_USER_PROFILE';
const SET_STATUS_PROFILE = ' SET_STATUS_PROFILE';
const SET_PHOTO_PROFILE = 'SET_PHOTO_PROFILE';

let initialState = {
   postData: [
      { id: 1, message: 'хороший день', like: 1 },
      { id: 2, message: 'замечательный день', like: 2 },
      { id: 3, message: 'замечательный я', like: 3 },
      { id: 4, message: 'смотрю на гору', like: 3 },
      { id: 5, message: 'смотрю на тебя', like: 3 },
      { id: 6, message: 'смотрю на себя', like: 3 },
      { id: 7, message: 'лежу', like: 3 },
      { id: 8, message: 'уснул', like: 3 },
      { id: 9, message: 'думаю о Башкири', like: 3 },
   ],
   newPostText: "",
   profile: null,
   status: "",
}


const profileReducer = (state = initialState, action: ActionTypes): initialStateType => {

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
      case SET_PHOTO_PROFILE: {//@ts-ignore
         return { ...state, profile: { ...state.profile, photos: action.photo } }
      }
      default:
         return state;
   }
}

export const actions = {
   addPostActionCreator: (values: string) => ({ type: ADD_POST, values: values } as const),
   setUsersProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile: profile } as const),
   setStatus: (status: string) => ({ type: SET_STATUS_PROFILE, status: status } as const),
   setPhotoSuccess: (photo: photosType) => ({ type: SET_PHOTO_PROFILE, photo: photo } as const),

}





export const getUsersProfile = (userId: number): ThunkType => async (dispatch) => {
   try {
      let response = await usersApi.getProfile(userId)
      dispatch(actions.setUsersProfile(response.data))
   }
   catch (e) {
      alert(e)
   }
}

export const getStatusProfile = (userId: number): ThunkType => async (dispatch) => {
   try {
      let response = await profileApi.getStatus(userId)
      dispatch(actions.setStatus(response.data))
   }
   catch (e) {
      alert(e)
   }
}
export const updateStatusProfile = (status: string): ThunkType => async (dispatch) => {
   try {
      let response = await profileApi.updateStatus(status)
      if (response.data.resultCode === 0) {
         dispatch(actions.setStatus(status))
      }
   } catch (e) {
      alert(e)
   }
}

export const savePhoto = (photo: photosType): ThunkType => async (dispatch) => {
   try {
      let response = await profileApi.savePhoto(photo);
      if (response.data.resultCode === 0) {
         dispatch(actions.setPhotoSuccess(response.data.data.photos))
      }
   } catch (e) {
      alert(e)
   }
}


export const saveDataProfile = (profile: ProfileType): ThunkType => async (dispatch, getState: any) => {

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





type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>

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