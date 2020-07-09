import React from 'react'
import { PasswordRecoverForm, PasswordForgetForm } from '../../components/password-forget-form/password-forget-form';
import "./forgot-password-page.scss";

export const ForgotPasswordPage = () => {
    return (
        <div className="password-recover-block">
             <PasswordForgetForm/>
        </div>
    )
}
