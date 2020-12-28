import React, {useEffect, useState} from 'react';
import {TeamList} from "../Components/TeamList";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Team} from "../Components/Team";
import GroupIcon from "@material-ui/icons/Group";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import axios from 'axios';

const styles = theme => ({
    root: {
        flexGrow: 1
    }
})

export const Teams = withStyles(styles)(({classes}) => {
    const [items, setItems] = useState([]);
    const [selectedItemProps, setSelectedItemProps] = useState({type: 'TEAM', teamIndex: 0, playerIndex: 0});

    useEffect(() => {
            async function fetchData() {
                const response = await axios.get('/teams/_design/team/_view/all_teams');
                let teams = response.data.rows
                    .map(it => it.value)
                    .filter(it => it.type === 'TEAM')
                    .reduce((playerMap, it) => {
                        let item = {
                            name: it.name,
                            Icon: GroupIcon,
                            description: it.description,
                            category: it.category || '',
                            expanded: false,
                            children: []
                        };
                        playerMap.set(it._id, item);
                        return playerMap;
                    }, new Map())

                teams = response.data.rows
                    .map(it => it.value)
                    .filter(it => it.type === 'PLAYER')
                    .reduce((teamsMap, it) => {
                        let player = {
                            name: `${it.firstName} ${it.lastName}`,
                            Icon: DirectionsRunIcon
                        }
                        teamsMap.get(it.team_reference).children.push(player);
                        return teamsMap;
                    }, teams);
                console.log(teams)
                console.log(Array.from(teams.values()));
                setItems(Array.from(teams.values()));
                return response;
            }

            fetchData();
        }, []
    );

    const onTeamClick = teamIndex => () => {
        const item = items[teamIndex];
        const newItems = [...items];
        newItems[teamIndex] = {...item, expanded: !item.expanded}
        setItems(newItems);
        const selectedItemProps = {...selectedItemProps, type: 'TEAM', teamIndex: teamIndex};
        setSelectedItemProps(selectedItemProps);
    }

    const onPlayerClick = (teamIndex, playerIndex) => () => {
        const selectedItemProps = {...selectedItemProps, type: 'PLAYER', teamIndex: teamIndex, playerIndex: playerIndex};
        setSelectedItemProps(selectedItemProps);
    }

    const selectedItem = (
       <Team selectedItem={items[selectedItemProps.teamIndex]} />
    );

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid key={'left'} item xs={12} sm={4} md={3}>
                    <TeamList items={items} onClick={onTeamClick}/>
                </Grid>
                <Grid key={'right'} item xs={12} sm={8} md={9}>
                    {selectedItem}
                    {/*<Team selectedItem={items[selectedItemIndex]}/>*/}
                </Grid>
            </Grid>
        </div>
    );
})
