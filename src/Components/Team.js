import React, {useState} from 'react';
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary
    },
    container: {margin: theme.spacing.unit * 2}
});

export const Team = withStyles(styles)(({classes}) => {

    const [inputs, setInputs] = useState([
        {id: 'name', label: 'Team name', value: ''},
        {id: 'category', label: 'Category', value: ''},
        {id: 'description', label: 'Description', value: ''}
    ]);

    const onChange = ({target: {id, value}}) => {
        const newInputs = [...inputs];
        const index = inputs.findIndex(input => input.id === id);

        newInputs[index] = {...inputs[index], value};
        setInputs(newInputs);
    }
    return (
        <Paper className={classes.paper}>
            {/*<h2>Team</h2>*/}
            <Grid container spacing={4} className={classes.container} justify={"left"} direction={"column"}>
                {inputs.map(input => (
                    <Grid item>
                        <TextField
                            id={input.id}
                            label={input.label}
                            value={input.value}
                            onChange={onChange}
                        />
                    </Grid>
                ))}
                <Grid container spacing={2} className={classes.container} justify={"left"}>
                    <Grid item>
                        <Button variant={"outlined"} color={"primary"} disabled={"true"}>
                            Opslaan
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant={"outlined"} color={"secondary"}>
                            Wissen
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
})
