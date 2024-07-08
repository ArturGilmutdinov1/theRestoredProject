import { Action, applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { reducer as formReducer } from "redux-form";
import { ThunkAction, thunk } from "redux-thunk";
import appReducer from "./app-reducer";
import authReducer from "./auth-reducer";
import dialogReducer from "./dialogReducer";
import musicReducer from "./musicReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
const thunkMiddleware = thunk;


let rootReducers = combineReducers({
   profillePage: profileReducer,
   dialogPage: dialogReducer,
   friendsPage: usersReducer,
   musicPage: musicReducer,
   auth: authReducer,
   form: formReducer,
   app: appReducer
}
);

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

type rootReducersType = typeof rootReducers
export type AppStateType = ReturnType<rootReducersType>

//@ts-ignore
let store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.store = store;

export default store;

