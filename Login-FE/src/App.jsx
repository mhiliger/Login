import AppRoutes from "./components/AppRoutes";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { AuthProvider } from "./context/AuthProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const loginTheme = createTheme({
    buttonWidth: { small: 150, medium: 200, large: 300 },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Set the 'withCredentials' option to 'true' to include cookies with requests
        withCredentials: true,
      },
    },
  });

  return (
    <AuthProvider initialConfig={{
      passwordPolicy: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
        message: "8 - 24 characters, must include uppercase and lowercase letters, a number and a special character"
      }
    }}>
      <ThemeProvider theme={loginTheme}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
