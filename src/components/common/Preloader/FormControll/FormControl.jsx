import stl from "./FormControl.module.css";

const FormControl = ({ input, meta, ...props }) => {
   const hasError = meta.touched && meta.error;

   return <div className={stl.formControl + ' ' + (hasError ? stl.error : '')}>
      {props.children}
      {hasError && <div> <span className={stl.error}>{meta.error}</span></div>}
   </div >
}


export const TextArea = (props) => {
   const { input, meta, child, ...restProps } = props;
   return <FormControl {...props}> <textarea {...input} {...restProps} ></textarea> </FormControl>
}

export const Input = (props) => {
   const { input, meta, child, ...restProps } = props;
   return <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
}