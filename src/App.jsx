import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { LoginPage } from './pages/sign-in/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from './components/header/header';
import { getRequest } from './utils/helpers/request.helpers';
import { setUser } from './store/actions/user.actions';
import { get } from 'js-cookie';
import { Home } from './pages/home/home-page';
import { Confirmation } from './pages/confirmation-page/confrimation-page';
import { CoursesPage } from './pages/courses-page/courses-page';
import { SubscribePage } from './pages/subscribe-page/subscribe-page';
import { PageNotFound } from './pages/404-page/404-page';
import { AdminPage } from './pages/admin-page/admin-page';
import { UserProfilePage } from './pages/profile-page/profile';
import { Spin } from 'antd';
import { RecoverPasswordPage } from './pages/recover-password-page/recover-password-page';
import { PasswordForgetForm } from './components/password-forget-form/password-forget-form';
import { ForgotPasswordPage } from './pages/forgot-password-page/forgot-password-page';


export const App = () => {
  //global user state
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchUser = async () => {
      const { status, data } = await getRequest('/users/get-authorized');
      if(status === 200){
        dispatch(setUser(data));
      }
    }
    if(!!get("token"))
      fetchUser();
    else
      dispatch(setUser({})); 
  }, [dispatch]);

  return (
      <Router>
        {
          user ? <div className="App">
          <Header user={user} />
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={() => !user.role ? <LoginPage /> : (user.role === "student" ? <Redirect to="/courses"/> : <Redirect to="/admin" />)}/>
            <Route path="/password/forgot" component={() => !user.role ? <ForgotPasswordPage /> : (user.role === "student" ? <Redirect to="/courses"/> : <Redirect to="/admin" />)}/>
            <Route path="/password/recover/:userId/:token" component={() => !user.role ? <RecoverPasswordPage /> : (user.role === "student" ? <Redirect to="/courses"/> : <Redirect to="/admin" />)}/>
            <Route path="/register" component={RegisterPage} />
            <Route path="/courses" component={() => !user.role ? <Redirect to="/login"/> : (user.role === "admin" ? <Redirect to="/admin"/> : <CoursesPage/>)} />
            <Route path="/admin" component={() => !user.role ? <Redirect to="/login"/> : (user.role === "student" ? <Redirect to="/"/> : <AdminPage/>)}/>
            <Route path="/confirmation/:userId/:token" component={Confirmation} />
            <Route path="/subscribe/:courseId" component={() => !!user.role ? <SubscribePage/> : <Redirect to="/login"/>}/>
            <Route path="/profile" component={() => !user.role ? <Redirect to="/login"/> : (user.role === "admin" ? <Redirect to="/admin"/> : <UserProfilePage/>)} />
            <Route path='/404' component={PageNotFound} />
            <Redirect from='*' to='/404' /> 
          </Switch>
        </div> : <div className="App-loading"><Spin tip="Loading..."></Spin></div>
        }
        
      </Router>
  );
}

