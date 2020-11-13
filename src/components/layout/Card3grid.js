import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardNew from './CardNew';
import './Card3grid.css'
import Data from '../main/response3Cards.json'

export default function Card3Grid() {
    return (
        <Grid container justify="center" className="Card3GridContainer">
            {Data.map((data) => (
                <Grid key={data.title} item className="Card3GridItem">
                    <Paper className="Card3GridPaper">
                        <CardNew
                            className="CardIndividual"
                            imatge={data.img}
                            titol={data.title}
                            text={data.article}
                            data={data.date}
                            tipo={data.sort}
                        />
                    </Paper>
                </Grid>
            ))}

        </Grid>
    );
}