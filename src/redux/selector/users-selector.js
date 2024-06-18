export const getUsersSelector = (state) => {
   return state.friendsPage.users;
}

export const pageSize = (state) => {
   return state.friendsPage.pageSize;
}

export const totalUserCount = (state) => {
   return state.friendsPage.totalUserCount;
}

export const currentPage = (state) => {
   return state.friendsPage.currentPage;
}

export const isFetching = (state) => {
   return state.friendsPage.isFetching;
}


export const followingInProgress = (state) => {
   return state.friendsPage.followingInProgress;
}
