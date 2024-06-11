import React, { useContext } from 'react';
import { CBContext } from './CarousalBannerProvider';
import Carousal from './Carousal';

const CarousalFilter = ({ category }) => {
  const { CB } = useContext(CBContext);
  const filteredCB = CB.filter(banner => banner.categories.toLowerCase() === category.toLowerCase());

  return (
    <div className="container">
      <Carousal filteredCB={filteredCB} />
    </div>
  );
};

export default CarousalFilter;
