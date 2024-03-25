import { useState } from "react";

const useDialog = () => {
  const [dialogIsOpen, setDialog] = useState(false);
  const [textDialog, setTextDialog] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [handleClick, setHandleClick] = useState(null);

  const closeDialog = () => {
    setDialog(false);
  };

  const showDialog = (text) => {
    setTextDialog(text);
    setDialog(true);
  };

  return {
    dialogIsOpen,
    textDialog,
    confirm,
    handleClick,
    closeDialog,
    showDialog,
    setConfirm,
    setHandleClick
  };
};

export default useDialog;