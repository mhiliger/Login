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
import { useRolesByPermGet } from "../hooks/data/useRolesByPermGet";

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
import { useQueryClient } from "@tanstack/react-query";

function RolesByPerm(props) {
  const { perm } = props;
  const getRolesByPerm = useRolesByPermGet(perm, {
    refetchOnWindowFocus: false,
  });

  // const queryClient = useQueryClient();
  // state
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

  {
    return (
      <>
        <TableHeader
          ref={headerRef}
          query={getRolesByPerm}
          headerText={
            perm?.id
              ? "Roles with permission: " + perm?.system + " " + perm?.perm_desc
              : "...please select a permission."
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
            isLoading: perm?.id ? getRolesByPerm?.isLoading : false,
            showAlertBanner: false,
            showProgressBars: perm?.id ? getRolesByPerm?.isFetching : false,
            showSkeletons: perm?.id ? getRolesByPerm?.isLoading : false,
          }}
          data={getRolesByPerm?.data?.data || []}
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

export default RolesByPerm;
