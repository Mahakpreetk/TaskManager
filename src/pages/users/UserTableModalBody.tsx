import { Label, TextInput } from 'flowbite-react'
import React from 'react'
import { User } from 'src/models/user'

interface UserTableModalBodyProps {
  info: User,
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const UserTableModalBody: React.FC<UserTableModalBodyProps> = ({onChange, info}) => {
  return (
    <div>
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
    </div>
  )
}

export default UserTableModalBody
