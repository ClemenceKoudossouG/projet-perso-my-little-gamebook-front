import './App.scss';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkLoggedIn } from '@/Store/UserSlice.js';
import SignUpSide from '@/components/Form/SignUp/SignUp';
import SignInSide from '@/components/Form/SignIn/SignIn';
import UserEmailSide from '@/components/Form/PasswordReset/UserEmail';
import NewPasswordSide from '../Form/PasswordReset/NewPassword';
import Profile from '../Form/Profile/Profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import theme from '../../styles/theme';
import Game1 from '../Game1/Game1';
import Game2 from '../Game2/Game2';
import Stories from '../Stories/Stories';
import Contact from '../Contact/Contact';
import DisclaimerPage from '../DisclaimerPage';
import About from '../About/About';
import VisitorHomePage from '../VisitorHomePage/VisitorHomePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import AccountFreeGame from '../Game2/AccountFreeGame';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoggedIn());
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div>
          <Header color="primary" />
        </div>
        <Routes>
          <Route path="/SignUpSide" element={<SignUpSide />} />
          <Route path="/SignInSide" element={<SignInSide />} />
          <Route path="/UserEmailSide" element={<UserEmailSide />} />
          <Route
            path="/request-password-reset/reset-password"
            element={<NewPasswordSide />}
          />
          <Route path="/game" element={<Game1 />} />
          <Route path="/gameDynamic" element={<Game2 />} />
          <Route path="/accountFreeGame" element={<AccountFreeGame />} />
          <Route path="/" element={<VisitorHomePage />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
