import { Table, Tooltip } from 'flowbite-react'
import moment from 'moment'
import React from 'react'
import { Edit, Trash } from 'react-feather'
import { User } from 'src/models/user'

interface UsersTableBodyProps {
  data: User[],
  onUserDelete: (user: User) => void
  onUserEdit: (user: User) => void
}

const UsersTableBody: React.FC<UsersTableBodyProps> = ({ data, onUserDelete, onUserEdit }) => {
  return (
    <Table.Body className="divide-y text-xs md:text-md">
      {data.length > 0 ? data.map(datum =>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="max-w-xs text-ellipsis truncate font-medium text-gray-900 dark:text-white">
            <p className='text-ellipsis'>{datum.username}</p>
          </Table.Cell>
          <Table.Cell>
            {datum.email_address}
          </Table.Cell>
          <Table.Cell>
            {moment(datum.createdAt).fromNow()}
          </Table.Cell>          
          <Table.Cell>
            <Tooltip content="Edit User">
              <Edit onClick={() => onUserEdit(datum)} color="orange" className='cursor-pointer h-5 w-5' />
            </Tooltip>
            <Tooltip content="Delete User">
              <Trash onClick={() => onUserDelete(datum)} color="red" className='cursor-pointer h-5 w-5' />
            </Tooltip>
          </Table.Cell>          
        </Table.Row>
      ) : <Table.Row>
        <Table.Cell className='border text-center' colSpan={7}>No user found</Table.Cell>
      </Table.Row>}
    </Table.Body>
  )
}

export default UsersTableBody
