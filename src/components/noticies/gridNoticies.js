import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';

import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        // justifyContent: 'space-around',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
        margin: 'auto'
    },
    gridList: {
        width: 1800,
        height: 800,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

export default function GridNoticies() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList cols={3} spacing={10} cellHeight={180} className={classes.gridList}>
                {tileData.map((tile) => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} className="gridImages"/>
                        {/* <GridListTileBar
                            title={tile.title}
                            subtitle={<span>by: {tile.author}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>

                                </IconButton>
                            }
                        /> */}
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

