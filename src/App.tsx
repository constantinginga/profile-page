import Profile from './pages/profile';
import { UserProvider } from './context/UserContext';

declare global {
  interface Window {
    new_work_experience: HTMLDialogElement;
    new_external_link: HTMLDialogElement;
  }
}

function App() {
  return (
    <UserProvider>
      <Profile />
    </UserProvider>
  );
}

export default App;
