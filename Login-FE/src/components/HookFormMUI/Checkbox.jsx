import CheckboxMUI from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function Checkbox(props) {
  const { name, label, labelPlacement, form, ...rest } = props;
  const { register, formState } = form;
  const { errors } = formState;

  return (
    <>
      <FormControlLabel
        label={label}
        labelPlacement={labelPlacement}
        control={
          <CheckboxMUI
            {...register(name)}
            // error={!!errors[name]}
            // helperText={errors[name]?.message}
            {...rest}
          />
        }
      />
    </>
  );
}

export default Checkbox;
