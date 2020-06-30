import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { registerUser } from '../../user/actions';
import { INPUT_RULE, PASSWORD_IS_VALID } from '../../constants/constants';
import { CustomAlert } from '../components/CustomAlert';
import { RegisteringUser } from '../../interfaces/user';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

interface SignUpProps {
  onRegisterUser: (user: RegisteringUser) => void;
  registerResponseMessage: string;
  authenticated: boolean;
}

const SignUp = ({
  onRegisterUser,
  registerResponseMessage,
  authenticated,
}: SignUpProps) => {
  const classes = useStyles();
  const user: RegisteringUser = {
    name: '',
    surname: '',
    username: '',
    password: '',
  };
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (INPUT_RULE.test(name)) {
      user.name = name;
      setNameError(false);
    } else {
      setNameError(true);
    }
    if (INPUT_RULE.test(surname)) {
      user.surname = surname;
      setSurnameError(false);
    } else {
      setSurnameError(true);
    }
    if (INPUT_RULE.test(username)) {
      user.username = username;
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }
    if (PASSWORD_IS_VALID.test(password)) {
      user.password = password;
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
    if (user.name && user.surname && user.username && user.password) {
      onRegisterUser(user);
      setOpen(true);
    }
  };

  return authenticated ? (
    <Redirect to="/" />
  ) : (
    <Container component="main" maxWidth="xs">
      {registerResponseMessage ? (
        <CustomAlert
          open={open}
          close={close}
          message={registerResponseMessage}
          severity={'error'}
        />
      ) : null}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                label="First Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameError && 'Incorrect entry.'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setSurname(e.target.value)}
                error={surnameError}
                helperText={surnameError && 'Incorrect entry.'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                error={usernameError}
                helperText={usernameError && 'Incorrect entry.'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                helperText={passwordError && 'Incorrect entry.'}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <CustomLink to="/login" replace>
                Already have an account? Sign in
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
    registerResponseMessage: state.userReducer.registerResponseMessage,
    authenticated: !!state.userReducer.accessToken,
  };
};

const mapDispatchToProps = {
  onRegisterUser: registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
