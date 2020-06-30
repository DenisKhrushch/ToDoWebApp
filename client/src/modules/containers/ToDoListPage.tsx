import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ClearIcon from '@material-ui/icons/Clear';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { Header } from '../components/Header';
import { logout } from '../../user/actions';
import { Main } from '../components/Main';
import { INPUT_RULE } from '../../constants/constants';
import { Preloader } from '../components/Preloader';
import { CustomAlert } from '../components/CustomAlert';
import { Item } from '../../interfaces/Item';
import {
  loadList,
  addItem,
  checkItem,
  deleteItem,
  clearCompleted,
  editItem,
  showAll,
  showActive,
  showCompleted,
} from '../../list/actions';
import { RootState } from '../../interfaces/rootState';

const Wrapper = styled.div`
  background: #fff;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icon: {
    color: 'blue',
  },
  completed: {
    color: '#4caf50',
  },
  clear: {
    color: 'rgb(220, 0, 78)',
  },
  exit: {
    color: '#d32f2f',
  },
}));

interface ToDoListPageProps {
  token: string;
  itemsList: Item[];
  itemsListToShow: Item[];
  onLoadList: () => Object;
  onAddItem: (value: string) => Object;
  onCheck: (id: number) => Object;
  onDeleteItem: (id: number) => Object;
  onClearCompleted: () => Object;
  onEditItem: (id: number, value: string) => Object;
  onShowAll: () => Object;
  onShowActive: () => Object;
  onShowCompleted: () => Object;
  onLogout: () => Object;
  onLoading: boolean;
}

const ToDoListPage = ({
  token,
  itemsList,
  itemsListToShow,
  onLoadList,
  onAddItem,
  onCheck,
  onDeleteItem,
  onClearCompleted,
  onEditItem,
  onShowAll,
  onShowActive,
  onShowCompleted,
  onLogout,
  onLoading,
}: ToDoListPageProps) => {
  useEffect(() => {
    onLoadList();
  }, []);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const handleDrawerOpen = (): void => {
    setOpen(true);
  };
  const handleDrawerClose = (): void => {
    setOpen(false);
  };
  const close = (): void => {
    setOpenAlert(false);
  };
  const add = (value: string): void => {
    if (INPUT_RULE.test(value)) {
      onAddItem(value);
    } else {
      setOpenAlert(true);
      setMessage('INVALID INPUT');
    }
  };
  const del = (id: number): void => {
    onDeleteItem(id);
  };
  const isChecked = (id: number): void => {
    onCheck(id);
  };
  const addEditedItem = (id: number, value: string): void => {
    if (INPUT_RULE.test(value)) {
      onEditItem(id, value);
    } else {
      setOpenAlert(true);
      setMessage('INVALID INPUT');
    }
  };

  return token ? (
    <>
      <Preloader open={onLoading} />
      <CustomAlert
        open={openAlert}
        close={close}
        message={message}
        severity={'error'}
      />
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Menu
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          {itemsList.length ? (
            <List>
              <Tooltip
                placement="right"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Show All"
              >
                <ListItem button onClick={onShowAll} key={'showAll'}>
                  <ListItemIcon className={classes.icon}>
                    <EventNoteIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Show All'} />
                </ListItem>
              </Tooltip>
              <Tooltip
                placement="right"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Show Active"
              >
                <ListItem button key={'showActive'} onClick={onShowActive}>
                  <ListItemIcon className={classes.completed}>
                    <Badge
                      badgeContent={
                        itemsList.filter((item) => item.active).length
                      }
                      color="secondary"
                    >
                      <CheckBoxOutlineBlankIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary={'Show Active'} />
                </ListItem>
              </Tooltip>
              <Tooltip
                placement="right"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Show Completed"
              >
                <ListItem
                  button
                  key={'showCompleted'}
                  onClick={onShowCompleted}
                >
                  <ListItemIcon className={classes.completed}>
                    <CheckBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Show Completed'} />
                </ListItem>
              </Tooltip>
              <Tooltip
                placement="right"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Clear Completed"
              >
                <ListItem
                  button
                  key={'clearCompleted'}
                  onClick={onClearCompleted}
                >
                  <ListItemIcon className={classes.clear}>
                    <ClearIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Clear Completed'} />
                </ListItem>
              </Tooltip>
            </List>
          ) : null}
          <Divider />
          <List>
            <Tooltip
              placement="right"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Exit"
            >
              <ListItem button key={'logout'} onClick={onLogout}>
                <ListItemIcon className={classes.exit}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={'Exit'} />
              </ListItem>
            </Tooltip>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Header />
          <Container maxWidth="sm">
            <Wrapper>
              <Main
                itemsList={itemsListToShow}
                addItem={add}
                isChecked={isChecked}
                deleteItem={del}
                addEditedItem={addEditedItem}
              />
            </Wrapper>
          </Container>
        </main>
      </div>
    </>
  ) : (
    <Redirect to="/login" />
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    itemsListToShow: state.listReducer.itemsListToShow,
    itemsList: state.listReducer.itemsList,
    token: state.userReducer.accessToken,
    onLoading: state.listReducer.loading,
  };
};

const mapDispatchToProps = {
  onLoadList: loadList,
  onAddItem: addItem,
  onDeleteItem: deleteItem,
  onCheck: checkItem,
  onClearCompleted: clearCompleted,
  onEditItem: editItem,
  onShowAll: showAll,
  onShowActive: showActive,
  onShowCompleted: showCompleted,
  onLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoListPage);
