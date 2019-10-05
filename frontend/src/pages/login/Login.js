import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  makeStyles,
  Container
} from "@material-ui/core";

import { toast } from "react-toastify";

import Copyright from "../../components/Copyright";
import Logo from "../../assets/logo.png";
import Api from "../../services/Api";
import cookies from "../../utils/cookies";
import authenticated from "../../utils/authenticated";

const Login = ({ history }) => {
  const [recordId, setRecordId] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  useEffect(() => {
    Api.get("isFirstAcess").then(response => {
      if (response.data.isFirstAcess) history.push("/firstAccess");
    });

    if (authenticated()) history.push("/dashboard");
  }, [history]);

  async function handleSubmit(e) {
    e.preventDefault();

    Api.post("/createSession", {
      recordId,
      password
    })
      .then(async response => {
        await cookies.set("authCookie", response.data.token, { path: "/" }); //Add httpOnly option.
        toast.success(response.data.messageUi_PtBr);
        history.push("/dashboard");
      })
      .catch(error => {
        if (error.response) {
          toast.error(error.response.data.messageUi_PtBr);
        } else if (error.request) {
          toast.error("O servidor não está respondendo.");
        } else {
          toast.error(error.message);
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src={Logo} alt="logo" />
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            name="recordId"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Prontuário"
            autoFocus
            value={recordId}
            onChange={e => setRecordId(e.target.value)}
          />
          <TextField
            name="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                className={classes.linkSenha}
                href="/lostPassword"
                variant="body2"
              >
                Esqueceu a senha?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#ffa949",
    "&:hover": {
      background: "#ff9949"
    }
  },
  linkSenha: {
    textDecorationLine: "none !important"
  }
}));
