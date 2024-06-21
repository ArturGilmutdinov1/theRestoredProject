import { WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import stl from "./FormControl.module.css";


type FormControlParamsType = {
   meta: WrappedFieldMetaProps
   children: React.ReactNode
}
type FormControlType = (params: FormControlParamsType) => React.ReactNode

const FormControl: FormControlType = ({ meta, ...props }) => {
   const hasError = meta.touched && meta.error;

   return <div className={stl.formControl + ' ' + (hasError ? stl.error : '')}>
      {props.children}
      {hasError && <div> <span className={stl.error}>{meta.error}</span></div>}
   </div >
}


export const TextArea: React.FC<WrappedFieldProps> = (props) => {
   const { input, meta, ...restProps } = props;
   return <FormControl {...props}> <textarea {...input} {...restProps} ></textarea> </FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
   const { input, meta, ...restProps } = props;
   return <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
}