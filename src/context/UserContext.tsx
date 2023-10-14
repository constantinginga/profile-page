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
    // get query param from url
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');

    if (userId) {
      console.log(userId);
      // fetch call with userId here
      setUser({
        id: +userId,
        name: null,
        aboutMe: null,
        help: null,
      });
    }
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
