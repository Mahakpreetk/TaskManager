import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Plus } from 'react-feather'
import { notify } from 'reapop'
import CustomModal from 'src/components/Modal'
import NavTabs from 'src/components/NavTabs'
import CustomTable from 'src/components/table'
import { useAppDispatch, useAppSelector } from 'src/hook/redux'
import { Task, TaskStatus } from 'src/models/task'
import { addTask, deleteTaskById, getAllTasks, updateTaskById } from 'src/store/task/taskService'
import NewTaskModalBody from './NewTaskModalBody'
import TasksTableBody from './TasksTableBody'

const TasksPage: React.FC = () => {
  const tabsItems: TaskStatus[] = ['all', 'not-started', 'completed', 'in-progress'];
  const [activeTab, setActiveTab] = useState(0)
  const [isEditMode, setIsEditMode] = useState<boolean | null>(null);
  const [task, setTask] = useState({
    assigned_to: '643003eeb18af0fb9e7d3dac',
    due_date: new Date(),
    priority: 'high'
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
      setTask({
        assigned_to: '643003eeb18af0fb9e7d3dac',
        due_date: new Date(),
        priority: 'high'
      } as Task)
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
        status={status}
        title={isEditMode === null ? 'Create New Task' : isEditMode ? 'Edit Task' : 'View Task'}
        onProceed={() => {
          if (isEditMode) {
            dispatch(updateTaskById(task))
          } else {
            dispatch(addTask(task));
          }
        }}
        onCancel={() => setShowModal({ ...showModal, new_task: false })}
        body={
          <NewTaskModalBody
            setTask={setTask}
            isEditMode={isEditMode}
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
          dispatch(deleteTaskById(task?._id!));
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
        <Button onClick={() => {
          setIsEditMode(null);
          setShowModal({ ...showModal, new_task: true })
        }}>
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
          onDelete={(task) => {
            setTask(task);
            setShowModal({ ...showModal, confirm_delete: true });
          }}
          onEdit={(task) => {
            setTask(task);
            setIsEditMode(true);
            setShowModal({ ...showModal, new_task: true });
          }}
          onView={(task) => {
            setTask(task);
            setIsEditMode(false);
            setShowModal({ ...showModal, new_task: true });
          }}
        />}
      />}
    </div>
  )
}

export default TasksPage
