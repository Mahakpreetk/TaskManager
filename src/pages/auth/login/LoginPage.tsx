
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import { notify } from 'reapop';
import { useAppDispatch, useAppSelector } from 'src/hook/redux';
import { UserCredentials } from 'src/models/user';
import { userLogin } from 'src/store/auth/authService';
import { clearAuthState } from 'src/store/auth/authSlice';
import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, message } = useAppSelector((state) => state.auth)
  const [credentials, setCredentials] = useState<UserCredentials>({
    email_address: '',
    password: '',
  })

  console.log('status', status);

  useEffect(() => {
    if (status === 'rejected') {
      dispatch(notify(message, 'error'))
      dispatch(clearAuthState())
    } else if (status === 'fulfilled') {
      dispatch(notify(message, 'success'))
      dispatch(clearAuthState())
      navigate('/')
    }
    // eslint-disable-next-line
  }, [status])

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { email_address, password } = credentials;
    if (password === '' || email_address === '')
      return dispatch(notify('Please fill all fields', 'error'))
    dispatch(userLogin({ email_address, password }))
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value })
  }

  return (
    <LoginForm
      onSubmit={handleFormSubmit}
      credentials={credentials}
      onChange={handleInputChange}
      status={status}
    />
  )
}

export default LoginPage
