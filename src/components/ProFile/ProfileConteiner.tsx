import React from "react";
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';
import { compose } from "redux";
import { witchAuthRedirect } from "../../hoc/witchAuthRedirect";
import { ProfileType, getStatusProfile, getUsersProfile, photosType, saveDataProfile, savePhoto, updateStatusProfile } from "../../redux/profileReducer";
import { AppStateType } from "../../redux/redux-store";
import ProFile from "./ProFile";


type DispatchPropsType = {
   getUsersProfile: (userId: number) => void
   getStatusProfile: (userId: number) => void
   updateStatusProfile: (status: string) => void
   savePhoto: (photo: photosType) => void
   saveDataProfile: (profile: ProfileType) => Promise<any>
}
type PropsStateType = {
   profile: ProfileType
   status: string
   authorizedUserID: number
   match: any
   history: any
}
type OwnerType = {
}
type PropsType = DispatchPropsType & PropsStateType & OwnerType



function withRouter(Children: any) {
   return (props: PropsStateType) => {
      const match = { params: useParams() };
      return <Children {...props} match={match} />
   }
}



class ProfileContainer extends React.Component<PropsType> {
   refreshPropfile() {
      let userId = this.props.match.params.userId;
      if (!userId) {
         userId = this.props.authorizedUserID;
         if (!userId) {
            this.props.history.push("/login");
         }
      }
      this.props.getUsersProfile(userId);
      this.props.getStatusProfile(userId);
   }

   componentDidMount() {
      this.refreshPropfile();
   }

   componentDidUpdate(prevProps: PropsStateType, prevState: AppStateType, snapshot: any) {
      if (this.props.match.params.userId !== prevProps.match.params.userId) {
         this.refreshPropfile();
      }
   }

   render() {
      return (
         <ProFile {... this.props}
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateStatusProfile}
            savePhoto={this.props.savePhoto}
            saveDataProfile={this.props.saveDataProfile}
         />
      )
   }

}



let mapStateToProps = (state: AppStateType) => ({
   profile: state.profillePage.profile,
   status: state.profillePage.status,
   authorizedUserID: state.auth.userId,
})


//протипизируй
export default compose(
   connect(mapStateToProps, { getUsersProfile, getStatusProfile, updateStatusProfile, savePhoto, saveDataProfile }),
   withRouter,
   witchAuthRedirect,
)(ProfileContainer)