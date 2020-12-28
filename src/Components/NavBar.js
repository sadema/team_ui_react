import React, {Component, Fragment} from 'react';
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {IconButton} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Teams} from "../Pages/Teams";
import {Players} from "../Pages/Players";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    toolbarMargin: theme.mixins.toolbar
});

const TeamsToolbar = withStyles(styles)(
    class extends Component {
        static defaultProps = {
            MenuItems: () => (
                <Fragment>
                    <MenuItem component={Link} to="/teams">
                        Teams
                    </MenuItem>
                    <MenuItem component={Link} to="/players">
                        Players
                    </MenuItem>
                </Fragment>
            )
        };

        state = {anchor: null};

        closeMenu = () => this.setState({anchor: null});

        render() {
            const {classes, title, MenuItems} = this.props;

            return (
                <Fragment>
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="Menu"
                                onClick={e =>
                                    this.setState({anchor: e.currentTarget})
                                }
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                anchorEl={this.state.anchor}
                                open={Boolean(this.state.anchor)}
                                onClose={this.closeMenu}>
                                <MenuItems/>
                            </Menu>
                            <Typography
                                variant="h5"
                                color="inherit"
                                className={classes.flex}
                            >
                                {title}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.toolbarMargin}/>
                </Fragment>
            );
        }
    }
);

export const NavBar = withStyles(styles)(({classes}) => (
    <Router>
        <div className={classes.root}>
            <Route
                exact
                path="/"
                render={() => (
                    <Redirect to="/teams"/>
                )}
            />
            <Route
                path="/teams"
                render={() => (
                    <Fragment>
                        <TeamsToolbar title="Managing Teams"/>
                        <Teams/>
                    </Fragment>
                )}
            />
            <Route
                path="/players"
                render={() => (
                    <Fragment>
                        <TeamsToolbar title="Managing Players"/>
                        <Players/>
                    </Fragment>
                )}
            />
        </div>
    </Router>
));
