import React from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { postRequest, getRequest } from "../../utils/helpers/request.helpers";
import { set } from "js-cookie";
import { setUser } from "../../store/actions/user.actions";
import { useDispatch } from "react-redux";

import './facebook.scss';

import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

export const Facebook = () => {
  const componentClicked = () => console.log("clicked");
  const dispatch = useDispatch();

  const responseFacebook = async (response) => {
    console.log(response);

    console.log(response.accessToken);

    if (response.accessToken) {
      const { status, data } = await postRequest("/Auth/facebookAuth", {
        accessToken: response.accessToken,
      });
      console.log(data);

      if (status === 200) {
        if (data.jwtToken != null) {
          set("token", data.jwtToken);

          const userRespounce = await getRequest("/users/get-authorized");
          if (userRespounce.status === 200) {
            dispatch(setUser(userRespounce.data));
          }
        }
      }
    }
  };
  return (
    <div>
      <FacebookLogin
        appId="1086958175013245"
        autoLoad={false}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
        render={renderProps => (
          <div>Use social media <IconFont type="icon-facebook" onClick={renderProps.onClick} className="facebookIcon"/> <IconFont type="icon-twitter" /></div>
        )}
      />
    </div>
  );
};
