import React from "react";
import { Carousel } from "antd";
import imageCS from '../../assets/images/computer-science.jpg';
import './slider.scss';

export const Slider = () => {
  return (
      <Carousel autoplay>
        <div>
          <h3>start to learn computer science technology</h3>
          <img src={imageCS} alt="imageCS" className="image"/>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
  );
};
