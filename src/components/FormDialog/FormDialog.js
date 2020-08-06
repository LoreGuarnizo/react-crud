import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const FormDialog = ({ id, open, setOpen, onClick, variantKeyword }) => {
  const [form, setForm] = useState();
  const [validForm, setValidForm] = useState(false);

  const handleChange = (name) => (event) => {
    setForm({ ...form, ...{ [name]: event.target.value } });
  };

  const validateForm = () => {
    if (form?.title && form?.body) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [form]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{`${variantKeyword} Photo`}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`${variantKeyword} a new photo`}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={handleChange("title")}
          />
          <TextField
            margin="dense"
            id="body"
            label="Body"
            type="text"
            fullWidth
            onChange={handleChange("body")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              onClick(variantKeyword, { ...form, id });
              setForm({});
            }}
            disabled={!validForm}
            color="primary"
          >
            {variantKeyword}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
