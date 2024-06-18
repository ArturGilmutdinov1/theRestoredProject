import profileReducer, { addPostActionCreator } from "./profileReducer";
let state = {
   postData: [
      { id: 1, message: 'хехех', like: 1 },
      { id: 2, message: 'asdхех', like: 2 },
      { id: 3, message: 'adsasdad', like: 3 },
   ],
   newPostText: "",
   profile: null,
   status: "",
}



it('Add new posts', () => {
   debugger
   let action = addPostActionCreator('проверяем')


   let newState = profileReducer(state, action)

   expect(newState.postData.length).toBe(4)
});




