import { ThunkAction } from "redux-thunk";
import { usersApi } from "../API/api";
import { ActionsTypes, AppStateType } from "./redux-store";


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

const usersReducer = (state = initialState, action: ActionType) => {
   switch (action.type) {
      case "ACCEPT_FOLLOW":
         return {
            ...state,
            users: state.users.map(user => {
               if (user.id === action.userId) {
                  return { ...user, followed: true };
               }
               return user;
            })
         };
      case "ACCEPT_UNFOLLOW":
         return {
            ...state,
            users: state.users.map(user => {
               if (user.id === action.userId) {
                  return { ...user, followed: false };
               }
               return user;
            })
         }
      case "SET_CURRENT_PAGE": {
         return { ...state, currentPage: action.currentPage }
      }
      case "SET_TOTAL_USERS_COUNT": {
         return { ...state, totalUserCount: action.count }
      }

      case "SET_USERS": {
         return { ...state, users: action.users }
      }
      case "TOOGLE_IS_FETCHING": {
         return { ...state, isFetching: action.isFetching }
      }
      case "TOOGLE_IS_FOLLOWING_PROGRES": {
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


type ActionType = ActionsTypes<typeof actions>
export const actions = {
   acceptFollow: (userId: number) => ({ type: "ACCEPT_FOLLOW", userId: userId } as const),
   acceptUnfollow: (userId: number) => ({ type: "ACCEPT_UNFOLLOW", userId: userId } as const),
   setUsers: (users: UserType) => ({ type: "SET_USERS", users: users } as const),
   setCurrentPage: (currentPage: number) => ({ type: "SET_CURRENT_PAGE", currentPage: currentPage } as const),
   setTotalUsersCount: (totalUsersCount: number) => ({ type: "SET_TOTAL_USERS_COUNT", count: totalUsersCount }) as const,
   toogleIsFetching: (isFetching: boolean) => ({ type: "TOOGLE_IS_FETCHING", isFetching: isFetching } as const),
   toggleFollowingProgres: (isFetching: boolean, userId: number) => ({ type: "TOOGLE_IS_FOLLOWING_PROGRES", isFetching: isFetching, userId: userId } as const),
}



type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {

   return async (dispatch) => {
      debugger
      dispatch(actions.toogleIsFetching(true));
      dispatch(actions.setCurrentPage(currentPage))
      usersApi.getUsers(currentPage, pageSize)
         .then(data => {
            dispatch(actions.toogleIsFetching(false));
            dispatch(actions.setUsers(data.items));
            dispatch(actions.setTotalUsersCount(data.totalCount));
         })
   }
}

export const follow = (usersId: number): ThunkType => {
   return async (dispatch) => {
      dispatch(actions.toggleFollowingProgres(true, usersId))
      try {
         usersApi.follow(usersId)
            .then(response => {
               if (response.data.resultCode === 0) {
                  dispatch(actions.acceptFollow(usersId))
               }
               dispatch(actions.toggleFollowingProgres(false, usersId))
            })
      } catch (e) {
         alert(e)
      }
   }
}

export const unfollow = (usersId: number): ThunkType => {
   return async (dispatch) => {
      dispatch(actions.toggleFollowingProgres(true, usersId))
      try {
         usersApi.unfollow(usersId)
            .then(response => {
               if (response.data.resultCode === 0) {
                  dispatch(actions.acceptUnfollow(usersId))
               }
               dispatch(actions.toggleFollowingProgres(false, usersId))
            })
      } catch (e) {
         alert(e)
      }
   }
}





export default usersReducer;



