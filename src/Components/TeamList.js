import React, {Fragment, useState} from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GroupIcon from '@material-ui/icons/Group';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
});

const ExpandIcon = ({expanded}) =>
    expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>;

export const TeamList = withStyles(styles)(({classes, ...props}) => {
    return (
        <List>
            {props.items.map(({Icon, ...item}, index) => (
                <Fragment key={index}>
                    {console.log(item)}
                    <ListItem button onClick={props.onClick(index,'TEAM')} key={index}>
                        <ListItemIcon>
                            <Icon/>
                        </ListItemIcon>
                        <ListItemText primary={item.name}/>
                        <ExpandIcon expanded={item.expanded}/>
                    </ListItem>
                    <Collapse in={item.expanded}>
                        {item.children.map((child, playerIndex) => (
                            <ListItem key={child.name} button dense onClick={props.onClick(playerIndex, 'PLAYER')}>
                                <ListItemIcon>
                                    <child.Icon/>
                                </ListItemIcon>
                                <ListItemText primary={child.name}/>
                            </ListItem>
                        ))}
                    </Collapse>
                </Fragment>
            ))}
        </List>
    );
});
