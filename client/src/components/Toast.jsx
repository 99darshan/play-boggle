import React from "react";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import PropTypes from "prop-types";

export default function Toast({ open, message, type, onClose }) {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          style={{
            backgroundColor: type === "success" ? "teal" : "orange"
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
