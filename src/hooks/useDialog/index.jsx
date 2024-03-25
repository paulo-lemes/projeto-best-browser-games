import { useState } from "react";

const useDialog = () => {
  const [dialogIsOpen, setDialog] = useState(false);
  const [afterCloseDialog, setAfterCloseDialog] = useState(null);
  const [textDialog, setTextDialog] = useState("");

  const closeDialog = () => {
    setDialog(false);
    afterCloseDialog()
  };

  const showDialog = (text) => {
    setTextDialog(text);
    setDialog(true);
  };

  return {
    dialogIsOpen,
    textDialog,
    closeDialog,
    showDialog,
    setAfterCloseDialog,
  };
};

export default useDialog;