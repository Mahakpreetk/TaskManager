import { Table, Tooltip } from 'flowbite-react'
import moment from 'moment'
import React from 'react'
import { Edit, Eye, Trash } from 'react-feather'
import Chip from 'src/components/Chip'
import { Task } from 'src/models/task'

interface TasksTableBodyProps {
  data: Task[],
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  onView: (id: string) => void
}

const TasksTableBody: React.FC<TasksTableBodyProps> = ({ data, onEdit, onDelete, onView }) => {
  return (
    <Table.Body className="divide-y">
      {data.length > 0 ? data.map(datum =>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {datum.title}
          </Table.Cell>
          <Table.Cell>
            {<Chip
              child={datum.priority}
              bgColor={datum.priority === 'high' ? 'bg-red-500' : datum.priority === 'low' ? 'bg-orange-500' : 'bg-blue-500'}
            />
            }
          </Table.Cell>
          <Table.Cell>
            {<Chip
              child={datum.status}
              bgColor={datum.status === 'completed' ? 'bg-green-500' : datum.status === 'in-progress' ? 'bg-orange-500' : 'bg-blue-500'}
            />
            }
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
          <Table.Cell className='flex space-x-3'>
            <Tooltip content="View Task">
              <Eye onClick={() => onView(datum._id!)} color="blue" className='cursor-pointer h-5 w-5' />
            </Tooltip>
            <Tooltip content="Edit Task">
              <Edit onClick={() => onEdit(datum._id!)} color="orange" className='cursor-pointer h-5 w-5' />
            </Tooltip>
            <Tooltip content="Delete Task">
              <Trash onClick={() => onDelete(datum._id!)} color="red" className='cursor-pointer h-5 w-5' />
            </Tooltip>
          </Table.Cell>
        </Table.Row>
      ) : <Table.Row>
        <Table.Cell className='border text-center' colSpan={7}>No task found</Table.Cell>
      </Table.Row>}
    </Table.Body>
  )
}

export default TasksTableBody
