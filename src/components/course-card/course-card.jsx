import React from 'react'
import { Card, Button } from 'antd'

import './course-card.scss';
import { Link } from 'react-router-dom';

export const CourseCard =  ({ id, name, info, imgUrl }) => {

    const link = "/subscribe/"+id;
    
    return (
        <Card title={name}> 
            <img src={imgUrl} alt="courseImage" className="imgContainer"/>
            <p>{info}</p>
            <Link to={link} ><Button type="primary">Pick date</Button></Link>
        </Card>
    )
}
