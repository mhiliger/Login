// react imports
import { useEffect, useMemo, useState, useRef } from "react";
// mui imports
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
// custom hooks
import { useUsersByPermGet } from "../hooks/data/useUsersByPermGet";
// custom components
import TableHeader from "./TableHeader";
// material react table imports
import {
  MaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
} from "material-react-table";
// react query imports
import { useMeasure } from "@uidotdev/usehooks";

function UsersByPerm(props) {
  console.log("RUNNING USERSBYPERM");
  const { perm } = props;
  const getUsersByPerm = useUsersByPermGet(perm, {
    refetchOnWindowFocus: false,
  });
  // state
  // refs
  const tableInstanceRef = useRef(null);
  const [toolbarRef, toolbarSize] = useMeasure();
  const [headerRef, headerSize] = useMeasure();
  // table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "email", //normal accessorKey
        header: "email",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 110,
      },
      {
        accessorKey: "first", //access nested data with dot notation
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
      },
    ],
    []
  );

  {
    return (
      <>
        <TableHeader
          ref={headerRef}
          query={getUsersByPerm}
          headerText={
            perm?.id
              ? "Users with permission: " + perm?.system + " " + perm?.perm_desc
              : "...please select a permission."
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
            isLoading: perm?.id ? getUsersByPerm?.isLoading : false,
            showAlertBanner: false,
            showProgressBars: perm?.id ? getUsersByPerm?.isFetching : false,
            showSkeletons: perm?.id ? getUsersByPerm?.isLoading : false,
          }}
          data={getUsersByPerm?.data?.data || []}
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
          positionToolbarAlertBanner="none"
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
              {/* built-in buttons (must pass in table prop for them to work!) */}
              {/* <MRT_GlobalFilterTextField table={table} /> */}
              <MRT_ShowHideColumnsButton table={table} />
              <MRT_ToggleDensePaddingButton table={table} />
              <MRT_ToggleFiltersButton table={table} />
            </>
          )}
        />
      </>
    );
  }
}

export default UsersByPerm;
