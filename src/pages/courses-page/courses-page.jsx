import React from 'react'
import { CourseList } from '../../components/course-list/course-list'

import './course-page.scss';

export const CoursesPage = () => {
    return (
        <div className="container2">
            <h1>Select course to study</h1>
            <CourseList url="/Course/GetAllCourses"/>
        </div>
    )
}
