import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { photosType } from "../../../redux/profileReducer";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Input } from "../../common/Preloader/FormControll/FormControl";

type SettingFormType = {
   aboutMe: string
   fullName: string
   lookingForAJobDescription: string
}

let SettingForm: React.FC<InjectedFormProps<SettingFormType>> = (props) => {
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

const SettingReduxForm = reduxForm<SettingFormType>({ form: 'info' })(SettingForm)



type mapStateToPropsType = {
   userID: number
}
type MapDispatchToPropsType = {
   saveDataProfile: (formData: any) => Promise<any>
   setSetings: (settings: boolean) => void
   savePhoto: (photo: photosType) => void
}
const Setting: React.FC<mapStateToPropsType & MapDispatchToPropsType> = (props) => {
   const onSubmit = (formData: any) => {
      props.saveDataProfile(formData).then(() => props.setSetings(false))
   }

   let onMainPhotoSelected = (e: any) => {
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