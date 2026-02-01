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
import { useUsersGet } from "../hooks/data/useUsersGet";

// custom components
import UserRoles from "./UserRoles";
import UserPerms from "./UserPerms";
import UserAED from "./UserAED";
// material react table imports
import {
  MaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
} from "material-react-table";

//
import { useMeasure } from "@uidotdev/usehooks";

// Main component
function Users() {
  // state
  const [user, setUser] = useState(undefined);
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [modeResult, setModeResult] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [sorting, setSorting] = useState([]);
  // while debugging turn off window focus
  const getUsers = useUsersGet({ refetchOnWindowFocus: false, retry: false });
  const [toolbarRef, toolbarSize] = useMeasure();

  // refs
  const tableInstanceRef = useRef(null);
  // const dateConvert =

  // table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "email",
        header: "email",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 110,
      },
      {
        accessorKey: "first",
        header: "First Name",
        size: 120,
      },
      {
        accessorKey: "last",
        header: "Last Name",
        size: 120,
      },
      {
        accessorKey: "updated_at",
        header: "Updated",
        size: 100,
        Cell: ({ cell }) => {
          const cellDate = new Date(cell.getValue());
          return <span>{cellDate.toLocaleDateString()}</span>;
        },
      },
    ],
    []
  );
  // event handlers
  const handleSelect = (row) => {
    setRowSelection(row());
    setUser(
      getUsers?.data?.data.find((user) => {
        return user.id.toString() === Object.keys(row())[0];
      })
    );
  };
  const handleAdd = () => {
    console.log("Adding", rowSelection);
    setMode("Add");
    setModeResult(false);
    setOpen(true);
  };
  const handleEdit = () => {
    console.log("Editing", rowSelection);
    if (Object.keys(rowSelection).length === 0) {
      showAlertBanner: true;
      alert("Select a row to edit");
      return;
    }

    setMode("Edit");
    setModeResult(false);
    setOpen(true);
  };

  const handleDelete = () => {
    console.log("Deleting", rowSelection);
    if (Object.keys(rowSelection).length === 0) {
      showAlertBanner: true;
      alert("Select a row to delete");
      return;
    }

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
      getUsers.refetch();
      // if delete is successful then reset the selected user
      if (mode === "Delete") {
        setUser(undefined);
        setRowSelection({});
        return;
      }
      // reset row selection to added or edited item
      setRowSelection({ [user?.id]: true });
    }
  }, [open, modeResult]);

  // Make sure selected record matches the latest rowSelected
  useEffect(() => {
    // Make sure user reflects latest data when row is selected
    if (Object.keys(rowSelection).length > 0) {
      setUser(
        getUsers?.data?.data.find((user) => {
          return user.id.toString() === Object.keys(rowSelection)[0];
        })
      );
      return;
    }
    setUser(undefined);
  }, [getUsers?.data?.data, rowSelection]);

  {
    return (
      <>
        <Stack direction="row">
          <Box
            sx={{
              height: "calc(100vh - 64px - 16px)",
              width: "calc(50% - 3px)",
              border: "solid",
              borderWidth: "2px",
              margin: "3px",
              padding: "3px",
              borderRadius: "10px",
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
                Selected user: {user?.first + " " + user?.last}
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
            <MaterialReactTable
              // Primary props
              initialState={{
                columnVisibility: { "mrt-row-select": false },
                density: "compact",
                showGlobalFilter: true,
              }}
              state={{
                rowSelection,
                isLoading: getUsers?.isLoading,
                showAlertBanner: getUsers?.isError,
                showProgressBars: getUsers?.isFetching,
                showSkeletons: getUsers?.isLoading,
                pagination,
                sorting,
              }}
              data={getUsers?.data?.data || []}
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
              enableRowSelection
              enableStickyHeader
              // on function props
              onRowSelectionChange={handleSelect}
              onPaginationChange={setPagination}
              onSortingChange={setSorting}
              // setting props
              columnResizeMode="onChange"
              getRowId={(row) => row.id}
              positionGlobalFilter="right"
              // Remove 1 of n rows selected message
              positionToolbarAlertBanner="none"
              // mui props in order of hierarchy
              // muiTablePaperProps=
              muiTopToolbarProps={{ ref: toolbarRef }}
              muiTableContainerProps={{
                // height h(view port) -h(appbar) -h(marg,border,pad) -h(title)- h(table tools) )
                sx: {
                  height: `calc(100vh - 64px - 16px - 1.75rem  - ${toolbarSize.height}px)`,
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
            sx={{ width: "calc(50% - 17px)", margin: "1px", padding: "1px" }}
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
              <UserRoles user={user} />
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
              <UserPerms user={user} />
            </Box>
          </Stack>
        </Stack>
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
              <UserAED
                mode={mode}
                user={user}
                setUser={setUser}
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

export default Users;
