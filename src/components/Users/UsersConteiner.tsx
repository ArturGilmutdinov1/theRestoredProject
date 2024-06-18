import Users from './Users';

import React from 'react';
import { connect } from 'react-redux';

import { AppStateType } from '../../redux/redux-store';
import { currentPage, followingInProgress, getUsersSelector, isFetching, pageSize, totalUserCount } from '../../redux/selector/users-selector';
import { UserType, follow, getUsers, unfollow } from '../../redux/usersReducer';
import Preloader from '../common/Preloader/Preloader';


type DispatchPropsType = {
   getUsers: (currentPage: number, pageSize: number) => void
   unfollow: (usersId: number) => void
   follow: (usersId: number) => void
}
type PropsStateType = {
   currentPage: number
   totalUserCount: number
   pageSize: number
   peopleDate: Array<UserType>
   followingInProgress: Array<number>
   isFetching: boolean
}
type OwnerType = {
}


type PropsType = DispatchPropsType & PropsStateType & OwnerType

class UsersApiComponent extends React.Component<PropsType> {

   componentDidMount() {
      this.props.getUsers(this.props.currentPage, this.props.pageSize);
   };

   onPageChanged = (pageNumber: number) => {
      this.props.getUsers(pageNumber, this.props.pageSize);
   };

   render() {

      return <>
         {this.props.isFetching ? <Preloader />
            : <Users totalUserCount={this.props.totalUserCount}
               pageSize={this.props.pageSize}
               currentPage={this.props.currentPage}
               onPageChanged={this.onPageChanged}
               peopleDate={this.props.peopleDate}
               follow={this.props.follow}
               unfollow={this.props.unfollow}
               followingInProgress={this.props.followingInProgress}
            />
         }

      </>
   };
};


const mapStateToProps = (state: AppStateType) => {
   return {
      peopleDate: getUsersSelector(state),
      pageSize: pageSize(state),
      totalUserCount: totalUserCount(state),
      currentPage: currentPage(state),
      isFetching: isFetching(state),
      followingInProgress: followingInProgress(state),
   }
};




export default connect<PropsStateType, DispatchPropsType, OwnerType, AppStateType>(mapStateToProps, {
   follow,
   unfollow,
   getUsers,
})(UsersApiComponent);


