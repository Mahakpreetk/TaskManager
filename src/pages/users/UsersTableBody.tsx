import { Table } from 'flowbite-react'
import moment from 'moment'
import React from 'react'
import { User } from 'src/models/user'

interface UsersTableBodyProps {
  data: User[] 
}

const UsersTableBody: React.FC<UsersTableBodyProps> = ({data}) => {
  return (
    <Table.Body className="divide-y">
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
        </Table.Row>
      ) : <Table.Row>
        <Table.Cell className='border text-center' colSpan={7}>No user found</Table.Cell>
      </Table.Row>}
    </Table.Body>
  )
}

export default UsersTableBody
