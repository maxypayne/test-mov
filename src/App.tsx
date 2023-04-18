import './styles/reset.scss';
import './styles/home.scss';
import './styles/movieCard.scss';
import './styles/header.scss';
import './styles/variables.scss';
import './styles/global.scss';
import './styles/movie.scss';
import './styles/filmsPage.scss';
import './styles/auth.scss';
import './styles/actorCard.scss';
import './styles/actors.scss';
import './styles/actorPage.scss';
// import './styles/serie.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Header from './components/Header';
import { useDispatch, useSelector} from 'react-redux';
import { actions } from './context/redux';
import { useEffect } from 'react';
import Auth from './components/auth';
import Film from './components/Film';
import Films from './components/Films';
import Actors from './components/Actors';
import ActorPage from './components/ActorPage';

function App() {
  const dispatchFunc = useDispatch();
  const isLog = useSelector((state: any) => state.isLoggedIn);
  const handleWindowResize = () =>{
    dispatchFunc(actions.toggleDesktop(window.innerWidth > 1024));
  }
  useEffect(() => {
    dispatchFunc(actions.toggleDesktop(window.innerWidth > 1024));
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY as string);
    const username = localStorage.getItem(process.env.REACT_APP_USERNAME as string);
    dispatchFunc(actions.setUser({token,  username}));
  }, []);
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route index element={<Home />} />
          {!isLog && <Route path='auth' element={<Auth />} />}
          <Route path='films' element={<Films />} />
          <Route path='actors' element={<Actors />} />
          <Route path='actors/:id' element={<ActorPage />} />
          <Route path='films/:id' element={<Film />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
