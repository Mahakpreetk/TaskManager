import { Table } from 'flowbite-react'
import moment from 'moment'
import React from 'react'
import { Task } from 'src/models/task'

interface TasksTableBodyProps {
  data: Task[]
}

const TasksTableBody: React.FC<TasksTableBodyProps> = ({ data }) => {
  return (
    <Table.Body className="divide-y">
      {data.map(datum =>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {datum.title}
          </Table.Cell>
          <Table.Cell>
            {datum.priority}
          </Table.Cell>
          <Table.Cell>
            {datum.status}
          </Table.Cell>
          <Table.Cell>
            {moment(datum.due_date).fromNow()}
          </Table.Cell>
          <Table.Cell>
            {moment(datum.createdAt).format('LLL')}
          </Table.Cell>
          <Table.Cell>
            {moment(datum.udpatedAt).format('LLL')}
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  )
}

export default TasksTableBody
