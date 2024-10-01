"use client";

import { FC, useEffect, useState } from "react";
import { default as MaterialSnackbar } from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

interface Props {
  message?: string;
  alertStatus: AlertColor;
  open: boolean;
}

export const Snackbar: FC<Props> = ({ message, open, alertStatus }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <MaterialSnackbar open={isOpen} autoHideDuration={3000}>
      <Alert
        onClose={handleClose}
        severity={alertStatus}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </MaterialSnackbar>
  );
};
