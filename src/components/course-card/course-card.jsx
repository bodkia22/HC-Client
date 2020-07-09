import React from "react";
import { Card, Button } from "antd";

import "./course-card.scss";
import { Link } from "react-router-dom";

export const CourseCard = ({ id, name, info, imgUrl }) => {
  const link = "/subscribe/" + id;

  return (
    <Card title={name}>
      <div className="imgContainer">
        <img src={imgUrl} alt="courseImage"  class="img"/>
      </div>
      <p className="info">{info.slice(0, 320)}...</p>
      <Link to={link}>
        <Button type="primary">See More</Button>
      </Link>
    </Card>
  );
};
