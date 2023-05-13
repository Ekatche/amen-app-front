import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";
import car_1 from "./img/car_1.jpg";
import car_2 from "./img/car_2.jpg";
import car_3 from "./img/car_3.jpg";

const HomeCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <div className="car-img-wrapper">
          <img
            src={car_1}
            alt="First slide"
            className="carousel-img d-block w-100"
          />
        </div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="car-img-wrapper">
          <img
            src={car_2}
            alt="Second slide"
            className="carousel-img d-block w-100 "
          />
        </div>

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="car-img-wrapper">
          <img
            src={car_3}
            alt="Third slide"
            className="carousel-img d-block w-100"
          />
        </div>

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
export default HomeCarousel;
