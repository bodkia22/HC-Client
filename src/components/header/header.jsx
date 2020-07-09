import React from "react";

import "./header.scss";
import { Button, Avatar } from "antd";
import { remove } from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/actions/user.actions";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

export const Header = ({ user }) => {
  const dispatch = useDispatch();

  const logout = () => {
    remove("token");
    dispatch(setUser({}));
  };

  return (
    <div className="header">
      <Link to="/courses">
        <h2 className="logo">HoneyCourse</h2>
      </Link>
      {user.role && 
        <div className="user-name">
          {user.role === "student" ? (
            <Avatar
              style={{ backgroundColor: "#2f4f4f" }}
              icon={<UserOutlined />}
            />
          ) : (
            <Avatar size={35} style={{ backgroundColor: "#2f4f4f" }}>
              Admin
            </Avatar>
          )}
          <Link to="/profile" ><h3 className="user-nickName">{user.nickName}</h3></Link>
        </div>
      }

      {user.role ? (
        <Button type="primary" danger onClick={logout}>
          Logout
        </Button>
      ) : (
        <Link to="/login">
          <Button type="primary">Login</Button>
        </Link>
      )}
    </div>
  );
};
