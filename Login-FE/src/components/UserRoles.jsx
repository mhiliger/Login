// react imports
import { useEffect, useMemo, useState, useRef } from "react";
// mui imports
import Typography from "@mui/material/Typography";
import { Paper, IconButton, Tooltip, Box, Alert } from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  Edit as EditIcon,
  PersonAddAlt as AddIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";

// custom hooks
import { useUserRolesGet } from "../hooks/data/useUserRolesGet";

// custom components
import UserRolesAdd from "./UserRolesAdd";
import UserRolesDelete from "./UserRolesDelete";
import TableHeader from "./TableHeader";

// material react table imports
import {
  MaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
} from "material-react-table";

import { useMeasure } from "@uidotdev/usehooks";

// react query imports
import { useQueryClient } from "@tanstack/react-query";

function UserRoles(props) {
  const { user } = props;
  const getUserRoles = useUserRolesGet(user, { refetchOnWindowFocus: false });

  const queryClient = useQueryClient();
  // state
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [modeResult, setModeResult] = useState(false);
  // refs
  const tableInstanceRef = useRef(null);
  const [toolbarRef, toolbarSize] = useMeasure();
  const [headerRef, headerSize] = useMeasure();

  // table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        size: 80,
      },
      {
        accessorKey: "role", //normal accessorKey
        header: "Role",
        size: 100,
      },
      {
        accessorKey: "role_desc",
        header: "Role Description",
      },
    ],
    []
  );

  const handleAdd = () => {
    setMode("Add");
    setModeResult(false);
    setOpen(true);
  };

  const handleDelete = () => {
    setMode("Delete");
    setModeResult(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // if the Add/Edit/Delete modal closes then refetch the users
  useEffect(() => {
    // only refetch if AED is successful
    if (modeResult) {
      getUserRoles.refetch();
      queryClient.invalidateQueries(["userperms"]);
    }
  }, [open, modeResult]);

  {
    return (
      <>
        <TableHeader
          ref={headerRef}
          query={getUserRoles}
          headerText={
            user?.email
              ? "Roles assigned to user: " + user?.first + " " + user?.last
              : "...please select a user."
          }
        />
        {/* {user?.email && ( */}
        <MaterialReactTable
          // Primary props
          initialState={{
            columnVisibility: { "mrt-row-select": false },
            density: "compact",
            showGlobalFilter: true,
            showProgressBars: false,
            showSkeletons: false,
          }}
          state={{
            isLoading: user?.email ? getUserRoles?.isLoading : false,
            showAlertBanner: false,
            showProgressBars: user?.email ? getUserRoles?.isFetching : false,
            showSkeletons: user?.email ? getUserRoles?.isLoading : false,
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
          enableMultiRowSelection={false}
          enablePagination={false}
          // positionPagination={"bottom"}
          // enableRowSelection
          enableStickyHeader
          // setting props
          columnResizeMode="onChange"
          getRowId={(row) => row.id}
          positionGlobalFilter="right"
          // Remove 1 of n rows selected message
          // positionToolbarAlertBanner="top"
          muiTopToolbarProps={{ ref: toolbarRef }}
          muiTableContainerProps={{
            // height h(view port) -h(appbar) -h(marg,border,pad) -h(title)- h(table tools) )
            sx: {
              height: `calc(( ( 100vh - 64px - 24px ) / 2) -  ${
                headerSize.height
              }px  - ${
                toolbarSize.height === null ? 0 : toolbarSize.height
              }px - 5px)`,
              maxHeight: "none",
            },
          }}
          //clicking anywhere on the row will select it
          muiTableBodyRowProps={({ row }) => ({
            onClick: row.getToggleSelectedHandler(),
            sx: { cursor: "pointer" },
          })}
          renderToolbarInternalActions={({ table }) => (
            <>
              {/* add your own custom print button or something */}
              <Tooltip title="Add Roles">
                <IconButton onClick={handleAdd}>
                  <AddIcon color="success" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Roles">
                <IconButton onClick={handleDelete}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
              {/* built-in buttons (must pass in table prop for them to work!) */}
              {/* <MRT_GlobalFilterTextField table={table} /> */}
              <MRT_ShowHideColumnsButton table={table} />
              <MRT_ToggleDensePaddingButton table={table} />
              <MRT_ToggleFiltersButton table={table} />
            </>
          )}
        />
        {/* )} */}
        <Modal open={open}>
          <>
            <Paper
              sx={{
                maxWidth: "75vw",
                height: "75vh",
                margin: "Auto",
                marginTop: "10vh",
              }}
            >
              {mode === "Add" ? (
                <UserRolesAdd
                  user={user}
                  getUserRoles={getUserRoles}
                  mode={mode}
                  setOpen={setOpen}
                  setModeResult={setModeResult}
                />
              ) : (
                <UserRolesDelete
                  user={user}
                  getUserRoles={getUserRoles}
                  mode={mode}
                  setOpen={setOpen}
                  setModeResult={setModeResult}
                />
              )}
            </Paper>
          </>
        </Modal>
      </>
    );
  }
}

export default UserRoles;
