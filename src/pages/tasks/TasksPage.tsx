import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Plus } from 'react-feather'
import { notify } from 'reapop'
import CustomModal from 'src/components/Modal'
import NavTabs from 'src/components/NavTabs'
import CustomTable from 'src/components/table'
import { useAppDispatch, useAppSelector } from 'src/hook/redux'
import { Task, TaskStatus } from 'src/models/task'
import { addTask, deleteTaskById, getAllTasks } from 'src/store/task/taskService'
import NewTaskModalBody from './NewTaskModalBody'
import TasksTableBody from './TasksTableBody'

const TasksPage: React.FC = () => {
  const tabsItems: TaskStatus[] = ['all', 'not-started', 'completed', 'in-progress'];
  const [activeTab, setActiveTab] = useState(0)
  const [selectedTaskId, setSelectedTaskId] = useState<string>();
  const [task, setTask] = useState({
    assigned_to: '643003eeb18af0fb9e7d3dac',
    due_date: new Date()
  } as Task)
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState({
    new_task: false, confirm_delete: false
  })
  const { tasks, status, message } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getAllTasks(tabsItems[activeTab]))
    // eslint-disable-next-line 
  }, [activeTab])

  useEffect(() => {
    if (status === 'fulfilled') {
      dispatch(notify(message, 'success'))
      setShowModal({ confirm_delete: false, new_task: false })
      dispatch(getAllTasks(tabsItems[activeTab]))
    } else if (status === 'rejected') {
      dispatch(notify(message, 'error'))
    }
    // eslint-disable-next-line
  }, [status]);

  return (
    <div>
      <CustomModal
        show={showModal.new_task}
        title={'Create New Task'}
        onProceed={() => {
          dispatch(addTask(task));
        }}
        onCancel={() => setShowModal({ ...showModal, new_task: false })}
        body={
          <NewTaskModalBody
            setTask={setTask}
            newTask={task}
          />
        }
      />
      <CustomModal
        show={showModal.confirm_delete}
        title={'Confirm Delete'}
        color={'red'}
        status={status}
        onProceed={() => {
          dispatch(deleteTaskById(selectedTaskId!));
        }}
        onCancel={() => setShowModal({ ...showModal, confirm_delete: false })}
        body={
          <>
            <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this task?
            </h3>
          </>
        }
      />
      <div className='flex justify-between items-center'>
        <h1 className='font-medium text-blue-800 text-2xl'>TASKS</h1>
        <Button onClick={() => setShowModal({ ...showModal, new_task: true })}>
          <Plus className="mr-2 h-5 w-5" />
          Add Task
        </Button>
      </div>
      <NavTabs
        activeTab={activeTab}
        items={tabsItems}
        onTabChange={(tab) => {
          setActiveTab(tab)
        }}
      />
      {status === 'pending' ? <div className="text-center">
        <Spinner size={'lg'} />
      </div> : <CustomTable
        heading={['Title', 'Priority', 'Status', 'Due Date', 'Created On', 'Updated On', 'Actions']}
        tbody={<TasksTableBody
          data={tasks}
          onDelete={(id) => {
            setSelectedTaskId(id);
            setShowModal({ ...showModal, confirm_delete: true });
          }}
          onEdit={function (id: string): void {
            throw new Error('Function not implemented.')
          }} onView={function (id: string): void {
            throw new Error('Function not implemented.')
          }} />}
      />}
    </div>
  )
}

export default TasksPage
