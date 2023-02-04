import { createContext, Dispatch, SetStateAction } from 'react';
interface AuthContextInterface {
  isLoggedIn: boolean;
  userId: null | number;
  accessToken: string;
  login: (uid: number, accessToken: string) => void;
  logout: () => void;
  setAccessToken: Dispatch<SetStateAction<string>>;
  setUserId: Dispatch<SetStateAction<null | number>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}
export const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
  accessToken: '',
  setAccessToken: () => {},
  setUserId: () => {},
  name: '',
  setName: () => {},
});
