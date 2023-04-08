import { Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { FormEvent } from 'react'
import { AsyncState } from 'src/models/store'
import { User } from 'src/models/user'

interface CreateAccountFormProps {
  info: User,
  status: AsyncState
  onSubmit: (e: FormEvent) => void
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ onChange, info, onSubmit, status }) => {
  return (
    <form onSubmit={onSubmit} className="form-control p-5 w-1/3 flex justify-center items-center">
      <div className='w-full p-10'>
        <h3 className="text-xl font-medium text-center text-blue-900 dark:text-white">
          Get Started, Create Account
        </h3>
        <br />
        <div className="mb-2 block">
          <Label
            htmlFor="username"
            value="Enter Username"
          />
        </div>
        <TextInput
          id="username"
          name='username'
          value={info.username}
          onChange={onChange}
          placeholder="your username"
          required={true}
        />
        <div className="mb-2 block mt-4">
          <Label
            htmlFor="email"
            value="Enter Email Address"
          />
        </div>
        <TextInput
          id="email"
          placeholder="your email"
          required={true}
          name='email_address'
          value={info.email_address}
          onChange={onChange}
        />
        <div className="mb-2 block mt-4">
          <Label
            htmlFor="password"
            value="Enter password"
          />
        </div>
        <TextInput
          id="password"
          name='password'
          type="password"
          value={info.password}
          onChange={onChange}
          required={true}
        />
        <div className="mb-2 block mt-4">
          <Label
            htmlFor="confirm_password"
            value="Confirm Password"
          />
        </div>
        <TextInput
          id="confirm_password"
          type="password"
          value={info.confirm_password}
          name='confirm_password'
          required={true}
          onChange={onChange}
        />
        <Button
          disabled={status === 'pending'}
          type="submit"
          className='mt-6 w-full'
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
      </div>
    </form>
  )
}

export default CreateAccountForm
