import React, { useEffect, useState } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import tileData from './tileData';
import './MainSupportLocals.css';
import axiosInstance from "../../axios";

function MainSupportLocals() {
    const breakpoint = useMediaQuery('(max-width:950px)');
    const [state, setState] = useState(undefined)

    useEffect(() => {
        axiosInstance.get(`interviews/`, {})
            .then((res) => {
                console.log(res.data);
                return res.data
            }).then((response) => {
                setState(response)
            })
            .catch(error => {
                console.log("ERROL", error.response)
            });
    }, []);

    return (
        <div className="backgroundGrid">
            {state && <GridList
                cols={breakpoint ? 1 : 3}
                rows={1}
                spacing={20}
                cellHeight={240}
                className="gridList">
                {state.slice(0, (breakpoint ? 3 : 9)).map((tile) => (
                    <GridListTile key={tile.image} className="gridImg">
                        <img src={tile.image} alt={tile.title} className="gridImages" />
                    </GridListTile>
                ))}
            </GridList>}
        </div>
    );
}

export default React.memo(MainSupportLocals);