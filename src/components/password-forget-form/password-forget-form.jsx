import React, { useState } from "react";
import { Form, Input, Button, Result, Spin } from "antd";
import { postRequest } from "../../utils/helpers/request.helpers";
import "./password-forget-form.scss";

export const PasswordForgetForm = () => {
  const [form] = Form.useForm();
  const [isFinished, setIsFinished] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const onFinish = async (values) => {
    setSpinning(true);
    console.log("Received values of form: ", values);
    const { status, data } = await postRequest("/Auth/PasswordRecover", values);
    if (status === 200) {
      console.log(data);
      setIsFinished(true);
    }
    if (status === 400) {
      form.setFields([
        {
          name: "data",
          value: values.data,
          errors: [data],
        },
      ]);
    }
    setSpinning(false);
  };

  const { Item } = Form;

  return (
    <Spin spinning={spinning}>
      {isFinished ? (
        <div className="forget-result">
        <Result
        status="success"
        title="A link for renewing your password was sent to your e-mail address."
        subTitle="If the e-mail is not in your inbox, please check your junk mail or spam folders."
      />
      </div>
      ) : (
        <div className="password-forget">
          <p className="forget-text">
            Enter your username or email address and we'll send you a link to
            recover access to your account.
          </p>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Item
              name="data"
              rules={[
                {
                  required: true,
                  message: "Please input your E-mail or User Name!",
                },
              ]}
            >
              <Input />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Item>
          </Form>
        </div>
      )}
    </Spin>
  );
};
