import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import {getRequest} from '../../utils/helpers/request.helpers';
import { SubscribeCard } from '../../components/subscribe-card/subscribe-card';
export const SubscribePage = () => {
    const [course, setCourse] = useState({});
    const { courseId } = useParams();
    
    useEffect(() => {
        const getCourseById = async () => {
            const { data } = await getRequest("/Course/GetById?courseId="+courseId);
    
            setCourse(data);
            console.log({data});
        }
        getCourseById();
    }, [courseId])
    
    return (
        <div>
            {course ? <SubscribeCard {...course}/> : <Redirect to="/404" />}
        </div>
    )
}
