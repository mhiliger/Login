import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useRef, useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useClickAway } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

function TopNavBar() {
  const { auth, setAuth } = useAuth();
  const appBarRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  // const [navTo, setNavTo] = useState(undefined);
  const navigate = useNavigate();

  const handleClick = (event) => {
    if (auth.email && anchorEl === null) {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  // useEffect(() => {
  //   if (navTo !== undefined) {
  //     navigate(navTo);
  //     setNavTo(undefined);
  //   }
  // }, [navTo]);

  const handleMenu = (route) => {
    navigate(route, { replace: true });
    setAnchorEl(null);
    setOpen(false);
  };

  const menuRef = useClickAway(handleClose);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar ref={appBarRef} sx={{ width: "100%" }} position="sticky">
        <Toolbar>
          <>
            <IconButton
              // ref={menuRef}
              onClick={handleClick}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              variant="menu"
              open={open}
              anchorEl={anchorEl}
              MenuListProps={{ ref: menuRef }}
            >
              <MenuItem onClick={() => handleMenu("/loginadmin/users")}>
                Manage Users
              </MenuItem>
              <MenuItem onClick={() => handleMenu("/loginadmin/roles")}>
                Manage Roles
              </MenuItem>
              <MenuItem onClick={() => handleMenu("/loginadmin/perms")}>
                Manage Permissions
              </MenuItem>
            </Menu>
          </>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Login Management System
          </Typography>

          {auth.email && (
            <>
              <Tooltip title="Logout">
                <IconButton
                  // ref={menuRef}
                  onClick={() => setAuth("")}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <AccountCircleOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Button color="inherit">
                <Typography variant="h6" component="div">
                  {auth.email}
                </Typography>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Outlet sx={{ height: appBarRef }} />
    </Box>
  );
}

export default TopNavBar;
