import { Routes, Route } from 'react-router-dom';
import Profile from './pages/profile';
import ExternalProfile from './pages/external-profile';
import Connections from './pages/connections';
import { UserProvider } from './context/UserContext';
import { ConnectionProvider } from './context/ConnectionContext';

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
      <Route
        path="connections"
        element={
          <ConnectionProvider>
            <Connections />
          </ConnectionProvider>
        }
      />
    </Routes>
  );
}

export default App;
