import React from 'react'
import Chip from 'src/components/Chip'
import { TaskFilter } from 'src/models/task'

interface TaskFilteringProps {
  setFilterBy: React.Dispatch<React.SetStateAction<TaskFilter>>
  filterBy: TaskFilter
}

const TaskFiltering: React.FC<TaskFilteringProps> = ({ filterBy, setFilterBy }) => {
  return (
    <>
      <h1>Priority</h1>
      <div className='flex space-x-4'>
        <Chip
          onSelect={(v) => setFilterBy({ ...filterBy, priority: v })}
          child={<p className='px-2 cursor-pointer py-1'>high</p>}
          bgColor={`${filterBy.priority === 'high' ? 'bg-blue-600' : 'bg-slate-400'}`}
        />
        <Chip
          onSelect={(v) => setFilterBy({ ...filterBy, priority: v })}
          child={<p className='px-2 cursor-pointer py-1'>medium</p>}
          bgColor={`${filterBy.priority === 'medium' ? 'bg-blue-600' : 'bg-slate-400'}`}
        />
        <Chip
          onSelect={(v) => setFilterBy({ ...filterBy, priority: v })}
          child={<p className='px-2 cursor-pointer py-1'>low</p>}
          bgColor={`${filterBy.priority === 'low' ? 'bg-blue-600' : 'bg-slate-400'}`}
        />
      </div>
      <br />
      <h1>Due Date</h1>
      <div className='flex space-x-2 text-sm text-gray-500'>
        <Chip
          onSelect={(v) => setFilterBy({ ...filterBy, date: v })}
          child={<p className='px-2 cursor-pointer py-1'>Past Dates</p>}
          bgColor={`${filterBy.date === 'Past Dates' ? 'bg-blue-600' : 'bg-slate-400'}`}
        />
        <Chip
          onSelect={(v) => setFilterBy({ ...filterBy, date: v })}
          child={<p className='px-2 cursor-pointer py-1'>Future Dates</p>}
          bgColor={`${filterBy.date === 'Future Dates' ? 'bg-blue-600' : 'bg-slate-400'}`}
        />
      </div>
      <hr className=' my-4 bg-slate-600' />
      {(filterBy.date !== '' || filterBy.priority !== '') &&
        <>
          <p className=' text-slate-500 text-sm'>Filter would be done based on {filterBy.date} {filterBy.priority !== '' && ` ${filterBy.date !== '' && ' and '} ${filterBy.priority} priority`}</p>
        </>
      }
    </>
  )
}

export default TaskFiltering
