import React from 'react';
import {TeamList} from "../Components/TeamList";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Team} from "../Components/Team";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
})

export const Teams = withStyles(styles)(({classes}) => {
    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={4} md={3}>
                    <TeamList/>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                    <Team/>
                </Grid>
            </Grid>
        </div>
    );
})
