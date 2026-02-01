import { Field, ErrorMessage } from "formik";
import CheckboxMUI from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function Checkbox(props) {
  const { label, name, labelPlacement, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <>
            <FormControlLabel
              label={label}
              labelPlacement={labelPlacement}
              control={
                <CheckboxMUI
                  name={name}
                  value={field.value}
                  onChange={field.onChange}
                  //   onBlur={field.onBlur}
                  //  error={form.errors[name] && form.touched[name]}
                  {...rest}
                />
              }
            />
            <ErrorMessage name={name} />
          </>
        );
      }}
    </Field>
  );
}

export default Checkbox;
