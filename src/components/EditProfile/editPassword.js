import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Input,
  InputLabel,
  OutlinedInput,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));

export const PassChange = () => {
  const classes = useStyles();
  const [pass, setPass] = useState("");
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const user = firebase.auth().currentUser;

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handlePass = (event, error) => {
    user
      .updatePassword(pass)
      .then(function () {
        alert("Password successfully changed!");
      })
      .catch(function (error) {});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form noValidate onSubmit={handlePass}>
        <FormControl
          className={(classes.margin, classes.textField)}
          fullWidth
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Enter New Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={pass.password}
            fullWidth
            onChange={(event) => setPass(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button type="submit" fullWidth variant="outlined" color="secondary">
            CHANGE CURRENT PASSWORD
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
