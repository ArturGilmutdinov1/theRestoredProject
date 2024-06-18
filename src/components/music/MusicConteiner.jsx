import { connect } from "react-redux";
import { turnOffSongActionCreator, turnOnSongActionCreator } from "../../redux/musicReducer";
import Music from "./Music";



let mapStateToProps = (state) => {
   return {
      musicData: state.musicPage.music,
   }
};

let mapDispatchToProps = (dispatch) => {
   return {
      turnOnMusic: (Id) => {
         dispatch(turnOnSongActionCreator(Id))
      },
      turnOffMusic: (Id) => {
         dispatch(turnOffSongActionCreator(Id))
      }
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(Music);