// React
import { useEffect, useState } from "react";
// Material UI
import { Button, Stack, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
// Forms
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import TextField from "./HookFormMUI/TextField";
import Select from "./HookFormMUI/Select";
import { yupResolver } from "@hookform/resolvers/yup";
// Constants
import {
  validStatus,
  userAddSchema,
  userEditSchema,
  userDeleteSchema,
} from "../constants/userSchema";
// Data Queries
import { useUserAddPost } from "../hooks/data/useUserAddPost";
import { useUserEditPut } from "../hooks/data/useUserEditPut";
import { useUserDelete } from "../hooks/data/useUserDelete";
// Component
const UserAED = ({ ref, mode, user, setUser, setOpen, setModeResult }) => {
  console.log("In UserAED");
  const [formError, setFormError] = useState("");

  const handleCancel = (values) => {
    setOpen(false);
  };

  const myResolver =
    mode === "Add"
      ? userAddSchema
      : mode === "Edit"
      ? userEditSchema
      : userDeleteSchema;

  const form = useForm({
    defaultValues: {
      email: mode === "Add" ? "" : user?.email,
      first: mode === "Add" ? "" : user?.first,
      last: mode === "Add" ? "" : user?.last,
      status: mode === "Add" ? "Inactive" : user?.status,
      password: "",
      confirmPwd: "",
    },
    resolver: yupResolver(myResolver),
  });

  const { register, handleSubmit, formState, control, setFocus } = form;
  const { errors, dirtyFields } = formState;

  const userAdd = useUserAddPost();
  const userDelete = useUserDelete();
  const userEdit = useUserEditPut();

  const onSubmit = async (values) => {
    setFormError("");
    console.log(values);
    let obj = {};
    if (mode === "Edit") {
      if (dirtyFields.email) {
        obj.email = values.email;
      }
      if (dirtyFields.first) {
        obj.first = values.first;
      }
      if (dirtyFields.last) {
        obj.last = values.last;
      }
      if (dirtyFields.status) {
        obj.status = values.status;
      }
      if (dirtyFields.password) {
        obj.password = values.password;
      }
      if (Object.keys(obj).length > 0) {
        try {
          const resp = await userEdit.mutateAsync({ id: user?.id, user: obj });
          console.log("user", resp);
          setOpen(false);
          setModeResult(true);
          setUser(resp?.data[0]);
        } catch (error) {
          setFormError(error?.message);
        }
      } else {
        setFormError("No changes made.  Unable to update.");
      }
    }
    if (mode === "Add") {
      obj.email = values?.email;
      obj.first = values?.first;
      obj.last = values?.last;
      obj.status = values?.status;
      obj.password = values?.password;
      console.log("userAdd", userAdd);
      try {
        const resp = await userAdd.mutateAsync(obj);
        console.log("user", resp);
        setOpen(false);
        setModeResult(true);
        setUser(resp?.data);
      } catch (error) {
        setFormError(error?.message);
      }
    }
    if (mode === "Delete") {
      try {
        console.log("deleting", user.id);
        const resp = await userDelete.mutateAsync(user.id);
        console.log("user", resp);
        if (resp.data.length === 0) {
          setReqError("404");
          setFormError("Delete operation failed (404)");
          return;
        }
        setOpen(false);
        setModeResult(true);
        setUser(undefined);
      } catch (error) {
        setFormError(error?.message);
      }
    }
  };

  const convertDate = (dateStr) => {
    const cellDate = new Date(dateStr);
    return cellDate.toLocaleDateString();
  };

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);
  return (
    <>
      {/* {loginIsError && <div>{loginError?.message}</div>} */}

      <Box width="75%" margin="auto" padding="20px">
        {/* {formError && <Alert severity="error">{formError}</Alert>} */}
        {/* {loginData && <Alert severity="error">{loginData}</Alert>} */}
        <Typography variant="h5">
          {mode === "Add" ? (
            <span>Add User</span>
          ) : mode === "Edit" ? (
            <span>Edit User</span>
          ) : (
            <span>Delete User</span>
          )}
        </Typography>
        <Typography color="error">{formError}</Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={{ margin: "auto", overflow: "auto", height: "50vh" }}>
            <Stack sx={{ width: "60%", margin: "auto", overflow: "auto" }}>
              <TextField
                form={form}
                name="email"
                label="email"
                type="email"
                placeholder="Enter email"
                margin="normal"
                size="small"
                disabled={mode === "Delete" ? true : false}
              />
              <TextField
                form={form}
                name="first"
                label="First"
                type="first"
                placeholder="Enter first name"
                margin="normal"
                size="small"
                disabled={mode === "Delete" ? true : false}
              />
              <TextField
                form={form}
                name="last"
                label="Last"
                type="last"
                placeholder="Enter last name"
                margin="normal"
                size="small"
                disabled={mode === "Delete" ? true : false}
              />
              <Select
                ref={ref}
                form={form}
                selectOptions={validStatus}
                name="status"
                label="Status"
                type="select"
                placeholder="Select status"
                margin="normal"
                size="small"
                disabled={mode === "Delete" ? true : false}
              />
              {mode !== "Delete" && (
                <>
                  <TextField
                    form={form}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    margin="normal"
                    size="small"
                  />
                  <TextField
                    form={form}
                    name="confirmPwd"
                    label="Re-enter password"
                    type="password"
                    placeholder="Re-enter password"
                    margin="normal"
                    size="small"
                  />
                </>
              )}
              <>
                <Typography>
                  User created:{" "}
                  {user?.created_at ? convertDate(user?.created_at) : "unknown"}
                </Typography>
                <Typography>
                  User updated:{" "}
                  {user?.updated_at ? convertDate(user?.updated_at) : "unknown"}
                </Typography>
                <Typography>
                  Password updated:{" "}
                  {user?.password_at
                    ? convertDate(user?.password_at)
                    : "never updated"}
                </Typography>
              </>
            </Stack>
          </Box>
          <Stack direction="row">
            <Button
              sx={{ margin: "10px" }}
              variant="outlined"
              type="submit"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button sx={{ margin: "10px" }} variant="outlined" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
        <DevTool control={control} />
      </Box>
    </>
  );
};

export default UserAED;
