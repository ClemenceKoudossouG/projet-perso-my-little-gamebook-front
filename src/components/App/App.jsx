import './App.scss';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import SignUpSide from '@/components/Form/SignUp/SignUp';
import SignInSide from '@/components/Form/SignIn/SignIn';
import Profile from '../Form/Profile/Profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import theme from '../../styles/theme';
import HomePage from '../HomePage/HomePage';
import Game1 from '../Game1/Game1';
import Game2 from '../Game2/Game2';
import Stories from '../Stories/Stories';
import Contact from '../Contact/Contact';
import About from '../About/About';
import VisitorHomePage from '../VisitorHomePage/VisitorHomePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div>
          <Header color="primary" />
        </div>
        <Routes>
          <Route path="/SignUpSide" element={<SignUpSide />} />
          <Route path="/SignInSide" element={<SignInSide />} />
          <Route path="/game" element={<Game1 />} />
          <Route path="/gameDynamic" element={<Game2 />} />
          <Route path="/" element={<VisitorHomePage />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
