import React from "react";
import { NavLink } from "react-router-dom";
import { UserType } from "../../redux/usersReducer";
import Paginator from "../common/Preloader/Paginator/Paginator";
import stl from './Users.module.css';

type PropsType = {
   currentPage: number
   onPageChanged: (p: number) => void
   totalUserCount: number
   pageSize: number
   peopleDate: Array<UserType>
   followingInProgress: Array<number>
   unfollow: (usersId: number) => void
   follow: (usersId: number) => void
}

const Users: React.FC<PropsType> = (props) => {
   return <div >
      <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged} totalUserCount={props.totalUserCount} pageSize={props.pageSize} />
      {props.peopleDate.map(users => <div key={users.id}  > 
         <div className={stl.conteiner}>
            <div>
               <NavLink to={'/proFile/' + users.id}>
                  <img src={users.photos.small != null ? users.photos.small : 'https://gas-kvas.com/uploads/posts/2023-01/1673412252_gas-kvas-com-p-kvadratnie-risunki-anime-6.jpg'} alt="" className={stl.userPhoto} />
               </NavLink>
            </div>
            <div>{users.name}</div>
            <div>{users.status}</div>
         </div>
         <div className={stl.button}>
            {users.followed
               ? < button disabled={props.followingInProgress.some(id => id === users.id)} onClick={() => props.unfollow(users.id)
               }>удалить</button>
               : <button disabled={props.followingInProgress.some(id => id === users.id)} onClick={() => props.follow(users.id)
               }>добавить</button>
            }
         </div>
      </div>
      )
      }
   </div >
}

export default Users;