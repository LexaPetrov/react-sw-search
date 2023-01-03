import {CircularProgress, Box} from "@mui/material";
import React, {memo} from "react";

type LoaderProps = unknown;

export const Loader: React.FC<LoaderProps> = memo(() => {
  return (
    <Box
      sx={{
        width: "100%",
        margin: "10px auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
});
