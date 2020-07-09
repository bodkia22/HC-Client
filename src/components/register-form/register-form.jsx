import React, { useState } from "react";

import {
  Form,
  Input,
  Tooltip,
  Checkbox,
  Button,
  DatePicker,
  Alert,
  Spin,
} from "antd";

import { QuestionCircleOutlined } from "@ant-design/icons";

import "./register-form.scss";

import { postRequest } from "../../utils/helpers/request.helpers";

const { Item } = Form;
const formLoyaut = "vertical";

export const RegistrationForm = () => {
  const [respounceStatus, setRespounceStatus] = useState({
    finisFhed: false,
  });

  const [spinning, setSpinning] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setSpinning(true);
    console.log("Received values of form: ", values);

    const { status, data } = await postRequest("/auth/register", values);

    if (status === 200) {
      console.log(data);
      setRespounceStatus({
        message: data,
        discriptions:
          "Please confirm your email before start using the application.",
        type: "success",
        finished: true,
      });
    } else {
      console.log(data);

      data.errors.forEach((element) => {
        if (element.code === "DuplicateEmail") {
          form.setFields([
            {
              name: "email",
              value: values.email,
              errors: [element.description],
            },
          ]);
        }
        if (element.code === "DuplicateUserName") {
          form.setFields([
            {
              name: "nickname",
              value: values.nickname,
              errors: [element.description],
            },
          ]);
        }
      });
    }
    setSpinning(false);
  };

  return !respounceStatus.finished ? (
    <Spin tip="Loading..." spinning={spinning}>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        layout={formLoyaut}
        className="register-form"
        scrollToFirstError
      >
        <h1>Sign Up</h1>
        <Item
          name="firstName"
          label="First name"
          rules={[
            {
              required: true,
              message: "Please input your First name!",
            },
            ({ firstNameRegValidator }) => ({
              validator(rule, value) {
                if (value == null) return Promise.resolve();
                const reg = new RegExp("^[a-zA-Z]+$");
                if (reg.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("Can only contain letters");
              },
            }),
          ]}
        >
          <Input className="item" />
        </Item>
        <Item
          name="lastName"
          label="Last name"
          rules={[
            {
              required: true,
              message: "Please input your Last name!",
            },
            ({ lastNameRegValidator }) => ({
              validator(rule, value) {
                if (value == null) return Promise.resolve();
                const reg = new RegExp("^[a-zA-Z]+$");
                if (reg.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("Can only contain letters");
              },
            }),
          ]}
        >
          <Input />
        </Item>
        <Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Item>
        <Item
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
                if (value.length >= 8) {
                  return Promise.resolve();
                }

                return Promise.reject("Must be at least 8 symbols");
              },
            }),
            ({ passwordValidator }) => ({
              validator(rule, value) {
                if (value == null) return Promise.resolve();
                if (value.length < 128) {
                  return Promise.resolve();
                }

                return Promise.reject("Password is too long");
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password />
        </Item>

        <Item
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
        </Item>

        <Item
          name="nickname"
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
            ({ nickNameRegValidator }) => ({
              validator(rule, value) {
                if (value == null) return Promise.resolve();
                const reg = new RegExp("^[a-zA-Z0-9]+$");
                if (reg.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("Only number and letters is required.");
              },
            }),
            ({ nickNameLengthValidator }) => ({
              validator(rule, value) {
                if (value == null) return Promise.resolve();
                if (value.length >= 1 && value.length <= 20) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Nick name must be less than 20 symbols."
                );
              },
            }),
          ]}
        >
          <Input />
        </Item>
        <Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            ({ phoneRegValidator }) => ({
              validator(rule, value) {
                if (value == null) return Promise.resolve();
                const reg1 = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
                const reg2 = /^[0-9]*$/;
                if (reg1.test(value) && reg2.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("Please input a valid phone number.");
              },
            }),
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </Item>
        <Item
          name="dateOfBirth"
          label="Date of birth"
          rules={[
            {
              required: true,
              message: "Please input your date of birth!",
            },
            ({ dateOfBirthValidator }) => ({
              validator(rule, value) {
                if (value == null) return Promise.resolve();
                const now = new Date();
                const userDate = new Date(value);
                console.log(userDate);
                if (userDate < now) {
                  return Promise.resolve();
                }
                return Promise.reject("Data is invalid");
              },
            }),
          ]}
        >
          <DatePicker />
        </Item>
        <Item
          name="agreement"
          valuePropName="checked"
          className="agreement"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Should accept agreement"),
            },
          ]}
        >
          <Checkbox>
            I have read the{" "}
            <a
              href="http://www.columbia.edu/~mr2651/ecommerce3/1st/assignments/Assignment%203/Web%20Site%20Development%20_Simple_.pdf"
              target="_blank"
            >
              agreement
            </a>
          </Checkbox>
        </Item>

        <Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </Spin>
  ) : (
    <Alert
      message={respounceStatus.message}
      description={respounceStatus.discriptions}
      type={respounceStatus.type}
      showIcon
    />
  );
};
