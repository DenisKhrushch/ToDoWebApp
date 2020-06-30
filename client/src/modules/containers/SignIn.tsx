import React, { useState, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginUser } from '../../user/actions';
import { PASSWORD_IS_VALID, INPUT_RULE } from '../../constants/constants';
import { Preloader } from '../components/Preloader';
import { CustomAlert } from '../components/CustomAlert';
import { LoginingUser } from '../../interfaces/user';
import { RootState } from '../../interfaces/rootState';

const CustomLink = styled(Link)`
  color: #1976d2;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface SignInProps {
  onLoginUser: (user: LoginingUser) => void;
  authenticated: boolean;
  loading: boolean;
  loginResponseMessage: string;
}

const SignIn = ({
  onLoginUser,
  authenticated,
  loading,
  loginResponseMessage,
}: SignInProps) => {
  const classes = useStyles();
  const loginingUser: LoginingUser = { username: '', password: '' };
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const close = () => {
    setOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    INPUT_RULE.test(username)
      ? (loginingUser.username = username)
      : setUsernameError(true);
    PASSWORD_IS_VALID.test(password)
      ? (loginingUser.password = password)
      : setPasswordError(true);
    if (loginingUser.username && loginingUser.password) {
      onLoginUser(loginingUser);
      setOpen(true);
    }
  };

  return authenticated ? (
    <Redirect to="/" />
  ) : (
    <Container component="main" maxWidth="xs">
      {loginResponseMessage ? (
        <CustomAlert
          open={open}
          close={close}
          message={loginResponseMessage}
          severity={'error'}
        />
      ) : null}
      <Preloader open={loading} />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="text"
            autoComplete="text"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError}
            helperText={usernameError && 'Incorrect Username.'}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError && 'Incorrect Password.'}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="center">
            <Grid item>
              <CustomLink to="/register" replace>
                Don't have an account? Sign Up
              </CustomLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    authenticated: !!state.userReducer.accessToken,
    loading: state.userReducer.loading,
    loginResponseMessage: state.userReducer.loginResponseMessage,
  };
};

const mapDispatchToProps = { onLoginUser: loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
