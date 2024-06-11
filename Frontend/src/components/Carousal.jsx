import React from 'react';

const Carousal = ({ filteredCB }) => {
  // Ensure filteredCB is not undefined or null
  if (!filteredCB || filteredCB.length === 0) {
    return null; // Or return a placeholder UI indicating no items are available
  }

  return (
    <div className="container-fluid p-3 mt-5">
      <div id="simpleCarouselIndicators" className="carousel slide">
        <div className="carousel-indicators">
          {filteredCB.map((item, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#simpleCarouselIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {filteredCB.map((item, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={item.image} className="d-block w-100" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#simpleCarouselIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#simpleCarouselIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousal;
