import './VisitorHomePage.scss';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Container, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import IconButton from '@mui/material/IconButton';
import { getCompartmentBeginning } from '../../Store/compartmentSlice';
import { getAllStories } from '../../Store/StoriesSlice';

const Root = styled('div')(({ theme }) => ({
  backgroundImage: 'url("/img/bg/ile.jpg")',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  padding: theme.spacing(4),
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#fff',
  margin: theme.spacing(4, 0),
  textShadow: '7px 7px 8px rgba(80, 10, 20, 0.4)',
  fontSize: 'calc(8vw + 20px)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  margin: theme.spacing(2),
  minWidth: '200px',
}));

function VisitorHomePage() {
  const logged = useSelector((state) => state.user.logged);

  const dispatch = useDispatch();

  useEffect(() => {
    // Vérifier si un token est stocké dans le localStorage lors du chargement de l'application
    const token = localStorage.getItem('token');
    if (token) {
      // Si un token est présent, mettre à jour le state de l'application
      dispatch({ type: 'LOGIN_SUCCESS', payload: token });
    }
  }, [dispatch]);

  const handleClickButtonCompartment = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données randomisé entre 1 et 3
    const randomId = Math.floor(Math.random() * 3) + 1;
    dispatch(getCompartmentBeginning(randomId)); // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_COMPARTMENT_BEGINNING' });
  };
  const handleClickButtonStories = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getAllStories());
    // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_STORIES' });
  };
  const handleAccountFreeGame = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getCompartmentBeginning());
    // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_ACCOUNTFREE_COMPARTMENT_BEGINNING' });
  };
  return (
    <Root>
      <div className="overlay" />

      <Container>
        <Title variant="h1" component="h1">
          My Little GameBook
        </Title>
        {!logged ? (
          <div>
            <Link to="/SignInSide">
              <StyledButton variant="contained" color="primary">
                Se connecter
              </StyledButton>
            </Link>

            <Link to="/SignUpSide" style={{ color: '#009688' }}>
              <StyledButton variant="contained" color="primary">
                S'inscrire
              </StyledButton>
            </Link>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '20px',
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={handleAccountFreeGame}
              >
                <Link to="/accountFreeGame" style={{ color: '#009688' }}>
                  <PlayCircleFilledWhiteIcon
                    className="icon"
                    sx={{ fontSize: 100 }}
                  />
                </Link>
              </IconButton>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', color: 'white' }}
              >
                Jouer à l'Histoire des 4 créateurs
              </Typography>
            </div>
          </div>
        ) : (
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={handleClickButtonStories}
              >
                <Link to="/stories" style={{ color: '#009688' }}>
                  <PlayCircleFilledWhiteIcon
                    className="icon"
                    sx={{ fontSize: 100 }}
                  />
                </Link>
              </IconButton>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', color: 'white' }}
              >
                Voir les histoires
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={handleClickButtonCompartment}
              >
                <Link to="/gameDynamic" style={{ color: '#009688' }}>
                  <PlayCircleFilledWhiteIcon
                    className="icon"
                    sx={{ fontSize: 100 }}
                  />
                </Link>
              </IconButton>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', color: 'white' }}
              >
                Histoire surprise
              </Typography>
            </div>
          </div>
        )}
      </Container>
    </Root>
  );
}

export default VisitorHomePage;
