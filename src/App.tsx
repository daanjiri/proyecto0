import { useState, useCallback, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import LogInSignIn from './pages/LogInSignIn';
import User from './pages/User';
import Event from './pages/Event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthContext } from './context/auth-context';
import TopBar from './components/TopBar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<null | number>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [name, setName] = useState<string>('');

  const login = useCallback((userId: number, accessToken: string) => {
    setIsLoggedIn(true);
    setUserId(userId);
    setAccessToken(accessToken);
    localStorage.setItem('userData', JSON.stringify({ accessToken, userId }));
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setAccessToken('');
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const storedData = JSON.parse(userData);
      if (storedData && storedData.accessToken) {
        login(storedData.userId, storedData.accessToken);
      }
    }
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/event" exact>
          <Event />
        </Route>
        <Redirect to="/" />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" exact>
          <LogInSignIn />
        </Route>
        <Redirect to="/" />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        userId,
        accessToken,
        setUserId,
        setAccessToken,
        name,
        setName,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <TopBar></TopBar>
        <Router>
          <Switch>{routes}</Switch>
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
