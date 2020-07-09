import React from "react";
import { useParams, Link } from "react-router-dom";
import { Form, Input, Button, Result, Spin } from "antd";
import { getRequest, postRequest } from "../../utils/helpers/request.helpers";
import { useState } from "react";

import "./password-recover-form.scss";

export const PasswordRecoverForm = () => {
  const { userId, token } = useParams();
  const [isFinished, setIsFinished] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setSpinning(true);
    console.log("Received values of form: ", values);
    const { status, data } = await postRequest(`/Auth/ResetPassword`, {
      userId,
      resetToken: token,
      newPassword: values.password,
    });
    if (status === 200) {
      setIsFinished(true);
      console.log(data);
    }
    if (status === 500) {
      console.log(data);
    }
    setSpinning(false);
  };

  return (
    <Spin spinning={spinning}>
      {isFinished ? (
        <div className="password-recover">
          <Result
            status="success"
            title="Password was changed"
            extra={[
              <Link to="/login">
                <Button type="primary">Start learning !</Button>
              </Link>,
            ]}
          />
        </div>
      ) : (
        <div className="password-recover">
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  validator: null, //validate password
                },
                ({ passwordValidator }) => ({
                  validator(rule, value) {
                    if (value == null) return Promise.resolve();
                    if (value.length >= 8 && value.length <= 50) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "Must be at least 8 symbol but less than 50"
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Spin>
  );
};
