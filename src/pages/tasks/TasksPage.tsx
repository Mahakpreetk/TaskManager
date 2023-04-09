import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Plus } from 'react-feather'
import { notify } from 'reapop'
import CustomModal from 'src/components/Modal'
import NavTabs from 'src/components/NavTabs'
import CustomTable from 'src/components/table'
import { useAppDispatch, useAppSelector } from 'src/hook/redux'
import { Task, TaskStatus } from 'src/models/task'
import { addTask, getAllTasks } from 'src/store/task/taskService'
import NewTaskModalBody from './NewTaskModalBody'
import TasksTableBody from './TasksTableBody'

const TasksPage: React.FC = () => {
  const tabsItems: TaskStatus[] = ['all', 'completed', 'in-progress', 'not-started'];
  const [activeTab, setActiveTab] = useState(0)
  const [task, setTask] = useState({
    assigned_to: '643003eeb18af0fb9e7d3dac',
    due_date: new Date()
  } as Task)
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState({
    new_task: false,
  })
  const { tasks, status, message } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getAllTasks(tabsItems[activeTab]))
    // eslint-disable-next-line 
  }, [activeTab])

  useEffect(() => {
    if (status === 'fulfilled') {
      dispatch(notify(message, 'success'))
      setShowModal({ ...showModal, new_task: false })
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
        tbody={<TasksTableBody data={tasks} />}
      />}
    </div>
  )
}

export default TasksPage
