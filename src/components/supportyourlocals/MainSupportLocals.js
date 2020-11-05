import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';
import './MainSupportLocals.css';

const useViewportIn = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return { width };
  }

export default function MainSupportLocals() {
    const { width } = useViewportIn();
    const breakpoint = 950;     

    return (
        <div className="backgroundGrid">
            <GridList 
            cols={width < breakpoint ? 1 : 3} 
            rows= {1}
            spacing={20} 
            cellHeight={240} 
            className="gridList">
                {tileData.slice(0,(width < breakpoint ? 3 : 9)).map((tile) => (
                    <GridListTile key={tile.img} className="gridImg">
                        <img src={tile.img} alt={tile.title} className="gridImages"/>
                    </GridListTile>
                ))}
            </GridList>
            
        </div>
    );
}

