import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@material-ui/core";

export default function Modal(props) {
  const { children, openModal, setOpenModal } = props;

  return (
    <Dialog open={openModal}>
      <DialogContent>{children}</DialogContent>
      <Button
        variant="contatined"
        color="secondary"
        onClick={() => {
          setOpenModal(false);
        }}
      >
        Close
      </Button>
    </Dialog>
  );
}
