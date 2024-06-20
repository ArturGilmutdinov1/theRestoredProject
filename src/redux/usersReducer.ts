import { ThunkAction } from "redux-thunk";
import { usersApi } from "../API/api";
import { AppStateType } from "./redux-store";


const ACCEPT_FOLLOW = 'ACCEPT_FOLLOW';
const ACCEPT_UNFOLLOW = 'ACCEPT_UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = ' SER_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = ' SET_TOTAL_USERS_COUNT';
const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
const TOOGLE_IS_FOLLOWING_PROGRES = 'TOOGLE_IS_FOLLOWING_PROGRES';

type PhotoType = {
   small: string | null
   large: string | null
}
export type UserType = {
   followed: boolean
   id: number
   name: string
   photos: PhotoType
   status: string | null
}
export type initialStateType = {
   users: Array<UserType>
   pageSize: number
   totalUserCount: number
   currentPage: number
   isFetching: boolean
   followingInProgress: Array<number>
}

const initialState: initialStateType = {
   users: [],
   pageSize: 5,
   totalUserCount: 10,
   currentPage: 1,
   isFetching: false,
   followingInProgress: [],
}

type ActionType = acceptFollowType | acceptUnollowType | setUsersType | setCurrentPageType | setTotalUsersCountType | toogleIsFetchingType | toggleFollowingProgresType
const usersReducer = (state = initialState, action: ActionType) => {
   switch (action.type) {
      case ACCEPT_FOLLOW:
         return {
            ...state,
            users: state.users.map(user => {
               if (user.id === action.userId) {
                  return { ...user, followed: true };
               }
               return user;
            })
         };
      case ACCEPT_UNFOLLOW:
         return {
            ...state,
            users: state.users.map(user => {
               if (user.id === action.userId) {
                  return { ...user, followed: false };
               }
               return user;
            })
         }
      case SET_CURRENT_PAGE: {
         return { ...state, currentPage: action.currentPage }
      }
      case SET_TOTAL_USERS_COUNT: {
         return { ...state, totalUserCount: action.count }
      }

      case SET_USERS: {
         return { ...state, users: action.users }
      }
      case TOOGLE_IS_FETCHING: {
         return { ...state, isFetching: action.isFetching }
      }
      case TOOGLE_IS_FOLLOWING_PROGRES: {
         debugger
         return {
            ...state,
            followingInProgress: action.isFetching
               ? [...state.followingInProgress, action.userId]
               : state.followingInProgress.filter(Id => Id !== action.userId)

         }
      }
      default:
         return state;
   }
}




type acceptFollowType = {
   type: typeof ACCEPT_FOLLOW
   userId: number
}
export const acceptFollow = (userId: number): acceptFollowType => ({ type: ACCEPT_FOLLOW, userId: userId })


type acceptUnollowType = {
   type: typeof ACCEPT_UNFOLLOW
   userId: number
}
export const acceptUnfollow = (userId: number): acceptUnollowType => ({ type: ACCEPT_UNFOLLOW, userId: userId })


type setUsersType = {
   type: typeof SET_USERS
   users: UserType
}
export const setUsers = (users: UserType): setUsersType => ({ type: SET_USERS, users: users })


type setCurrentPageType = {
   type: typeof SET_CURRENT_PAGE
   currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage: currentPage })


type setTotalUsersCountType = {
   type: typeof SET_TOTAL_USERS_COUNT
   count: number
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })


type toogleIsFetchingType = {
   type: typeof TOOGLE_IS_FETCHING
   isFetching: boolean
}
export const toogleIsFetching = (isFetching: boolean): toogleIsFetchingType => ({ type: TOOGLE_IS_FETCHING, isFetching: isFetching })


type toggleFollowingProgresType = {
   type: typeof TOOGLE_IS_FOLLOWING_PROGRES
   isFetching: boolean
   userId: number
}
export const toggleFollowingProgres = (isFetching: boolean, userId: number): toggleFollowingProgresType => ({ type: TOOGLE_IS_FOLLOWING_PROGRES, isFetching: isFetching, userId: userId })




type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {

   return async (dispatch) => {
      debugger
      dispatch(toogleIsFetching(true));
      dispatch(setCurrentPage(currentPage))
      usersApi.getUsers(currentPage, pageSize)
         .then(data => {
            dispatch(toogleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
         })
   }
}

export const follow = (usersId: number): ThunkType => {
   return async (dispatch) => {
      dispatch(toggleFollowingProgres(true, usersId))
      try {
         usersApi.follow(usersId)
            .then(response => {
               if (response.data.resultCode === 0) {
                  dispatch(acceptFollow(usersId))
               }
               dispatch(toggleFollowingProgres(false, usersId))
            })
      } catch (e) {
         alert(e)
      }
   }
}

export const unfollow = (usersId: number): ThunkType => {
   return async (dispatch) => {
      dispatch(toggleFollowingProgres(true, usersId))
      try {
         usersApi.unfollow(usersId)
            .then(response => {
               if (response.data.resultCode === 0) {
                  dispatch(acceptUnfollow(usersId))
               }
               dispatch(toggleFollowingProgres(false, usersId))
            })
      } catch (e) {
         alert(e)
      }
   }
}





export default usersReducer;



