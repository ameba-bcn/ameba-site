import React from 'react';
import BotigaGeneral from '../components/botiga/BotigaGeneral';
import PowerTitle from '../components/layout/PowerTitle';
import ProductBanner from '../components/botiga/ProductBanner';
import SociDialog from '../components/botiga/Soci';
import LettersMove from './../components/layout/LettersMove';
import useMediaQuery from '@material-ui/core/useMediaQuery';


function Botiga() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const isMobile = useMediaQuery('(max-width:750px)');


  return (
    <div className="Botiga">
      <PowerTitle
        title="BOTIGA"
        className="SupportTitle" />
      <div className="clickBanner" onClick={() => handleClick()}>
        <ProductBanner title={isMobile ? "fes-te soci/a" : "fes-te soci/a d'ameba per 15€/any"} />
      </div>
      <SociDialog open={open}
        onClose={handleClick} />
      <div className="BotigaContent">
        <BotigaGeneral />
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#EB5E3E"
      />
    </div>
  );
}

export default Botiga;