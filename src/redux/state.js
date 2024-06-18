import dialogReducer from "./dialogReducer";
import profileReducer from "./profileReducer";



let store = {
   _state: {
      profillePage: {
         postData: [
            { id: 1, message: 'хехех', like: 1 },
            { id: 2, message: 'asdхех', like: 2 },
            { id: 3, message: 'adsasdad', like: 3 },
         ],
         newPostText: "",
      },
      dialogPage: {
         dialogData: [
            { id: 1, name: 'Артур' },
            { id: 2, name: 'Вадим' },
            { id: 3, name: 'Айдар' },
            { id: 4, name: 'Петя' },
            { id: 5, name: 'Митя' },
         ],
         messageData: [
            { message: 'привет' },
            { message: 'здравствуй ' },
            { message: 'кек' },
            { message: 'чебурек' },
            { message: 'мек-мек' },
         ],
         newMessageText: "",
      },
      friends: {
         people: [
            { id: 1, name: 'Артур' },
            { id: 2, name: 'Вадим' },
            { id: 3, name: 'Айдар' },
            { id: 4, name: 'Петя' },
            { id: 5, name: 'Митя' },
         ],
      },
   },
   _rerenderEntireTree() {
      console.log("keke");
   },
   subscribe(observer) {
      this._rerenderEntireTree = observer;
   },
   getState() {
      return this._state;
   },

   dispatch(action) {
      this._state.profillePage = profileReducer(this._state.profillePage, action);
      this._state.dialogPage = dialogReducer(this._state.dialogPage, action);
      this._rerenderEntireTree(this._state);
   }

}







export default store;
