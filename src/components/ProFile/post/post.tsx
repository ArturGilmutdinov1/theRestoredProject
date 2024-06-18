import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { TextArea } from "../../common/Preloader/FormControll/FormControl";
import MyPost from "./MyPost/Mypost";
import stl from "./post.module.css";


const maxLength = maxLengthCreator(20);


type PostFormProps = {
   handleSubmit: (value: string) => void
}
const PostForm: React.FC<PostFormProps> = (props) => {
   //@ts-ignore  //надо найти решение 
   return <form onSubmit={props.handleSubmit}>
      <Field component={TextArea} name={'newMessageBody'} validate={[required, maxLength]} />
      <button >отправить</button>
   </form>

}

//@ts-ignore 
const PostReduxForm = reduxForm({ form: 'post' })(PostForm)
//Надо найцти решение
type PropsPostType = {
   addPostActionCreator: (newMessageBody: string) => void
   postData?: Array<{
      id: number
      message: string
      like: number
   }>
}



const Post: React.FC<PropsPostType> = React.memo(props => {
   //@ts-ignore 
   let publishPost = (values) => {
      //Надо найцти решение
      props.addPostActionCreator(values.newMessageBody)
   }
   //@ts-ignore 
   let AllPosts = props.postData.map((el => <MyPost message={el.message} like={el.like} />))

   return <div className={stl.AreaText}>
      <PostReduxForm onSubmit={publishPost} />
      {AllPosts}
   </div >
})

export default Post;