import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { notify } from 'reapop';
import InputField from 'src/components/InputField';
import { useAppDispatch, useAppSelector } from 'src/hook/redux';
import { UserCredentials } from 'src/models/user';
import { userLogin } from 'src/store/auth/authService';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, message } = useAppSelector((state) => state.auth)
  const [showModals, setShowModals] = useState({
    new_account: false, forgot_passwords: false
  })
  const [credentials, setCredentials] = useState<UserCredentials>({
    email_address: '',
    password: ''
  })

  useEffect(() => {
    if (status === 'rejected') {
      dispatch(notify(message, 'error'))
    } else if (status === 'fulfilled') {
      dispatch(notify(message, 'success'))
    }
  }, [status])

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (credentials.password === '' || credentials.email_address === '')
      return dispatch(notify('Please fill all fields', 'error'))
    dispatch(userLogin(credentials))
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value })
  }

  return (
    <div className='h-screen flex'>
      <div className='w-2/3 h-full'>
        <img src="/login_bg.jpeg" className='h-full' alt="login_bg" />
      </div>
      <form onSubmit={handleFormSubmit} className='form-control p-5 w-1/3 max-w-md flex justify-center items-center'>
        <div className='w-full'>
          <h1 className=' font-bold text-4xl'>Welcome Back!</h1>
          <br />
          <br />
          <div className="form-control">
            <InputField
              type={'email'}
              required
              name='email_address'
              placeholder={'Enter Email'}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control mt-6">
            <InputField
              name='password'
              type={'password'}
              required
              placeholder={'Enter Password'}
              onChange={handleInputChange}
            />
            <Link to="" className='text-right mt-1 text-gray-500'>Forgot Password?</Link>
          </div>
          <br />
          <div className='form-control'>
            <button
              disabled={status === 'pending'}
              className={`btn btn-active ${status === 'pending' ? 'loading' : ''}`}>
              Submit
            </button>
            <Link to="" className='text-center mt-4 text-gray-500'>create a new account</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
