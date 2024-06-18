import React, { ChangeEvent } from "react";

type PropsType = {
   status: string
   updateStatus: (newStatus: string) => void
}
type StateType = {
   editMode: boolean
   status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
   state = {
      editMode: false,
      status: this.props.status
   }

   activateEditeMode = () => {
      this.setState({
         editMode: true
      })
   }

   deactivateEditeMode = () => {
      this.setState({
         editMode: false
      })
      this.props.updateStatus(this.state.status)
   }
   onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
      this.setState({ status: e.currentTarget.value })
   }
   componentDidUpdate(prevProps: PropsType, prevState: StateType) {
      if (prevProps.status !== this.props.status) {
         this.setState({ status: this.props.status })
      }

   }
   render() {
      return <div>
         {!this.state.editMode &&
            <div>
               <span onDoubleClick={this.activateEditeMode}>{this.props.status || 'нет статуса '}</span>
            </div >
         }
         {
            this.state.editMode &&
            <div>
               <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditeMode} value={this.state.status}></input>
            </div>
         }
      </div >
   }
}




export default ProfileStatus;