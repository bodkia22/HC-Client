import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import {getRequest} from '../../utils/helpers/request.helpers';
import { SubscribeCard } from '../../components/subscribe-card/subscribe-card';
import { Spin } from 'antd';
export const SubscribePage = () => {
    const [course, setCourse] = useState({});
    const { courseId } = useParams();
    const [spinning, setSpinning] = useState(true);

    useEffect(() => {
        const getCourseById = async () => {
            setSpinning(true);

            const { data } = await getRequest("/Course/GetById?courseId="+courseId);
    
            setCourse(data);
            setSpinning(false);
        }
        getCourseById();
    }, [courseId])
    
    return (
        <Spin spinning={spinning}>
            {course ? <SubscribeCard {...course}/> : <Redirect to="/404" />}
        </Spin>
    )
}
