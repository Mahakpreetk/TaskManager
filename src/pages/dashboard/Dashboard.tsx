import { Folder, LogOut, Users } from 'react-feather'
import { Outlet } from 'react-router'
import SidebarLink from './SidebarLink'

const Dashboard: React.FC = () => {
  return (
    <div className='h-screen grid grid-cols-10'>
      <div className="col-span-2 flex flex-col h-screen bg-blue-950 p-5 border-r border-gray-300 shadow-lg">
        <div className='w-full flex-none text-2xl mb-5 font-bold text-stone-300'>
          DASHBOARD
        </div>
        <ul className='ml-1 flex flex-col flex-grow'>
          <div className='flex-grow'>
            <SidebarLink title={'Users'} icon={<Users />} path={'/users'} />
            <SidebarLink title={'Tasks'} icon={<Folder />} path={'/tasks'} />
          </div>
          <div className='border-t flex-shrink border-slate-700'>
            <SidebarLink title={'Log Out'} icon={<LogOut />} path={'/#'} />
          </div>
        </ul>
      </div>
      <div className='p-8 col-span-8'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
