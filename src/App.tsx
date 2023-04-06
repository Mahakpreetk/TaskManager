import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import NotificationsSystem, { dismissNotification, setUpNotifications, wyboTheme } from 'reapop';
import { useAppDispatch, useAppSelector } from './hook/redux';
import LoginPage from './pages/LoginPage';
import { setupAxiosResponseInterceptors } from './store/axios';

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
      <Route path='/' element={<LoginPage />} />
    </Routes>
  </>
}

export default App;