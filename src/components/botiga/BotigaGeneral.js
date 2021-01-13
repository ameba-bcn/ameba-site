import React from 'react';
import Data from './response.json';
import './BotigaGeneral.css';
// import { NavLink, Redirect } from 'react-router-dom';
import ProducteDialog from './Producte';

export default function BotigaGeneral() {

    const [open, setOpen] = React.useState(false);
    const [rowClickedData, setState] = React.useState([]);


    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      }

    const cardClicked = (data) => {
        handleClickOpen();
        setState(data);
        // return <Redirect to={`/Botiga/Producte?='${data.id}`} />
    }

    const cardGenerator = Data.map((data) => {
        return (
            <div className="fullcardBotiga" key={data.id}
                onClick={() => cardClicked(data)}>
                {/* <NavLink style={{ textDecoration: 'none' }}
                    to={{
                        pathname: '/botiga/' + data.id,
                        aboutProps: data
                    }}> */}
                    <div className="productCard">
                        <div className="productImgFrame">
                            <img className="productImgTop" src={data.img} alt={data.title} />
                        </div>
                        <div className="productCardBody">
                            <h5 className="productTitle" >{data.title}</h5>
                            {/* <p className="card-text">{data.interview.intro}</p> */}
                            <p className="productCardPrice">{data.price}</p>
                        </div>
                    </div>
                {/* </NavLink> */}
            </div>
        )
    })

    return (
        <div className="productCardDeck">
            {cardGenerator}
            <ProducteDialog open={open} 
            dataRow={rowClickedData} 
            onClose={handleClose} />
        </div>
    )

};