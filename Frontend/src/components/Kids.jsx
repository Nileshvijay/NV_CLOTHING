// import React from 'react';
// import img1 from '../assets/kids1.webp';
// import img2 from '../assets/kids2.webp';
// import img3 from '../assets/kids3.webp';

// function Kids() {
//     return (
//         <div className="container-fluid " style={{marginTop:'100px'}}>
//             <div id="carouselExampleIndicators" className="carousel slide">
//                 <div className="carousel-indicators">
//                     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
//                     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
//                     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
//                 </div>
//                 <div className="carousel-inner">
//                     <div className="carousel-item active">
//                         <img src={img1} className="d-block w-100" alt="Slide 1" />
//                     </div>
//                     <div className="carousel-item">
//                         <img src={img2} className="d-block w-100" alt="Slide 2" />
//                     </div>
//                     <div className="carousel-item">
//                         <img src={img3} className="d-block w-100" alt="Slide 3" />
//                     </div>
//                 </div>
//                 <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
//                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                     <span className="visually-hidden">Previous</span>
//                 </button>
//                 <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
//                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                     <span className="visually-hidden">Next</span>
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Kids;
import React from 'react'
import Carousalfilter from './Carousalfilter'
import Products from './Products'

function Kids() {
  return (
    <div>
     
      <Carousalfilter />
      <Products />
    </div>
  )
}

export default Kids;


