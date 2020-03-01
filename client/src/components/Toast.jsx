import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";

export default function Toast({ open, message, type, onClose }) {
  return (
    <>
      <Snackbar
        open={open}
        message={message}
        autoHideDuration={1000}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </>
  );
}

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.PropTypes.oneOf(["success", "error", "info"]).isRequired,
  onClose: PropTypes.func.isRequired
};
