import { FC, ReactNode, createContext, useState, useEffect } from 'react';
import { UserData } from '../types/userData';
import { toast } from 'react-hot-toast';

type UserContextType = {
  user: UserData | null;
  setUser: (user: UserData) => void;
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchUserData(id: number, token: string) {
      const response = await fetch(
        `https://localhost:7297/Profiles/CheckToken?memberId=${id}&token=${token}`
      );
      const data = await response.json();

      console.log('Response: ', response);
      console.log('Data: ', data);
      if (data.StatusCode) {
        toast.error('Something went wrong');
      } else {
        console.log('User data: ', data);
        setUser(data as UserData);
      }
    }

    // get query param from url
    const params = new URLSearchParams(window.location.search);
    const memberId = params.get('memberId');
    const token = params.get('token');

    if (!memberId || !token) {
      toast.error('Something went wrong');
      return;
    }

    fetchUserData(+memberId, token);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};
