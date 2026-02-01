// react imports
import { useEffect, useMemo, useState, useRef } from "react";
// mui imports
import Typography from "@mui/material/Typography";
import { Box, Alert } from "@mui/material";

// custom hooks
import { useUserPermsGet } from "../hooks/data/useUserPermsGet";
// custom components
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

function UserPerms(props) {
  const { user } = props;

  const getUserPerms = useUserPermsGet(user, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  // refs
  const tableInstanceRef = useRef(null);
  const [toolbarRef, toolbarSize] = useMeasure();
  const [headerRef, headerSize] = useMeasure();

  // table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "system",
        header: "System",
        size: 100,
      },
      {
        accessorKey: "permid",
        header: "Perm Id",
        size: 80,
      },

      {
        accessorKey: "perm_desc", //normal accessorKey
        header: "Permission",
        size: 200,
      },
      {
        accessorKey: "role", //normal accessorKey
        header: "Role",
      },
    ],
    []
  );

  const columnOrder = ["system", "permid", "perm_desc", "role"];

  {
    return (
      <>
        <TableHeader
          ref={headerRef}
          query={getUserPerms}
          headerText={
            user?.email
              ? "Permissions assigned to user: " +
                user?.first +
                " " +
                user?.last
              : "...please select a user."
          }
        />
        <MaterialReactTable
          // Primary props
          initialState={{
            columnVisibility: { "mrt-row-select": false },
            density: "compact",
            showGlobalFilter: true,
            columnOrder: columnOrder,
          }}
          state={{
            isLoading: user?.email ? getUserPerms?.isLoading : false,
            showAlertBanner: false,
            showProgressBars: user?.email ? getUserPerms?.isFetching : false,
            showSkeletons: user?.email ? getUserPerms?.isLoading : false,
          }}
          data={getUserPerms?.data?.data || []}
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
              }px - 4px)`,
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

export default UserPerms;
