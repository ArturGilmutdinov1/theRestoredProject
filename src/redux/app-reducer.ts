import { getAuthUsersData } from "./auth-reducer";
import { InferActionsTypes } from './redux-store';

let initialState: initialStateType = {
   initialized: false,
}
const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {
   switch (action.type) {
      case "SN/APP/INITIALIZED_SUCCESS":
         return {
            ...state,
            initialized: true,
         }
      default:
         return state;
   }
}

const action = {
   initializedSuccess: () => ({ type: "SN/APP/INITIALIZED_SUCCESS" } as const)
}

export const initializedApp = () => (dispatch: any) => {
   let dispatchResult = dispatch(getAuthUsersData());

   Promise.all([dispatchResult])
      .then(() => dispatch(action.initializedSuccess()));
}

export default appReducer;





export type initialStateType = {
   initialized: boolean
}
export type ActionsTypes = InferActionsTypes<typeof action>