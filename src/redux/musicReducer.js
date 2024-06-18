const TURN_ON = "TURN_ON";
const TURN_OFF = "TURN_OFF";

let initialState = {
   music: [
      {
         id: 1,
         songName: "Все идет по Плану",
         Artist: "Гражданская Оборона",
         switchButton: true,
      },
      {
         id: 2,
         songName: "Зоопарк",
         Artist: "Гражданская Оборона",
         switchButton: false,
      },
   ]
}

const musicReducer = (state = initialState, action) => {
   switch (action.type) {
      case TURN_ON: return {
         ...state,
         music: state.music.map(m => {
            if (m.id === action.Id) {
               return { ...m, switchButton: false };
            }
            return m;
         })

      }
      case TURN_OFF: return {
         ...state,
         music: state.music.map(m => {
            if (m.id === action.Id) {
               return { ...m, switchButton: true };
            }
            return m;
         })
      }
      default:
         return state;
   }

}



export const turnOnSongActionCreator = (Id) => { return { type: TURN_ON, Id } }
export const turnOffSongActionCreator = (Id) => { return { type: TURN_OFF, Id } }

export default musicReducer;