import Profile from './pages/profile';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Profile />
    </UserProvider>
  );
}

export default App;
