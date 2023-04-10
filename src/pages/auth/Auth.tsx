import { Outlet } from "react-router"

const Auth: React.FC = () => {
  return (
    <div className='h-screen flex'>
      <div className='lg:w-2/3 hidden md:block h-full'>
        <img src="/login_bg.jpeg" className='h-full' alt="login_bg" />
      </div>
      <Outlet />
    </div>
  )
}

export default Auth
