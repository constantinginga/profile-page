import { FC, ReactNode, createContext, useState, useEffect } from 'react';
import { UserData } from '../types/userData';

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
    async function fetchUserData(id: number) {
      const response = await fetch(
        `https://localhost:7297/Profiles/GetProfile?memberId=${id}`
      );
      const data: UserData = await response.json();
      setUser(data);
    }

    // get query param from url
    const params = new URLSearchParams(window.location.search);
    const memberId = params.get('memberId');

    if (!memberId) return;

    fetchUserData(+memberId);
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
