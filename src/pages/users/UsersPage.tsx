import { Spinner } from 'flowbite-react';
import React, { useEffect } from 'react';
import CustomTable from 'src/components/table';
import { useAppDispatch, useAppSelector } from 'src/hook/redux';
import { getUsers } from 'src/store/auth/authService';
import UsersTableBody from './UsersTableBody';

const UsersPage: React.FC = () => {
  const { users, status } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers())
    // eslint-disable-next-line 
  }, [])

  return (
    <div>
      <h1 className='font-medium text-blue-800 text-lg md:text-2xl'>USERS</h1>
      <p className='text-xs md:text-sm text-gray-500 mb-7'>All users registered on the system.</p>
      {status === 'pending' ? <div className="text-center">
        <Spinner size={'lg'} />
      </div> : <CustomTable
        heading={['Username', 'Email Address', 'Date Registered']}
        tbody={<UsersTableBody data={users} />}
      />}
    </div>
  )
}

export default UsersPage
