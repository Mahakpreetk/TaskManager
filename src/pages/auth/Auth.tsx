import { Outlet } from "react-router"

const Auth: React.FC = () => {
  return (
    <div className='h-screen flex'>
      <div className='w-2/3 h-full'>
        <img src="/login_bg.jpeg" className='h-full' alt="login_bg" />
      </div>
      <Outlet />
    </div>
  )
}

export default Auth
