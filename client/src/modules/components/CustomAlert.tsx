import React from 'react';
import Alert, { Color } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

interface CustomAlertProps {
  open: boolean;
  close: () => void;
  message: string;
  severity: Color;
}

export const CustomAlert = ({
  open,
  close,
  message,
  severity,
}: CustomAlertProps) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={close}>
      <Alert onClose={close} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
