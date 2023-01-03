import React, {memo} from "react";
import ReactDOM from "react-dom/client";
import {ToastContainer} from "react-toastify";
import axios from "axios";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {QueryClient, QueryClientProvider} from "react-query";
import App from "./App";
import CONFIG from "constants/config";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global.sass";

type RootProps = unknown;

// react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  },
});

// axios
axios.defaults.baseURL = CONFIG.API_BASE_URL;

//theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Root: React.FC<RootProps> = memo(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
