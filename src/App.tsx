import { Routes, Route } from 'react-router-dom';
import Profile from './pages/profile';
import ExternalProfile from './pages/external-profile';
import { UserProvider } from './context/UserContext';

declare global {
  interface Window {
    new_work_experience: HTMLDialogElement;
    new_external_link: HTMLDialogElement;
  }
}

function App() {
  return (
    <Routes>
      <Route path="external-profile/:id" element={<ExternalProfile />} />
      <Route
        path="edit-profile"
        element={
          <UserProvider>
            <Profile />
          </UserProvider>
        }
      />
    </Routes>
  );
}

export default App;
