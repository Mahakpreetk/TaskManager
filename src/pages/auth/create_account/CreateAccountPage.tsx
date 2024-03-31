
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import { notify } from 'reapop';
import { useAppDispatch, useAppSelector } from 'src/hook/redux';
import { User } from 'src/models/user';
import { createUserAccount } from 'src/store/auth/authService';
import CreateAccountForm from './CreateAccountForm';
import { clearAuthState } from 'src/store/auth/authSlice';
import { ADRIOT_USER_INFO_KEY } from 'src/contants';

const CreateAccountPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, message } = useAppSelector((state) => state.auth)
  const [userInfo, setUserInfo] = useState<User>({
    email_address: '',
    password: '',
    confirm_password: '',
    username: ''
  })

  useEffect(() => {
    if (status === 'rejected') {
      dispatch(notify(message, 'error'))
    } else if (status === 'fulfilled') {
      dispatch(notify(message, 'success'))
      dispatch(clearAuthState());
      setTimeout(() => {
        navigate('/auth/login')
      }, 300);
    }
    // eslint-disable-next-line
  }, [status])

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { password, confirm_password } = userInfo;
    if (password !== confirm_password) {
      return dispatch(notify("Passwords should match", "error"));
    }
    // Dispatch the createUserAccount action
    try {
      await dispatch(createUserAccount(userInfo));
      // Upon successful account creation, store user information in local storage
      localStorage.setItem(ADRIOT_USER_INFO_KEY, JSON.stringify(userInfo));
      // You may also choose to store the token if needed
      // localStorage.setItem(ADRIOT_USER_TOKEN_KEY, userToken);
      // Redirect the user to another page after successful account creation
      dispatch(notify("Account created successfully", "success"));
      dispatch(clearAuthState());
      setTimeout(() => {
        navigate("/auth/login");
      }, 300);
    } catch (error) {
      // Handle any errors that occur during account creation
      dispatch(
        notify("Failed to create account. Please try again later.", "error")
      );
    }
  };

 const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;
   setUserInfo((prevUserInfo) => ({
     ...prevUserInfo,
     [name]: value,
   }));
 };

  return (
    <CreateAccountForm
      onSubmit={handleFormSubmit}
      info={userInfo}
      onChange={handleInputChange}
      status={status}
    />
  )
}

export default CreateAccountPage
