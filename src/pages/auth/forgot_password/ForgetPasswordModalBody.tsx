import { Label, TextInput } from 'flowbite-react'
import React from 'react'
import { UserCredentials } from 'src/models/user'

interface ForgetPasswordModalBodyProps {
  info: UserCredentials,
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const ForgetPasswordModalBody: React.FC<ForgetPasswordModalBodyProps> = ({onChange, info}) => {
  return (
    <div>
      <div className="mb-2 block">
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
    </div>
  )
}

export default ForgetPasswordModalBody
