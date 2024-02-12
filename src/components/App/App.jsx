import './App.scss';
import { ThemeProvider } from '@mui/material/styles';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import theme from '../../styles/theme';
import SignUpSide from '../SignUp/SignUp';
import Home from '../Home/Home';
import SignIn from '../SignIn/SignIn';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div>
          <Header color="primary" />
        </div>
        <Routes>
          <Route path="/SignUpSide" element={<SignUpSide />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
