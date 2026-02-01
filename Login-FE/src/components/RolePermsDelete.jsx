// react imports
import { useEffect, useMemo, useState, useRef } from "react";
// mui imports
import Typography from "@mui/material/Typography";
import { Paper, IconButton, Tooltip, Box, Stack, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  Edit as EditIcon,
  PersonAddAlt as AddIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";

// custom react query data hooks
import { useRolePermsDelete } from "../hooks/data/useRolePermsDelete";

// custom components

// material react table imports
import {
  MaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
} from "material-react-table";

// Main component
function RolePermsDelete(props) {
  console.log("RUNNING USERROLESADD COMPONENT");
  // state key data element and row
  const { role, getRolePerms, mode, setOpen, setModeResult } = props;
  const [rowSelection, setRowSelection] = useState({});
  const [formError, setFormError] = useState("");
  const [reqError, setReqError] = useState("");
  // modal for AED
  // const [open, setOpen] = useState(false);
  // const [mode, setMode] = useState("");
  // const [modeResult, setModeResult] = useState(false);
  // Optional if needed
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [sorting, setSorting] = useState([]);
  // create list of Roles not already assigned to the user

  const rolePermsDelete = useRolePermsDelete();

  // refs
  const tableInstanceRef = useRef(null);

  // table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "permid", //access nested data with dot notation
        header: "Perm Id",
      },
      {
        accessorKey: "system", //access nested data with dot notation
        header: "System",
      },
      {
        accessorKey: "perm_desc", //access nested data with dot notation
        header: "Permission Description",
      },
    ],
    []
  );

  const handleSubmit = async () => {
    console.log("Adding", rowSelection);
    const deletedPerms = [];
    Object.keys(rowSelection).map((perm) => {
      deletedPerms.push({ roleid: role.id, permid: parseInt(perm) });
    });
    if (deletedPerms.length === 0) {
      setFormError("No permissions selected.  Please select or CANCEL");
      return;
    }
    try {
      const resp = await rolePermsDelete.mutateAsync({ delList: deletedPerms });
      console.log("userRolesDelete Resp", resp);
      console.log("ADDED ROLES", deletedPerms);
      setOpen(false);
      setModeResult(true);
    } catch (error) {
      setReqError(error?.response?.status);
      setFormError(error?.message);
      console.log("Deleted Perms ERROR");
      // setReqError(error?.response?.status);
      // // if detailed error was sent then use it rather than the generic error
      // if (error?.response?.data?.error) {
      //   setFormError(
      //     error?.response?.data?.error + " (" + error?.response?.status + ")"
      //   );
      // } else {
      //   setFormError(userEdit.error?.message);
      // }
    }
  };

  // const handleDelete = () => {
  //   setFormError("");
  //   // console.log("Deleting", rowSelection);
  //   // if (Object.keys(rowSelection).length === 0) {
  //   //   showAlertBanner: true;
  //   //   alert("Select a row to delete");
  //   //   return;
  //   // }

  //   setMode("Delete");
  //   setModeResult(false);
  //   setOpen(true);
  // };
  const handleCancel = () => {
    setOpen(false);
  };

  // detect need to log back in after timout
  useEffect(() => {
    console.log("RUNNING LOGOUT EFFECT");
    if (rolePermsDelete?.error?.response?.status === 403) {
      console.log("HANDLE LOGIN REQUEST");
    }
  }, [rolePermsDelete?.isError]);

  {
    return (
      <>
        <Stack direction="row">
          <Box
            sx={{
              height: "calc( 75vh - 15px)",
              width: "100%",
              border: "solid",
              borderWidth: "2px",
              margin: "3px",
              padding: "3px",
              overflow: "auto",
            }}
          >
            {role?.id ? (
              <Typography
                sx={{
                  height: "1.75rem",
                  width: "100%",
                }}
                variant="h6"
              >
                Select permissions to delete from role:{" "}
                {role?.role + " - " + role?.role_desc}
              </Typography>
            ) : (
              <Typography
                sx={{
                  height: "1.75rem",
                  width: "100%",
                }}
                variant="h6"
              >
                No role selected
              </Typography>
            )}
            <Typography color="error">{formError}</Typography>
            <MaterialReactTable
              // Primary props
              initialState={{
                // columnVisibility: { "mrt-row-select": false },
                density: "compact",
                showGlobalFilter: true,
              }}
              state={{
                rowSelection,
                isLoading: getRolePerms?.isLoading,
                showAlertBanner: getRolePerms?.isError,
                showProgressBars: getRolePerms?.isFetching,
                showSkeletons: getRolePerms?.isLoading,
                pagination,
                sorting,
              }}
              data={getRolePerms?.data?.data || []}
              columns={columns}
              // reference props
              tableInstanceRef={tableInstanceRef}
              // enable props
              enableBottomToolbar={false}
              enableColumnResizing
              enableColumnDragging
              enableColumnOrdering
              enableFullScreenToggle={false}
              enableMultiRowSelection={true}
              enablePagination={false}
              positionPagination={"bottom"}
              enableRowSelection
              enableStickyHeader
              // on function props
              onRowSelectionChange={setRowSelection}
              onPaginationChange={setPagination}
              onSortingChange={setSorting}
              // setting props
              columnResizeMode="onChange"
              getRowId={(row) => row.permid}
              positionGlobalFilter="right"
              // Remove 1 of n rows selected message
              // positionToolbarAlertBanner="none"
              // mui props in order of hierarchy
              // muiTablePaperProps=
              // muiTopToolbarProps=
              muiTableContainerProps={{
                // height h(view port) -h(appbar) -h(title)- h(table tools) -h(buffer))
                sx: {
                  // height: "calc( 75vh - 1.75rem - 70px - 15px)",
                  overflow: "auto",
                  // height: "100%",
                  // minHeight: "200px",
                },
              }}
              // muiTableProps=
              // muiTableHeadProps=
              // muiTableBodyProps=
              //clicking anywhere on the row will select it
              muiTableBodyRowProps={({ row }) => ({
                onClick: row.getToggleSelectedHandler(),
                sx: { cursor: "pointer" },
              })}
              // muiTableFooterProps=
              // muiBottomToolbarProps=
              // table toolbar definition
              renderToolbarInternalActions={({ table }) => (
                <>
                  {/* add your own custom print button or something */}
                  <Button
                    sx={{ margin: "10px" }}
                    variant="outlined"
                    // type="submit"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ margin: "10px" }}
                    variant="outlined"
                    // type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>

                  {/* <Tooltip title="Add User">
                    <IconButton onClick={handleAdd}>
                      <AddIcon color="success" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit User">
                    <IconButton onClick={handleEdit}>
                      <EditIcon color="warning" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete User">
                    <IconButton onClick={handleDelete}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip> */}
                  {/* built-in buttons (must pass in table prop for them to work!) */}
                  {/* <MRT_GlobalFilterTextField table={table} /> */}
                  <MRT_ShowHideColumnsButton table={table} />
                  <MRT_ToggleDensePaddingButton table={table} />
                  <MRT_ToggleFiltersButton table={table} />
                </>
              )}
            />
          </Box>
        </Stack>
      </>
    );
  }
}

export default RolePermsDelete;
