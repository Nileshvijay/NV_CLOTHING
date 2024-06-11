import React from 'react';
import Products from './Products';
import Carousal from './Carousal'; // Ensure the import statement is correct

function Men() {
  return (
    <div style={{ paddingTop: '1000px' }}> {/* Add padding to the top */}
      <Carousal />
      <Products />
    </div>
  );
}

export default Men;
