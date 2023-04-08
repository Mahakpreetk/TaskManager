import React, { useState } from 'react'
import NavTabs from 'src/components/NavTabs'

const TasksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <div>
      <h1 className='font-medium text-blue-800 text-2xl'>TASKS</h1>
      <hr className='bg-blue-800 h-0.5 mt-1' />
      <NavTabs
        activeTab={activeTab}
        items={[
          { title: 'all', body: <>All Tasks</>},
          { title: 'completed', body: <>Completed Tasks</>},
          { title: 'in-progress', body: <>In-Progress Tasks</>},
          { title: 'not-started', body: <>Not started Tasks</>},
        ]}
        onTabChange={(tab) => {
          setActiveTab(tab)
        }}
      />
    </div>
  )
}

export default TasksPage
