import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardNew from './CardNew';
import Card1 from './../../images/amebabegun.png';
import Card2 from './../../images/ameba-joseanto.png';
import Card3 from './../../images/ameba-pablo.png';
import './Card3grid.css'

export default function Card3Grid() {

    return (
        <Grid container justify="center" className="Card3GridContainer">

            <Grid key={0} item>
                <Paper className="Card3GridPaper">
                    <CardNew 
                    imatge= {Card1} 
                    titol="Taller amb BeGun"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor eros lacus, sit amet consequat massa mollis ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor eros lacus, sit amet consequat massa mollis ut."
                    />
                </Paper>
            </Grid>
            <Grid key={1} item>
                <Paper className="Card3GridPaper" >
                    <CardNew imatge= {Card2}
                    titol="Taller teoria musical"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor eros lacus, sit amet consequat massa mollis ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor eros lacus, sit amet consequat massa mollis ut."
                    />
                </Paper>
            </Grid>
            <Grid key={2} item>
                <Paper className="Card3GridPaper" >
                    <CardNew imatge= {Card3}
                    titol="Taller live en grup"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor eros lacus, sit amet consequat massa mollis ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor eros lacus, sit amet consequat massa mollis ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor eros lacus, sit amet consequat massa mollis ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor eros lacus, sit amet consequat massa mollis ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor eros lacus, sit amet consequat massa mollis ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor eros lacus, sit amet consequat massa mollis ut."
                    />
                </Paper>
            </Grid>

        </Grid>

    );
}