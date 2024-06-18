import { getAuthUsersData } from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"

export type initialStateType = {
   initialized: boolean
}

let initialState: initialStateType = {
   initialized: false,
}


const appReducer = (state = initialState, action: any): initialStateType => {
   switch (action.type) {
      case INITIALIZED_SUCCESS:
         return {
            ...action,
            initialized: true,
         }
      default:
         return state;
   }
}

type initializedSuccessType = {
   type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): initializedSuccessType => { return { type: INITIALIZED_SUCCESS } }


export const initializedApp = () => (dispatch: any) => {
   let dispatchResult = dispatch(getAuthUsersData());

   Promise.all([dispatchResult])
      .then(() => dispatch(initializedSuccess()));
}

export default appReducer;
