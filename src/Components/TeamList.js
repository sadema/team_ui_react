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

export const TeamList = withStyles(styles)(({classes}) => {
    const [items, setItems] = useState([
        {
            name: 'JO12-1',
            Icon: GroupIcon,
            description: 'Selectie team',
            expanded: false,
            children: [
                {name: 'Roxann Jagtenberg', Icon: DirectionsRunIcon},
                {name: 'Jimmie Sundert', Icon: DirectionsRunIcon}
            ]
        }, {
            name: 'JO15-2',
            Icon: GroupIcon,
            expanded: false,
            children: [
                {name: 'Henry Hakkens', Icon: DirectionsRunIcon},
                {name: 'Oka Eerden', Icon: DirectionsRunIcon}
            ]
        }
    ]);

    const onClick = index => () => {
        const item = items[index];
        const newItems = [...items];
        newItems[index] = {...item, expanded: !item.expanded}
        setItems(newItems);
    }

    return (
        <List>
            {items.map(({Icon, ...item}, index) => (
                <Fragment key={index}>
                    <ListItem button onClick={onClick(index)}>
                        <ListItemIcon>
                            <Icon/>
                        </ListItemIcon>
                        <ListItemText primary={item.name}/>
                        <ExpandIcon expanded={item.expanded}/>
                    </ListItem>
                    <Collapse in={item.expanded}>
                        {item.children.map(child => (
                            <ListItem key={child.name} button dense>
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
