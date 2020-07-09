import React from 'react'
import { CourseList } from '../../components/course-list/course-list'

import './course-page.scss';

export const CoursesPage = () => {
    return (
        <div className="container2">
            <CourseList url="/Course/GetAllCourses"/>
        </div>
    )
}
