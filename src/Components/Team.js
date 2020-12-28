import React, {useState, useEffect} from 'react';
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
    container: {
        margin: theme.spacing(2)
    }
});

export const Team = withStyles(styles)(({classes, ...props}) => {

    const { selectedItem } = props;

    const [inputs, setInputs] = useState([
        {id: 'name', label: 'Team name', value: ''},
        {id: 'category', label: 'Category', value: ''},
        {id: 'description', label: 'Description', value: ''}
    ]);
    useEffect(() => {
        console.log('useEffect in Team');
        if (selectedItem) {
            let inputsFromProps = [...inputs];
            inputsFromProps[0] = { ...inputsFromProps[0], value: selectedItem.name }
            inputsFromProps[1] = { ...inputsFromProps[1], value: selectedItem.category }
            inputsFromProps[2] = { ...inputsFromProps[2], value: selectedItem.description }
            setInputs(inputsFromProps);
        }
    },[selectedItem]);

    const onChange = ({target: {id, value}}) => {
        const newInputs = [...inputs];
        const index = inputs.findIndex(input => input.id === id);

        newInputs[index] = {...inputs[index], value};
        setInputs(newInputs);
    }

    const clearAllFields = () => {
        let newInputs = [...inputs];
        newInputs.map(it => {
           it.value = '';
           return it;
        });
        setInputs(newInputs);
    }

    return (
        <Grid container spacing={4} className={classes.container} justify={"flex-start"} direction={"column"}>
            {inputs.map(input => (
                <Grid key={input.id} item>
                    <TextField
                        id={input.id}
                        label={input.label}
                        value={input.value}
                        onChange={onChange}
                    />
                </Grid>
            ))}
            <Grid container spacing={2} className={classes.container} justify={"flex-start"}>
                <Grid key={'opslaan'} item>
                    <Button variant={"outlined"} color={"primary"} disabled={true}>
                        Opslaan
                    </Button>
                </Grid>
                <Grid key={'wissen'} item>
                    <Button variant={"outlined"} color={"secondary"} onClick={clearAllFields}>
                        Wissen
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
})
