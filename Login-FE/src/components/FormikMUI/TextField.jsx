import { Field } from "formik";
import TextFieldMUI from "@mui/material/TextField";

function TextField(props) {
  const { label, name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <TextFieldMUI
            name={name}
            label={label}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={form.errors[name] && form.touched[name]}
            helperText={form.errors[name]}
            {...rest}
          />
        );
      }}
    </Field>
  );
}

export default TextField;
