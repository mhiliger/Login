import TextFieldMUI from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function TextField(props) {
  const { name, form, select, selectOptions, ...rest } = props;
  const { register, getValues, formState } = form;
  const { errors } = formState;
  // console.log("name", name);
  // console.log("getValues", getValues(name));

  return (
    <>
      <TextFieldMUI
        select={select}
        defaultValue={getValues(name)}
        {...register(name)}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        {...rest}
      >
        {selectOptions &&
          selectOptions.map((option) => {
            return (
              <MenuItem
                key={option?.id}
                value={option?.value}
                aria-label={option}
              >
                {option?.name}
              </MenuItem>
            );
          })}
      </TextFieldMUI>
    </>
  );
}

export default TextField;
