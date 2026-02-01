import { useState } from "react";
import { Controller } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SelectMUI from "@mui/material/Select";
import Typography from "@mui/material/Typography";

function Select(props) {
  const { name, label, form, selectOptions, ...rest } = props;
  const { register, getValues, setValue, formState, control } = form;
  const { errors } = formState;
  // const [fieldValue, setFieldValue] = useState(getValues(name));
  // console.log("name", name);
  // console.log("getValues", getValues(name));

  // const handleChange = (event) => {
  //   setValue(name, event.target.value, {
  //     shouldValidate: true,
  //     shouldDirty: true,
  //     shouldTouch: true,
  //   });
  // };

  return (
    <>
      <FormControl margin="none" fullWidth sx={{ marginTop: "4px" }}>
        <InputLabel
          sx={{
            backgroundColor: "white",
            border: 3,
            // border: 6,
            borderColor: "white",
            marginTop: 0,
          }}
          id={name + "-label"}
          color={errors[name] ? "error" : ""}
        >
          {label}
        </InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <>
                <SelectMUI
                  sx={{ marginTop: 1 }}
                  labelId={name + "-label"}
                  id={name + "-id"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  // open={true}
                  error={!!errors[name]}
                  {...rest}

                  // helperText={errors[name]?.message}
                >
                  {selectOptions.map((option) => {
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
                </SelectMUI>
                <Typography
                  sx={{ marginLeft: 2 }}
                  color="error"
                  variant="caption"
                >
                  {errors[name]?.message}
                </Typography>
              </>
            );
          }}
        />
      </FormControl>
    </>
  );
}

export default Select;
