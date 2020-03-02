import React from "react";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import PropTypes from "prop-types";

export default function Toast({ open, message, type, onClose }) {
  const toastBgColors = {
    error: "#ef5350",
    success: "#009688",
    info: "#757575"
  };
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={1800}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          style={{
            fontFamily: "Merienda One",
            backgroundColor:
              type === "success" ? toastBgColors.success : toastBgColors.error
          }}
          message={<span>{message}</span>}
        />
      </Snackbar>
    </>
  );
}

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.PropTypes.oneOf(["success", "error", "info"]).isRequired,
  onClose: PropTypes.func.isRequired
};
