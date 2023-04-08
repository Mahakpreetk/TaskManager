import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import NotificationsSystem, { dismissNotification, setUpNotifications, wyboTheme } from 'reapop';
import { useAppDispatch, useAppSelector } from './hook/redux';
import Auth from './pages/auth/Auth';
import CreateAccountPage from './pages/auth/create_account/CreateAccountPage';
import LoginPage from './pages/auth/login/LoginPage';
import { setupAxiosResponseInterceptors } from './store/axios';
import Dashboard from './pages/dashboard/Dashboard';
import UsersPage from './pages/users/UsersPage';
import TasksPage from './pages/tasks/TasksPage';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notifications = useAppSelector((state) => state.notifications)

  useEffect(() => {
    setupAxiosResponseInterceptors(dispatch, navigate)
    setUpNotifications({
      defaultProps: {
        position: 'top-center',
        dismissible: true,
        dismissAfter: 3600
      }
    })
    // eslint-disable-next-line
  }, []);

  return <>
    <NotificationsSystem
      notifications={notifications}
      dismissNotification={(id) => dispatch(dismissNotification(id))}
      theme={wyboTheme}
    />
    <Routes>
      <Route path='/' element={<Dashboard />}>
        <Route path='users' element={<UsersPage />} />
        <Route path='tasks' element={<TasksPage />} />
      </Route>
      <Route path='/auth' element={<Auth />} >
        <Route path='login' element={<LoginPage />} />
        <Route path='create-account' element={<CreateAccountPage />} />
      </Route>
    </Routes>
  </>
}

export default App;