import React from "react";
import stl from "./Music.module.css";


const Music = (props) => {



   return (
      <div>
         {props.musicData.map(music => <div key={music.id} className={stl.song}>
            <div className="stl.buttomPlay">
               {music.switchButton
                  ? <button onClick={() => { props.turnOnMusic(music.id); }}><img src=" https://img.icons8.com/?size=30&id=59862&format=png" alt="" className={stl.play} /></button>
                  : <button onClick={() => { props.turnOffMusic(music.id); }}><img src="https://img.icons8.com/?size=50&id=36268&format=png" alt="" className={stl.play} /></button>
               }
            </div>
            <div className="stl.name">{music.songName}</div>
            <div className="stl.name">{music.Artist}</div>
         </div>
         )}
      </div>
   )
}



export default Music;



