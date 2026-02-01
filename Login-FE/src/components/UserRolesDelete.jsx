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
import { useUserRolesDelete } from "../hooks/data/useUserRolesDelete";
import { useMeasure } from "@uidotdev/usehooks";

// custom components

// material react table imports
import {
  MaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
} from "material-react-table";

// Main component
function UserRolesDelete(props) {
  console.log("RUNNING USERROLESADD COMPONENT");
  // state key data element and row
  const { user, getUserRoles, mode, setOpen, setModeResult } = props;
  const [rowSelection, setRowSelection] = useState({});
  const [rolesToAdd, setRolesToAdd] = useState([]);
  const [formError, setFormError] = useState("");
  const [reqError, setReqError] = useState("");
  const [toolbarRef, toolbarSize] = useMeasure();
  // modal for AED
  // const [open, setOpen] = useState(false);
  // const [mode, setMode] = useState("");
  // const [modeResult, setModeResult] = useState(false);
  // Optional if needed
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [sorting, setSorting] = useState([]);
  // create list of Roles not already assigned to the user

  const userRolesDelete = useUserRolesDelete();

  // refs
  const tableInstanceRef = useRef(null);

  // table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "Id",
      },
      {
        accessorKey: "role", //access nested data with dot notation
        header: "Role",
      },
      {
        accessorKey: "role_desc", //access nested data with dot notation
        header: "Role Description",
      },
    ],
    []
  );

  const handleSubmit = async () => {
    console.log("Adding", rowSelection);
    const deletedRoles = [];
    Object.keys(rowSelection).map((role) => {
      deletedRoles.push({ userid: user.id, roleid: parseInt(role) });
    });
    if (deletedRoles.length === 0) {
      setFormError("No roles selected.  Please select or CANCEL");
      return;
    }
    try {
      const resp = await userRolesDelete.mutateAsync({ delList: deletedRoles });
      console.log("userRolesDelete Resp", resp);
      console.log("ADDED ROLES", deletedRoles);
      setOpen(false);
      setModeResult(true);
    } catch (error) {
      setReqError(error?.response?.status);
      setFormError(error?.message);
      console.log("Deleted ROLES ERROR");
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
    console.log("GETROLES error", userRolesDelete?.error);
    if (userRolesDelete?.error?.response?.status === 403) {
      console.log("HANDLE LOGIN REQUEST");
    }
  }, [userRolesDelete?.isError]);

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
              // overflow: "auto",
            }}
          >
            {user?.email ? (
              <Typography
                sx={{
                  height: "1.75rem",
                  width: "100%",
                }}
                variant="h6"
              >
                Selected roles to delete from user:{" "}
                {user?.first + " " + user?.last}
              </Typography>
            ) : (
              <Typography
                sx={{
                  height: "1.75rem",
                  width: "100%",
                }}
                variant="h6"
              >
                No user selected
              </Typography>
            )}
            <Typography color="error">{formError}</Typography>
            <Box sx={{ height: "calc(100% - 1.75rem)" }}>
              <MaterialReactTable
                // Primary props
                initialState={{
                  // columnVisibility: { "mrt-row-select": false },
                  density: "compact",
                  showGlobalFilter: true,
                }}
                state={{
                  rowSelection,
                  isLoading: getUserRoles?.isLoading,
                  showAlertBanner: getUserRoles?.isError,
                  showProgressBars: getUserRoles?.isFetching,
                  showSkeletons: getUserRoles?.isLoading,
                  pagination,
                  sorting,
                }}
                data={getUserRoles?.data?.data || []}
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
                getRowId={(row) => row.id}
                positionGlobalFilter="right"
                // Remove 1 of n rows selected message
                // positionToolbarAlertBanner="none"
                // mui props in order of hierarchy
                // muiTablePaperProps=
                // muiTopToolbarProps=
                muiTablePaperProps={{
                  // height h(view port) -h(appbar) -h(title)- h(table tools) -h(buffer))
                  sx: {
                    height: "100%",
                    // height: "calc( 75vh - 1.75rem - 70px - 15px)",
                    // overflow: "auto",
                    // height: "100%",
                    // minHeight: "200px",
                  },
                }}
                muiTopToolbarProps={{ ref: toolbarRef }}
                muiTableContainerProps={{
                  // height h(view port) -h(appbar) -h(title)- h(table tools) -h(buffer))
                  sx: {
                    // height: "calc( 75vh - 1.75rem - 70px - 15px)",
                    height: `calc(100% - ${toolbarSize.height}px)`,
                    maxHeight: "none",
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
          </Box>
        </Stack>
      </>
    );
  }
}

export default UserRolesDelete;
