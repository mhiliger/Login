// react imports
import { useEffect, useMemo, useState, useRef } from "react";
// mui imports
import Typography from "@mui/material/Typography";
import { Paper, IconButton, Tooltip, Box, Stack } from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  Edit as EditIcon,
  PersonAddAlt as AddIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
// custom hooks
import { useRolesGet } from "../hooks/data/useRolesGet";

// custom components
import UsersByRole from "./UsersByRole";
import RolePerms from "./RolePerms";
import RoleAED from "./RoleAED";
import TableHeader from "./TableHeader";

// import RolePerms from "./RolePerms";
// import RoleAED from "./RoleAED";
// material react table imports
import {
  MaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
} from "material-react-table";

import { useMeasure } from "@uidotdev/usehooks";
import { useClickAway } from "@uidotdev/usehooks";

// Main component
function Roles() {
  // state
  const [role, setRole] = useState(undefined);
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [modeResult, setModeResult] = useState(false);
  // while debugging turn off window focus
  const getRoles = useRolesGet({ refetchOnWindowFocus: false, retry: false });

  // refs
  const tableInstanceRef = useRef(null);
  const [toolbarRef, toolbarSize] = useMeasure();
  const [headerRef, headerSize] = useMeasure();
  const handleClose = () => {
    setOpen(false);
  };
  const formRef = useClickAway(handleClose);

  // table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "id", //normal accessorKey
        header: "Id",
        size: 80,
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 100,
      },
      {
        accessorKey: "role_desc", //access nested data with dot notation
        header: "Role Description",
        size: 120,
      },
    ],
    []
  );
  // event handlers
  const handleSelect = (row) => {
    setRowSelection(row());
    // setRole(
    //   getRoles?.data?.data.find((role) => {
    //     return role.id.toString() === Object.keys(row())[0];
    //   })
    // );
  };
  const handleAdd = () => {
    setMode("Add");
    setModeResult(false);
    setOpen(true);
  };
  const handleEdit = () => {
    if (Object.keys(rowSelection).length === 0) {
      // showAlertBanner: true;
      alert("Select a row to edit");
      return;
    }

    setMode("Edit");
    setModeResult(false);
    setOpen(true);
  };

  const handleDelete = () => {
    if (Object.keys(rowSelection).length === 0) {
      // showAlertBanner: true;
      alert("Select a row to delete");
      return;
    }

    setMode("Delete");
    setModeResult(false);
    setOpen(true);
  };

  // if the Add/Edit/Delete modal closes then refetch the users
  useEffect(() => {
    // only refetch if AED is successful
    if (modeResult) {
      getRoles.refetch();
      // if delete is successful then reset the selected user
      if (mode === "Delete") {
        setRole(undefined);
        setRowSelection("");
        return;
      }
      // reset row selection to added or edited item
      setRowSelection({ [role?.id]: true });
    }
  }, [open, modeResult]);

  // Make sure selected record matches the latest rowSelected
  useEffect(() => {
    // Make sure user reflects latest data when row is selected
    if (Object.keys(rowSelection).length > 0) {
      setRole(
        getRoles?.data?.data.find((role) => {
          return role.id.toString() === Object.keys(rowSelection)[0];
        })
      );
      return;
    }
    setRole(undefined);
  }, [getRoles?.data?.data, rowSelection]);

  {
    return (
      <>
        <Stack direction="row">
          <Box
            sx={{
              height: "calc(100vh - 64px - 20px)",
              width: "calc(50% - 3px)",
              border: "solid",
              borderWidth: "2px",
              margin: "3px",
              padding: "3px",
              borderRadius: "10px",
            }}
          >
            <TableHeader
              ref={headerRef}
              query={getRoles}
              headerText={
                role?.id
                  ? "Selected role: " + role?.role + " - " + role?.role_desc
                  : "No role selected"
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
                rowSelection,
                isLoading: getRoles?.isLoading,
                showAlertBanner: false,
                showProgressBars: getRoles?.isFetching,
                showSkeletons: getRoles?.isLoading,
              }}
              data={getRoles?.data?.data || []}
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
              enableRowSelection
              enableStickyHeader
              // on function props
              onRowSelectionChange={handleSelect}
              // onPaginationChange={setPagination}
              // onSortingChange={setSorting}
              // setting props
              columnResizeMode="onChange"
              getRowId={(row) => row.id}
              positionGlobalFilter="right"
              // Remove 1 of n rows selected message
              positionToolbarAlertBanner="none"
              // mui props in order of hierarchy
              // muiTablePaperProps=
              // muiTopToolbarProps=
              muiTopToolbarProps={{ ref: toolbarRef }}
              muiTableContainerProps={{
                // height h(view port) -h(appbar) -h(marg,border,pad) -h(title)- h(table tools) )
                sx: {
                  height: `calc(100vh - 64px - 16px - ${headerSize.height}px  - ${toolbarSize.height}px)`,
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
                  <Tooltip title="Add User">
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

          <Stack
            sx={{
              width: "calc(50% - 17px)",
              margin: "1px",
              padding: "1px",
              borderRadius: "10px",
            }}
            direction="column"
          >
            <Box
              sx={{
                height: "calc( ( 100vh - 64px - 24px ) / 2)",
                border: "solid",
                borderWidth: "2px",
                margin: "1px",
                padding: "1px",
                borderRadius: "10px",
              }}
            >
              <RolePerms role={role} />
              {/*  */}
            </Box>
            <Box
              sx={{
                height: "calc( ( 100vh - 64px - 24px ) / 2)",
                border: "solid",
                borderWidth: "2px",
                margin: "1px",
                padding: "1px",
                borderRadius: "10px",
              }}
            >
              <UsersByRole role={role} />
            </Box>
          </Stack>
        </Stack>
        <Modal open={open}>
          <>
            <Paper
              ref={formRef}
              sx={{
                maxWidth: "75vw",
                height: "75vh",
                margin: "Auto",
                marginTop: "10vh",
              }}
            >
              <RoleAED
                mode={mode}
                role={role}
                setRole={setRole}
                setOpen={setOpen}
                setModeResult={setModeResult}
              />
            </Paper>
          </>
        </Modal>
      </>
    );
  }
}

export default Roles;
