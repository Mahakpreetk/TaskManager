import { Spinner } from 'flowbite-react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { notify } from 'reapop';
import CustomModal from 'src/components/Modal';
import CustomTable from 'src/components/table';
import { useAppDispatch, useAppSelector } from 'src/hook/redux';
import { User } from 'src/models/user';
import { deleteUserAccount, getUsers, updateUserAccount } from 'src/store/auth/authService';
import UserTableModalBody from './UserTableModalBody';
import UsersTableBody from './UsersTableBody';

const UsersPage: React.FC = () => {
  const { users, status, message } = useAppSelector((state) => state.auth)
  const [user, setUser] = useState<User>({} as User)
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState({
    new_user: false, confirm_delete: false
  })

  useEffect(() => {
    dispatch(getUsers())
    // eslint-disable-next-line 
  }, [])

  useEffect(() => {
    if (status === 'fulfilled') {
      dispatch(notify(message, 'success'))
      setShowModal({ confirm_delete: false, new_user: false })
      setUser({} as User)
      dispatch(getUsers())
    } else if (status === 'rejected') {
      dispatch(notify(message, 'error'))
    }
    // eslint-disable-next-line
  }, [status]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  return (
    <div>
      <CustomModal
        show={showModal.new_user}
        title={'Update User'}
        status={status}
        onProceed={() => {
          dispatch(updateUserAccount(user));
        }}
        onCancel={() => setShowModal({ ...showModal, new_user: false })}
        body={
          <UserTableModalBody info={user} onChange={handleInputChange} />
        }
      />
      <CustomModal
        show={showModal.confirm_delete}
        title={'Confirm Delete'}
        color={'red'}
        status={status}
        onProceed={() => {
          dispatch(deleteUserAccount(user?._id!));
        }}
        onCancel={() => setShowModal({ ...showModal, confirm_delete: false })}
        body={
          <>
            <h3 className="md:text-lg text-sm font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
          </>
        }
      />
      <h1 className='font-medium text-blue-800 text-lg md:text-2xl'>USERS</h1>
      <p className='text-xs md:text-sm text-gray-500 mb-7'>All users registered on the system.</p>
      {status === 'pending' ? <div className="text-center">
        <Spinner size={'lg'} />
      </div> : <CustomTable
        heading={['Username', 'Email Address', 'Date Registered', 'Updated On','Actions']}
        tbody={<UsersTableBody
          data={users}
          onUserDelete={(user) => {
            setUser(user);
            setShowModal({ ...showModal, confirm_delete: true });
          }}
          onUserEdit={(user) => {
            setUser(user);
            setShowModal({ ...showModal, new_user: true });
          }}
        />}
      />}
    </div>
  )
}

export default UsersPage
