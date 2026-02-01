import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import TextField from "./HookFormMUI/TextField";
import Select from "./HookFormMUI/Select";

import { Button, Stack, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import { yupResolver } from "@hookform/resolvers/yup";

import { validStatus, PWD_REGEX, roleSchema } from "../constants/constants";
import { useRoleAddPost } from "../hooks/data/useRoleAddPost";
import { useRoleEditPut } from "../hooks/data/useRoleEditPut";
import { useRoleDelete } from "../hooks/data/useRoleDelete";
import ConfirmModal from "./ConfirmModal";
import { useQueryClient } from "@tanstack/react-query";

const RoleAED = ({ mode, role, setRole, setOpen, setModeResult }) => {
  const [formError, setFormError] = useState("");
  const [sureWarning, setSureWarning] = useState(false);
  const [ok, setOk] = useState(false);
  const [users, setUsers] = useState(undefined);
  const queryClient = useQueryClient();
  const usersData = queryClient.getQueryData(["usersbyrole", role?.id]);

  const form = useForm({
    defaultValues: {
      role: mode === "Add" ? "" : role?.role,
      role_desc: mode === "Add" ? "" : role?.role_desc,
    },
    resolver: yupResolver(roleSchema),
  });

  const { register, handleSubmit, formState, control, setFocus } = form;
  const { errors, dirtyFields } = formState;

  const roleAdd = useRoleAddPost();
  const roleDelete = useRoleDelete();
  const roleEdit = useRoleEditPut();

  const onSubmit = async (values) => {
    setFormError("");
    console.log(values);
    let obj = {};
    if (mode === "Edit") {
      if (dirtyFields.role) {
        obj.role = values.role;
      }
      if (dirtyFields.role_desc) {
        obj.role_desc = values.role_desc;
      }

      try {
        const resp = await roleEdit.mutateAsync({ id: role?.id, role: obj });
        console.log("role", resp);
        setOpen(false);
        setModeResult(true);
        setRole(resp?.data[0]);
      } catch (error) {
        setFormError(error?.message);
      }
    }
    if (mode === "Add") {
      obj.role = values?.role;
      obj.role_desc = values?.role_desc;

      console.log("roleAdd", roleAdd);
      try {
        const resp = await roleAdd.mutateAsync(obj);
        console.log("role", resp);
        setOpen(false);
        setModeResult(true);
        setRole(resp?.data[0]);
      } catch (error) {
        setFormError(error?.message);
      }
    }
    if (mode === "Delete") {
      setSureWarning(true);
      setOk(false);
    }
  };
  useEffect(() => {
    setUsers(usersData?.data.length);
    // // no need to confirm if the delete will not impact users or roles
    // if (users === 0 && roles === 0 && mode === "Delete") {
    //   setOk(true);
    // }
  }, []);
  useEffect(() => {
    const delRole = async () => {
      try {
        console.log("deleting", role.id);
        const resp = await roleDelete.mutateAsync(role.id);
        console.log("role", resp);
        if (resp.data.length === 0) {
          setFormError("Delete operation failed (404)");
          return;
        }
        setOpen(false);
        setModeResult(true);
        setRole(undefined);
      } catch (error) {
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
    };
    if (ok) {
      setOk(false);
      delRole();
    }
  }, [ok]);

  useEffect(() => {
    setFocus("role");
  }, [setFocus]);

  const handleCancel = (values) => {
    setOpen(false);
  };

  return (
    <>
      {/* {loginIsError && <div>{loginError?.message}</div>} */}

      <Box width="75%" margin="auto" padding="20px">
        {/* {formError && <Alert severity="error">{formError}</Alert>} */}
        {/* {loginData && <Alert severity="error">{loginData}</Alert>} */}
        <Typography variant="h5">
          {mode === "Add" ? (
            <span>Add Role</span>
          ) : mode === "Edit" ? (
            <span>Edit Role</span>
          ) : (
            <span>Delete Role</span>
          )}
        </Typography>
        <Typography color="error">{formError}</Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={{ margin: "auto", overflow: "auto", height: "50vh" }}>
            <Stack sx={{ width: "60%", margin: "auto", overflow: "auto" }}>
              <TextField
                form={form}
                name="role"
                label="Role"
                type="text"
                placeholder="Enter role"
                margin="normal"
                size="small"
                disabled={mode === "Delete" ? true : false}
              />
              <TextField
                form={form}
                name="role_desc"
                label="Role Description"
                type="text"
                placeholder="Enter role description"
                margin="normal"
                size="small"
                disabled={mode === "Delete" ? true : false}
              />
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
      <ConfirmModal
        open={sureWarning}
        setOpen={setSureWarning}
        onCancel={() => {
          setSureWarning(false);
          setOpen(false);
        }}
        onSubmit={() => {
          setSureWarning(false);
          setOk(true);
        }}
        title="Delete Role Warning"
      >
        Deleting roles can impact user access.
        {users > 0
          ? "  This role will be removed from " + users + " user(s)."
          : "  No users are currently assigned this role."}
        <br />
        <br />
        Press Submit to confirm delete, or Cancel to exit without deleting.
      </ConfirmModal>
    </>
  );
};

export default RoleAED;
