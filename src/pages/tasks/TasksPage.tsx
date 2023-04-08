import React, { useEffect, useState } from 'react'
import NavTabs from 'src/components/NavTabs'
import CustomTable from 'src/components/table'
import { useAppDispatch, useAppSelector } from 'src/hook/redux'
import { TaskStatus } from 'src/models/task'
import { getAllTasks } from 'src/store/task/taskService'
import TasksTableBody from './TasksTableBody'

const TasksPage: React.FC = () => {
  const tabsItems: TaskStatus[] = ['all', 'completed', 'in-progress', 'not-started'];
  const [activeTab, setActiveTab] = useState(0)
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getAllTasks(tabsItems[activeTab]))
    // eslint-disable-next-line 
  }, [activeTab])

  return (
    <div>
      <h1 className='font-medium text-blue-800 text-2xl'>TASKS</h1>
      <hr className='bg-blue-800 h-0.5 mt-1' />
      <NavTabs
        activeTab={activeTab}
        items={tabsItems}
        onTabChange={(tab) => {
          setActiveTab(tab)
        }}
      />
      <CustomTable
        heading={['Title', 'Priority', 'Status', 'Due Date', 'Created On', 'Updated On', '']}
        tbody={<TasksTableBody data={tasks} />}
      />
    </div>
  )
}

export default TasksPage
