import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardNew from './CardNew';
import './Card3grid.css'

const Card3Grid = React.memo(props => {
    const { activitats } = props;
    return (
        <Grid container justify="center" className="Card3GridContainer">
            {activitats && (activitats.map((data) => (
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
})

export default Card3Grid;