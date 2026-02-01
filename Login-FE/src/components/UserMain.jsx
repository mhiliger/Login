import { useState } from "react";

import { Stack, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Users from "./Users";
import UserRoles from "./UserRoles old";
import UserPerms from "./UserPerms";

const UserMain = () => {
  debugger;
  const [user, setUser] = useState(undefined);

  return (
    <>
      <Stack direction="row">
        <Box width="calc(50% - 3px)">
          {/* <Typography variant="detail">{user}</Typography> */}
          <Users user={user} setUser={setUser} />
        </Box>

        <Stack sx={{ margin: "1px", padding: "1px" }} direction="column">
          <Box
            sx={{
              height: "calc( ( 100vh - 64px - 24px ) / 2)",
              border: "solid",
              borderWidth: "2px",
              margin: "1px",
              padding: "1px",
            }}
          >
            <UserRoles user={user} />
          </Box>
          {/* <Box
            sx={{
              height: "calc( ( 100vh - 64px - 24px ) / 2)",
              border: "solid",
              borderWidth: "2px",
              margin: "1px",
              padding: "1px",
            }}
          >
            <UserPerms user={user} />
          </Box> */}
        </Stack>
      </Stack>
    </>
  );
};

export default UserMain;
