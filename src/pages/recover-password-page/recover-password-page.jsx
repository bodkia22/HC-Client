import React from 'react'
import { PasswordRecoverForm } from '../../components/password-recover-form/password-recover-form'

import "./recover-password-page.scss";

export const RecoverPasswordPage = () => {
    return (
        <div className="pass-recover">
            <PasswordRecoverForm/>
        </div>
    )
}
