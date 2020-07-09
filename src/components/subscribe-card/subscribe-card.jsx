import React, { useState, useEffect } from "react";
import { Card, DatePicker, Button, Spin } from "antd";
import { postRequest, getRequest } from "../../utils/helpers/request.helpers";

import "./subscribe-card.scss";
import { Link } from "react-router-dom";
import { AlertOutlined } from "@ant-design/icons";

export const SubscribeCard = ({ id, name, info, imgUrl }) => {
  const [courseDate, setCourseDate] = useState();
  const [spinner, setSpinner] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscriptionsStatus = async () => {
      const { status } = await getRequest(
        `/Course/GetIsUserSubscribedToTheCourse?courseId=${id}`
      );
      if (status === 200) {
        setIsSubscribed(true);
      }
      if(status === 400) {
        
      }
    };

    if (id !== undefined) {
      checkSubscriptionsStatus();
    }
    console.log("id effect " + id);
  }, [id]);

  const disabledDate = (current) => {
    let today = new Date();
    return current && current < today;
  };

  const handleDatePickerChange = (date, dateString) => {
    setCourseDate(dateString);
  };

  const subscribeToCourse = async () => {
    setSpinner(true);

    const { status } = await postRequest("/Student/SubscribeToCourse", {
      courseId: id,
      startDate: courseDate,
    });

    if(status === 200)
    {
      setIsSubscribed(true);
    }
    setSpinner(false);
  };
  return (
    <Card title={name} className="subscribe-card" spinning={spinner}>
      <img src={imgUrl} alt="courseImage" className="imgsubscribe" />
      <p>{info}</p>
      <div className="content">
        <h3>How the Specialization Works</h3>
        <h4>Take Courses</h4>
        <p>
          A Honey Course Specialization is a series of courses that helps you
          master a skill. To begin, enroll in the Specialization directly, or
          review its courses and choose the one you'd like to start with. When
          you subscribe to a course that is part of a Specialization, you’re
          automatically subscribed to the full Specialization. It’s okay to
          complete just one course — you can pause your learning or end your
          subscription at any time. Visit your learner dashboard to track your
          course enrollments and your progress.
        </p>
        <h4>Hands-on Project</h4>
        <p>
          Every Specialization includes a hands-on project. You'll need to
          successfully finish the project(s) to complete the Specialization and
          earn your certificate. If the Specialization includes a separate
          course for the hands-on project, you'll need to finish each of the
          other courses before you can start it.
        </p>
        <h4>Earn a Certificate</h4>
        <p>
          When you finish every course and complete the hands-on project, you'll
          earn a Certificate that you can share with prospective employers and
          your professional network.
        </p>
      </div>
      {!isSubscribed ? (
        <Spin tip="Subscribing..." spinning={spinner}>
          <div className="subscribe-block">
            <h3>Choose a date when you want to start studying:</h3>
            <DatePicker
              onChange={(date, dateString) =>
                handleDatePickerChange(date, dateString)
              }
              disabledDate={disabledDate}
              showToday={false}
            />
            <Button type="primary" onClick={subscribeToCourse}>
              Subscribe
            </Button>
          </div>
        </Spin>
      ) : (
        <div className="subscribe-block">
          <h3>
            <AlertOutlined className="logo-succsess"/> You've already registered for the course, you can see the start date in the <Link to="/profile" >profile</Link>. 
          </h3>
        </div>
      )}
    </Card>
  );
};
