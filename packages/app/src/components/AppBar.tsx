import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RLogo } from "request-ui";

import {
  AppBar,
  Box,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  IconButton,
  SwipeableDrawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import { Skeleton } from "@material-ui/lab";

import ConnectButton from "./ConnectButton";
import UserInfo from "./UserInfo";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 80,
    padding: "0 24px",
    backgroundColor: "#fff",
    boxShadow: "none",
    [theme.breakpoints.up("sm")]: {
      boxShadow: "0px 4px 5px rgba(211, 214, 219, 0.5)",
    },
  },
  toolbar: {
    margin: 0,
    padding: 0,
    height: "100%",
    justifyContent: "space-between",
    display: "flex",
  },
  link: {
    display: "flex",
    alignItems: "center",
    marginLeft: 40,
    textDecoration: "none",
    color: theme.palette.common.black,
  },
  mobileLink: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
    textDecoration: "none",
    color: theme.palette.common.black,
  },
  active: {
    borderBottom: "2px solid #00CC8E",
    marginTop: 2,
  },
  item: {
    display: "inline-flex",
    alignItems: "center",
  },
  connect: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "inline-flex",
    },
  },
  mobileMenu: {
    color: "#050B20",
    display: "inline-flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  desktopMenu: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  drawer: {
    width: "70%",
    maxWidth: 272,
    padding: "80px 20px",
    display: "flex",
    alignItems: "start",
  },
  closeIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    color: "#050B20",
  },
}));

export const RequestAppBar = ({
  account,
  network,
  connect,
  loading,
}: {
  account?: string | null;
  network?: number;
  connect: () => Promise<void>;
  loading: boolean;
}) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname, account]);

  const Links = ({ className }: { className: string }) => (
    <>
      <NavLink
        activeClassName={classes.active}
        className={className}
        to="/dashboard"
      >
        <Typography variant="h4">My dashboard</Typography>
      </NavLink>
      <NavLink
        activeClassName={classes.active}
        className={className}
        to="/create"
      >
        <Typography variant="h4">Create a request</Typography>
      </NavLink>
    </>
  );

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center" flex={1} height="100%">
          <Box marginRight={"20px"}>
            <NavLink to="/">
              <RLogo />
            </NavLink>
          </Box>
          <Box
            display="flex"
            alignContent="flex-start"
            flex={1}
            height="100%"
            className={classes.desktopMenu}
          >
            <Links className={classes.link} />
          </Box>
          <Box className={classes.connect}>
            {loading ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={320}
                height={60}
                borderRadius={4}
                boxSizing="border-box"
                border="1px solid #E4E4E4"
              >
                <Skeleton variant="circle" width={20} height={20} />
                <Box width={8} />
                <Skeleton variant="text" width={250} height={32} />
              </Box>
            ) : account ? (
              <UserInfo name={account} network={network} />
            ) : (
              <ConnectButton connect={connect} />
            )}
          </Box>
          <Box flex={1} className={classes.mobileMenu} />
          <Box className={classes.mobileMenu}>
            <IconButton
              style={{ color: "#050B20" }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
        classes={{
          paper: classes.drawer,
        }}
      >
        <IconButton
          className={classes.closeIcon}
          onClick={() => setDrawerOpen(false)}
        >
          <CloseIcon />
        </IconButton>
        <Links className={classes.mobileLink} />
        <Box flex={1} />
        {account ? (
          <UserInfo name={account} network={network} />
        ) : (
          <ConnectButton connect={connect} />
        )}
      </SwipeableDrawer>
    </AppBar>
  );
};
