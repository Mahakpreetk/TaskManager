import { useEffect, useState } from 'react'
import { Folder, LogOut, Menu, Users } from 'react-feather'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { useAppSelector } from 'src/hook/redux'
import { getAdriotUser } from 'src/store/asyncConfig'
import SidebarLink from './SidebarLink'

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const user = getAdriotUser();
    if (user) {
      if (location.pathname === '/') {
        navigator('/users')
      } else {
        navigator(location.pathname);
      }
    } else {
      navigator('/auth/login');
    }
    // eslint-disable-next-line
  }, [location.pathname, user]);

  return (
    <div className='h-screen grid grid-cols-10'>
      <div className={`col-span-10 md:col-span-2 ${showMenu || 'hidden lg:'}flex flex-col transition duration-700 h-screen bg-blue-800 p-5 border-r border-gray-300 shadow-lg`}>
        <div className='w-full flex-none text-2xl mb-5 font-bold text-stone-300'>
          DASHBOARD
        </div>
        <ul className='ml-1 flex flex-col flex-grow'>
          <div className='flex-grow'>
            <SidebarLink title={'Users'} icon={<Users className=' md:h-6 md:w-6 h-5 w-5' />} path={'/users'} onSelect={() => setShowMenu(false)} />
            <SidebarLink title={'Tasks'} icon={<Folder className=' md:h-6 md:w-6 h-5 w-5' />} path={'/tasks'} onSelect={() => setShowMenu(false)} />
          </div>
          <div className='border-t flex-shrink border-slate-700'>
            <SidebarLink title={'Log Out'} icon={<LogOut className=' md:h-6 md:w-6 h-5 w-5' />} path={'/#'} onSelect={() => setShowMenu(false)} />
          </div>
        </ul>
      </div>
      <div className={`bg-blue-700 sr-only h-14 p-5 col-span-10 ${showMenu && 'hidden'}`}>
        <Menu onClick={() => setShowMenu(true)} className='text-gray-50' />
      </div>
      <div style={{ height: 'calc(100vh - 3.5rem' }} className={`md:p-8 ${showMenu && 'hidden'} border p-4 col-span-10 lg:col-span-8`}>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
