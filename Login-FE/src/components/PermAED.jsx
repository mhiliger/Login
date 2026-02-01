import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import TextField from "./HookFormMUI/TextField";

import { Button, Stack, Box, Modal, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

import { yupResolver } from "@hookform/resolvers/yup";

import { permSchema } from "../constants/permSchema";
import { usePermAddPost } from "../hooks/data/usePermAddPost";
import { usePermEditPut } from "../hooks/data/usePermEditPut";
import { usePermDelete } from "../hooks/data/usePermDelete";
import ConfirmModal from "./ConfirmModal";
import { useQueryClient } from "@tanstack/react-query";

const PermAED = ({ mode, perm, setPerm, setOpen, setModeResult }) => {
  const [formError, setFormError] = useState("");
  const [sureWarning, setSureWarning] = useState(false);
  const [ok, setOk] = useState(false);
  const [users, setUsers] = useState(undefined);
  const [roles, setRoles] = useState(undefined);
  const queryClient = useQueryClient();
  const usersData = queryClient.getQueryData(["usersbyperm", perm?.id]);
  const rolesData = queryClient.getQueryData(["rolesbyperm", perm?.id]);

  const form = useForm({
    defaultValues: {
      system: mode === "Add" ? "" : perm?.system,
      perm_desc: mode === "Add" ? "" : perm?.perm_desc,
    },
    resolver: yupResolver(permSchema),
  });

  const { register, handleSubmit, formState, control, setFocus } = form;
  const { errors, dirtyFields } = formState;

  const permAdd = usePermAddPost();
  const permDelete = usePermDelete();
  const permEdit = usePermEditPut();

  const onSubmit = async (values) => {
    setFormError("");
    console.log(values);
    let obj = {};
    if (mode === "Edit") {
      if (dirtyFields.system) {
        obj.system = values.system;
      }
      if (dirtyFields.perm_desc) {
        obj.perm_desc = values.perm_desc;
      }

      try {
        const resp = await permEdit.mutateAsync({ id: perm?.id, perm: obj });
        console.log("perm", resp);
        setOpen(false);
        setModeResult(true);
        setRole(resp?.data[0]);
      } catch (error) {
        setFormError(error?.message);
      }
    }
    if (mode === "Add") {
      obj.system = values?.system;
      obj.perm_desc = values?.perm_desc;

      console.log("permAdd", permAdd);
      try {
        const resp = await permAdd.mutateAsync(obj);
        console.log("perm", resp);
        setOpen(false);
        setModeResult(true);
        setPerm(resp?.data[0]);
      } catch (error) {
        setFormError(error?.message);
      }
    }
    if (mode === "Delete") {
      setSureWarning(true);
      setOk(false);
    }
  };

  const handleCancel = (values) => {
    setOpen(false);
  };

  useEffect(() => {
    setUsers(usersData?.data.length);
    setRoles(rolesData?.data.length);
    // // no need to confirm if the delete will not impact users or roles
    // if (users === 0 && roles === 0 && mode === "Delete") {
    //   setOk(true);
    // }
  }, []);

  // only delete if confirm modal submits the delete
  useEffect(() => {
    const delPerm = async () => {
      try {
        console.log("deleting", perm?.id);
        const resp = await permDelete.mutateAsync(perm?.id);
        console.log("role", resp);
        if (resp.data.length === 0) {
          setFormError("Delete operation failed (404)");
          return;
        }
        setOpen(false);
        setModeResult(true);
        setPerm(undefined);
      } catch (error) {
        setFormError(error?.message);
      }
    };
    if (ok) {
      setOk(false);
      delPerm();
    }
  }, [ok]);

  useEffect(() => {
    setFocus("perm");
  }, [setFocus]);

  return (
    <>
      {/* {loginIsError && <div>{loginError?.message}</div>} */}

      <Box width="75%" margin="auto" padding="20px">
        {/* {formError && <Alert severity="error">{formError}</Alert>} */}
        {/* {loginData && <Alert severity="error">{loginData}</Alert>} */}
        <Typography variant="h5">
          {mode === "Add" ? (
            <span>Add Permission</span>
          ) : mode === "Edit" ? (
            <span>Edit Permission</span>
          ) : (
            <span>Delete Permission</span>
          )}
        </Typography>
        <Typography color="error">{formError}</Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={{ margin: "auto", overflow: "auto", height: "50vh" }}>
            <Stack sx={{ width: "60%", margin: "auto", overflow: "auto" }}>
              <TextField
                form={form}
                name="system"
                label="System"
                type="text"
                placeholder="Enter system name"
                margin="normal"
                size="small"
                disabled={mode === "Delete" ? true : false}
              />
              <TextField
                form={form}
                name="perm_desc"
                label="Permission Description"
                type="text"
                placeholder="Enter permission description"
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
        title="Delete Permissions Warning"
      >
        It is very dangerous to delete permissions. Ensure all systems no longer
        use this permission before deleting.
        {users > 0 &&
          "  This permission will be removed from " +
            roles +
            " role(s) impacting " +
            users +
            " user(s). "}
        {users === 0 && roles > 0
          ? "  This permission will be removed from " + roles + " roles. "
          : ""}
        <br />
        <br />
        Press Submit to confirm delete, or Cancel to exit without deleting.
      </ConfirmModal>
    </>
  );
};

export default PermAED;
