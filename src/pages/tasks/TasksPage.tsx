import { Button, Spinner, TextInput } from 'flowbite-react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Filter, Plus } from 'react-feather'
import { notify } from 'reapop'
import CustomModal from 'src/components/Modal'
import NavTabs from 'src/components/NavTabs'
import CustomTable from 'src/components/table'
import { useAppDispatch, useAppSelector } from 'src/hook/redux'
import { Task, TaskFilter, TaskStatus } from 'src/models/task'
import { addTask, deleteTaskById, getAllTasks, updateTaskById } from 'src/store/task/taskService'
import NewTaskModalBody from './NewTaskModalBody'
import TaskFiltering from './TaskFilter'
import TasksTableBody from './TasksTableBody'
import moment from 'moment'

const TasksPage: React.FC = () => {
  const tabsItems: TaskStatus[] = ['all', 'not-started', 'completed', 'in-progress'];
  const [activeTab, setActiveTab] = useState(0)
  const [systemTasks, setSystemTasks] = useState<Task[]>([])
  const [searchFieldVal, setSearchFieldVal] = useState('');
  const [filterBy, setFilterBy] = useState<TaskFilter>({ priority: '', date: '' })
  const [isEditMode, setIsEditMode] = useState<boolean | null>(null);
  const [task, setTask] = useState({
    due_date: new Date(),
    priority: 'high'
  } as Task)
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState({
    new_task: false, confirm_delete: false, filter: false
  })
  const { tasks, status, message } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getAllTasks(tabsItems[activeTab]))
    // eslint-disable-next-line 
  }, [activeTab])

  useEffect(() => {
    if (tasks) {
      setSystemTasks(tasks);
    }
  }, [tasks])

  useEffect(() => {
    if (status === 'fulfilled') {
      dispatch(notify(message, 'success'))
      setShowModal({ confirm_delete: false, new_task: false, filter: false })
      setTask({
        due_date: new Date(),
        priority: 'high'
      } as Task)
      dispatch(getAllTasks(tabsItems[activeTab]))
    } else if (status === 'rejected') {
      dispatch(notify(message, 'error'))
    }
    // eslint-disable-next-line
  }, [status]);

  const handleTaskSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const results = tasks.filter(task =>
      task.title.toLowerCase().includes(value.toLowerCase()) ||
      task.description.toLowerCase().includes(value.toLowerCase())
    )
    setSearchFieldVal(value);
    setSystemTasks(results);
  }

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
            <h3 className="md:text-lg text-sm font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this task?
            </h3>
          </>
        }
      />
      <CustomModal
        show={showModal.filter}
        title={'Filter Tasks'}
        onProceed={() => {
          const { priority, date } = filterBy;
          let filtererdTasks: Task[] = [...tasks];
          console.log(filtererdTasks);          
          if (priority !== '') {
            filtererdTasks = filtererdTasks.filter(task => task.priority === filterBy.priority);
          }
          console.log(filtererdTasks, priority);
          if (date !== '') {
            if (date === 'Past Dates') {
              filtererdTasks = filtererdTasks.filter(task => moment(task.due_date).isBefore(moment()))
            } else if (date === 'Future Dates') { 
              filtererdTasks = filtererdTasks.filter(task => moment(task.due_date).isAfter(moment()))
            }
          }
          console.log(filtererdTasks, date);          
          setShowModal({ ...showModal, filter: false });
          setSystemTasks(filtererdTasks);
        }}
        onCancel={() => {
          setFilterBy({ priority: '', date: '' });
          setShowModal({ ...showModal, filter: false });
        }}
        body={
          <TaskFiltering setFilterBy={setFilterBy} filterBy={filterBy} />
        }
      />
      <div className='flex mb-6 md:mb-0 justify-between items-center'>
        <h1 className='font-medium text-blue-800 text-lg md:text-2xl'>TASKS</h1>
        <Button onClick={() => {
          setIsEditMode(null);
          setShowModal({ ...showModal, new_task: true })
        }}>
          <Plus className="mr-2 md:h-5 text-xs md:text-base md:w-5 h-3 w-3" />
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
      <div className='mb-10 flex justify-between items-center space-x-4'>
        <TextInput
          className='flex-1'
          onChange={handleTaskSearch}
          value={searchFieldVal}
          placeholder={`Search ${tabsItems[activeTab]} tasks by name or description`}
        />
        <Filter onClick={() => setShowModal({ ...showModal, filter: true })} className=' text-gray-600 cursor-pointer' />
      </div>
      {status === 'pending' ? <div className="text-center">
        <Spinner size={'lg'} />
      </div> : <CustomTable
        heading={['Title', 'Priority', 'Status', 'Due Date', 'Created On', 'Updated On', 'Actions']}
        tbody={<TasksTableBody
          data={systemTasks}
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
