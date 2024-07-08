import { ProfileType, photosType } from "../../redux/profileReducer";
import Info from "./Content/Info";
import stl from "./ProFile.module.css";
import PostConteiner from "./post/postСonteiner";

type PropsStateType = {
   profile: ProfileType
   status: string
   updateStatus: (status: string) => void
   savePhoto: (photo: photosType) => void
   saveDataProfile: (profile: ProfileType) => Promise<any>
   authorizedUserID: number
}


const ProFile: React.FC<PropsStateType> = (props) => {
   return <div className={stl.content}>
      <Info profile={props.profile} status={props.status} updateStatus={props.updateStatus} userID={props.authorizedUserID} savePhoto={props.savePhoto} saveDataProfile={props.saveDataProfile} />
      <PostConteiner />
   </div >
}
export default ProFile;


