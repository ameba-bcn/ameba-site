import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardNew from './CardNew';
import './Card3grid.css'
// import Data from '../main/response3Cards.json'

function Card3Grid(props) {
    console.log("props.activitats", props.activitats)
    const activitatsToDisplay = props.activitats || undefined;
    return (
        <Grid container justify="center" className="Card3GridContainer">
            {activitatsToDisplay && (activitatsToDisplay.map((data) => (
                <Grid key={data.name} item className="Card3GridItem">
                    <Paper className="Card3GridPaper">
                        <CardNew
                            className="CardIndividual"
                            imatge={data.images[0]}
                            titol={data.name}
                            data={data.datetime}
                            tipo={"TALLER"}
                        />
                    </Paper>
                </Grid>
            )))}
        </Grid>
    );
}

export default React.memo(Card3Grid);