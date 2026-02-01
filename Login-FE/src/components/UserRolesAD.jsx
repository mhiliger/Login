import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import TextField from "./HookFormMUI/TextField";
import Select from "./HookFormMUI/Select";

import { Button, Stack, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import { yupResolver } from "@hookform/resolvers/yup";

import {
  validStatus,
  PWD_REGEX,
  userRoleAddSchema,
  userRoleDeleteSchema,
} from "../constants/constants";
import { useRolesGet } from "../hooks/data/useRolesGet";
import { useUserRolesAddPost } from "../hooks/data/useUserRolesAddPost";
import { useUserRolesDelete } from "../hooks/data/useUserRolesDelete";

const UserRolesAD = ({
  mode,
  setOpen,
  setModeResult,
  user,
  userRole,
  setUserRole,
}) => {
  const [formError, setFormError] = useState("");
  const [reqError, setReqError] = useState("");

  const myResolver = userRoleAddSchema;

  const form = useForm({
    defaultValues: {
      role: mode === "Add" ? "" : userRole?.role,
      role_desc: mode === "Add" ? "" : userRole?.role_desc,
    },
    resolver: yupResolver(myResolver),
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors, dirtyFields } = formState;

  const rolesGet = useRolesGet();
  const userRolesAdd = useUserRolesAddPost();
  const userRolesDelete = useUserRolesDelete();

  const onSubmit = async (values) => {
    setReqError("");
    setFormError("");
    console.log(values);
    let obj = {};

    if (mode === "Add") {
      obj.role = values?.role;
      obj.role_desc = values?.role_desc;

      console.log("userRoleAdd", userAdd);
      try {
        const user = await userAdd.mutateAsync(obj);
        console.log("user", user);
        setOpen(false);
        setModeResult(true);
        setUser(user?.data);
      } catch (error) {
        setReqError(error?.response?.status);
        setFormError(error?.message);
        // setReqError(error?.response?.status);
        // // if detailed error was sent then use it rather than the generic error
        // if (error?.response?.data?.error) {
        //   setFormError(
        //     error?.response?.data?.error + " (" + error?.response?.status + ")"
        //   );
        // } else {
        //   setFormError(userAdd.error?.message);
        // }
      }
    }
    if (mode === "Delete") {
      try {
        console.log("deleting", userRole.id);
        const resp = await userRoleDelete.mutateAsync({
          userid: user.id,
          roleid: userRole.id,
        });
        console.log("user", resp);
        if (resp.data.length === 0) {
          setReqError("404");
          setFormError("Delete operation failed (404)");
          return;
        }
        setOpen(false);
        setModeResult(true);
        setRole(undefined);
      } catch (error) {
        setReqError(error?.response?.status);
        setFormError(error?.message);
        // // if detailed error was sent then use it rather than the generic error
        // if (error?.response?.data?.error) {
        //   setFormError(
        //     error?.response?.data?.error + " (" + error?.response?.status + ")"
        //   );
        // } else {
        //   setFormError(userAdd.error?.message);
        // }
      }
    }
  };

  const handleCancel = (values) => {
    console.log(values);
    // console.log("reqError", reqError);
    // if login expired
    console.log("CANCEL");
    if (reqError === 403) {
      console.log("reqError", reqError);
    }
    setOpen(false);
  };

  useEffect(() => {
    console.log("formState", formState);
    console.log("errors", errors);
  }, [formState]);

  return (
    <>
      {/* {loginIsError && <div>{loginError?.message}</div>} */}

      <Box width="75%" margin="auto" padding="20px">
        {/* {formError && <Alert severity="error">{formError}</Alert>} */}
        {/* {loginData && <Alert severity="error">{loginData}</Alert>} */}
        <Typography variant="h5">
          {mode === "Add" ? (
            <span>Add Role to User</span>
          ) : (
            <span>Delete Role from User</span>
          )}
        </Typography>
        <Typography color="error">{formError}</Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={{ margin: "auto", overflow: "auto", height: "50vh" }}>
            {mode === "Delete" && (
              <Stack sx={{ width: "60%", margin: "auto", overflow: "auto" }}>
                <TextField
                  form={form}
                  name="role"
                  label="Role"
                  type="string"
                  placeholder="Enter role"
                  margin="normal"
                  size="small"
                />
                <TextField
                  form={form}
                  name="role_desc"
                  label="Role Description"
                  type="string"
                  placeholder="Enter role description"
                  margin="normal"
                  size="small"
                />
              </Stack>
            )}
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

export default UserRolesAD;
