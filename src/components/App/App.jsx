import './App.scss';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import theme from '../../styles/theme';
import SignUpSide from '@/components/Form/SignUp/SignUp';
import HomePage from '../HomePage/HomePage';
import SignInSide from '@/components/Form/SignIn/SignIn';
import Game1 from '../Game1/Game1';

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
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
