import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { ChangeEvent, FormEvent } from 'react';
import { Lock, Mail } from 'react-feather';
import { Link } from 'react-router-dom';
import { AsyncState } from 'src/models/store';
import { UserCredentials } from 'src/models/user';

interface LoginFormProps {
  onSubmit: (e: FormEvent) => void
  credentials: UserCredentials,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  status: AsyncState
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, credentials, onChange, status }) => {
  return (
    <form onSubmit={onSubmit} className='form-control p-5 w-1/3 flex justify-center items-center'>
      <div className='w-full p-10'>
        <h3 className="text-xl font-medium text-center text-blue-900 dark:text-white">
          Welcome, Sign in.
        </h3>
        <br />
        <div className="mb-2 block">
          <Label
            htmlFor="email_address"
            value="Enter email"
          />
        </div>
        <TextInput
          id="email_address"
          type="email"
          name="email_address"
          icon={Mail}
          placeholder="email@gmail.com"
          required={true}
          shadow={true}
          value={credentials.email_address}
          onChange={onChange}
        />
        <div className="mb-2 mt-4 block">
          <Label
            htmlFor="password"
            value="Enter password"
          />
        </div>
        <TextInput
          id="password"
          name='password'
          icon={Lock}
          type="password"
          required={true}
          value={credentials.password}
          shadow={true}
          onChange={onChange}
        />
        <div className='mt-2 text-right'>
          <button
            type={'button'}
            disabled={status === 'pending'}
            className="text-sm text-blue-700 hover:underline dark:text-blue-500"
          >
            Forgot Password?
          </button>
        </div>
        <Button
          disabled={status === 'pending'}
          type="submit"
          className='mt-3 w-full'
        >
          {status === 'pending' ?
            <div className="mr-5">
              <Spinner
                size="sm"
                light={true}
              />
              <span className='ml-5'>Please wait...</span>
            </div> : <>SUBMIT</>
          }
        </Button>
        <div className="text-sm mt-4 text-center font-medium text-gray-500 dark:text-gray-300">
          Not registered?
          <Link
            to="/auth/create-account"
            className="text-blue-700 inline hover:underline dark:text-blue-500"
          >
            Create account
          </Link>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
