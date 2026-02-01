// react imports
import { useEffect, useMemo, useState, useRef } from "react";
// mui imports
import Typography from "@mui/material/Typography";
import { Paper, IconButton, Tooltip, Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  Edit as EditIcon,
  PersonAddAlt as AddIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
// custom hooks
import { useRolePermsGet } from "../hooks/data/useRolePermsGet";

// custom components
import RolePermsAdd from "./RolePermsAdd";
import RolePermsDelete from "./RolePermsDelete";
import TableHeader from "./TableHeader";
// import UserPermsAED from "./UserPermsAED";
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

function RolePerms(props) {
  const { role } = props;
  const getRolePerms = useRolePermsGet(role, { refetchOnWindowFocus: false });
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
        accessorKey: "permid",
        header: "Perm Id",
        size: 80,
      },
      {
        accessorKey: "system",
        header: "System",
        size: 100,
      },
      {
        accessorKey: "perm_desc", //normal accessorKey
        header: "Permission Description",
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

  // if the Add/Edit/Delete modal closes then refetch the roleperms
  useEffect(() => {
    // only refetch if AED is successful
    if (modeResult) {
      getRolePerms.refetch();
      queryClient.invalidateQueries(["roleperms"]);
    }
  }, [open, modeResult]);

  {
    return (
      <>
        <Box
          sx={{
            height: "100%",
            padding: "2px",
          }}
        >
          <TableHeader
            ref={headerRef}
            query={getRolePerms}
            headerText={
              role?.id
                ? "Permissions assigned to role: " +
                  role?.role +
                  " - " +
                  role?.role_desc
                : "...please select a role."
            }
          />

          <MaterialReactTable
            // Primary props
            initialState={{
              columnVisibility: { "mrt-row-select": false },
              density: "compact",
              showGlobalFilter: true,
            }}
            state={{
              isLoading: role?.id ? getRolePerms?.isLoading : false,
              showAlertBanner: false,
              showProgressBars: role?.id ? getRolePerms?.isFetching : false,
              showSkeletons: role?.id ? getRolePerms?.isLoading : false,
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
            enableMultiRowSelection={false}
            enablePagination={false}
            positionPagination={"bottom"}
            // enableRowSelection
            enableStickyHeader
            // on function props
            // onRowSelectionChange={handleSelect}
            // setting props
            columnResizeMode="onChange"
            getRowId={(row) => row.id}
            positionGlobalFilter="right"
            // Remove 1 of n rows selected message
            // positionToolbarAlertBanner="none"
            // mui props in order of hierarchy
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
            // muiTableFooterProps=
            // muiBottomToolbarProps=
            // table toolbar definition
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
        </Box>
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
                <RolePermsAdd
                  role={role}
                  getRolePerms={getRolePerms}
                  mode={mode}
                  setOpen={setOpen}
                  setModeResult={setModeResult}
                />
              ) : (
                <RolePermsDelete
                  role={role}
                  getRolePerms={getRolePerms}
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

export default RolePerms;
