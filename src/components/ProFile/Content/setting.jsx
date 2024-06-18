import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Input } from "../../common/Preloader/FormControll/FormControl";



let SettingForm = (props) => {
   const maxLength = maxLengthCreator(50)
   return <form onSubmit={props.handleSubmit}>
      <div>
         <b>aboutMe</b> <Field placeholder={'job'} name={"aboutMe"} component={Input} validate={[required, maxLength]} type="text" />
      </div>
      <div>
         <b>fullName</b> <Field placeholder={'job'} name={"fullName"} component={Input} validate={[required, maxLength]} type="text" />
      </div>
      <div>
         <b>job</b> <Field placeholder={'job'} name={"lookingForAJobDescription"} component={Input} validate={[required, maxLength]} type="text" />
      </div>
      <div><button>Отправить</button></div>
   </form>

}

const SettingReduxForm = reduxForm({ form: 'info' })(SettingForm)

const Setting = (props) => {
   const onSubmit = (formData) => {
      props.saveDataProfile(formData).then(() => props.setSetings(false))
   }

   let onMainPhotoSelected = (e) => {
      if (e.target.files.length) {
         props.savePhoto(e.target.files[0])
      }
   }

   return <div>
      <div ><b>изменить фотографию</b> <input type="file" name="foto" onChange={onMainPhotoSelected} /> </div>
      <SettingReduxForm onSubmit={onSubmit} />
      {/*добить initialValues={profile} */}
   </div>
}






export default Setting;