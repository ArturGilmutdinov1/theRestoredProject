const SEND_MESSAGE = "SEND_MESSAGET"


type dialogDataType = Array<{
   id: number
   name: string
}>
type messageDataType = Array<{ message: string }>
export type initialStateType = {
   dialogData: dialogDataType
   messageData: messageDataType
   newMessageText: string
}
let initialState: initialStateType = {
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
}


const dialogReducer = (state = initialState, action: any): initialStateType => {
   switch (action.type) {
      case SEND_MESSAGE:
         return {
            ...state,
            messageData: [...state.messageData, { message: action.newMessageText }],
         }
      default:
         return state;
   }
}

type sendMessageActionType = {
   type: typeof SEND_MESSAGE
   newMessageText: string
}
export const sendMessageActionCreator = (newMessageText: string): sendMessageActionType => {
   return { type: SEND_MESSAGE, newMessageText }
}

export default dialogReducer;