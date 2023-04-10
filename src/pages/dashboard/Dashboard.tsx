import { Folder, LogOut, Users, Menu } from 'react-feather'
import { Outlet } from 'react-router'
import SidebarLink from './SidebarLink'
import { useState } from 'react'

const Dashboard: React.FC = () => {
  const [showMenu, setShowMenu] = useState(true)
  return (
    <div className='h-screen grid grid-cols-10'>
      <div className={`col-span-10 md:col-span-2 ${showMenu || 'hidden lg:'}flex flex-col transition duration-700 h-screen bg-blue-800 p-5 border-r border-gray-300 shadow-lg`}>
        <div className='w-full flex-none text-2xl mb-5 font-bold text-stone-300'>
          DASHBOARD
        </div>
        <ul className='ml-1 flex flex-col flex-grow'>
          <div className='flex-grow'>
            <SidebarLink title={'Users'} icon={<Users className=' md:h-6 md:w-6 h-5 w-5' />} path={'/users'} onSelect={()=>setShowMenu(false)} />
            <SidebarLink title={'Tasks'} icon={<Folder className=' md:h-6 md:w-6 h-5 w-5' />} path={'/tasks'} onSelect={() => setShowMenu(false)} />
          </div>
          <div className='border-t flex-shrink border-slate-700'>
            <SidebarLink title={'Log Out'} icon={<LogOut className=' md:h-6 md:w-6 h-5 w-5' />} path={'/#'} onSelect={() => setShowMenu(false)} />
          </div>
        </ul>
      </div>
      <div className={`bg-blue-700 h-14 p-5 col-span-10 ${showMenu && 'hidden'}`}>
        <Menu onClick={()=>setShowMenu(true)} className='text-gray-50' />
      </div>
      <div style={{ height: 'calc(100vh - 3.5rem' }} className={`md:p-8 ${showMenu && 'hidden'} border p-4 col-span-10 lg:col-span-8`}>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
