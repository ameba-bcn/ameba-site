import React from 'react';
import BotigaGeneral from '../components/botiga/BotigaGeneral';
import PowerTitle from '../components/layout/PowerTitle';
import ProductBanner from '../components/botiga/ProductBanner';
import SociDialog from '../components/botiga/Soci';

function Botiga() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className="Botiga">
      <PowerTitle
        title="BOTIGA"
        className="SupportTitle" />
      <div className="clickBanner" onClick={() => handleClickOpen()}>
        <ProductBanner title="fes-te soci/a d'ameba per 15€/any" />
      </div>
      <SociDialog open={open}
        onClose={handleClose} />
      <div className="BotigaContent">
        <BotigaGeneral />
      </div>
    </div>
  );
}

export default Botiga;