import './App.scss';
import { ThemeProvider } from '@mui/material/styles';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import theme from '../../styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header color="primary" />
        <div />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
