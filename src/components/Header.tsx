import { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalCtx } from "../context/globalCtx";
import logo from '../assets/logo.png';
import { getData } from "../lib/api";
import { MovieInterface, User } from "../interfaces/Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../context/redux";

interface Props {
  id: number;
  title: string;
}
export const Header = () => {
  const navigate = useNavigate();
  const desktop = useSelector((state: any) => state.desktop);
  const dispatchFunc = useDispatch();
  const user: User = useSelector((state: any) => state.user);
  const logout = () => {
    localStorage.clear();
    dispatchFunc(actions.setUser({}));
    navigate('/');
  }
  const [isOpen, setIsOpen]: any = useState();
  const [isSearchOpen, setIsSearchOpen]: any = useState();
  const [movies, setMovies] = useState([]);
  const searchMovies = async(e: any) => {
    const data: any = await getData('search/movie', `&query=${e.target.value}`);
    if (data?.results?.length) {
      setMovies(data.results.slice(0, 10));
    } else {
      // show error
    }
  }
  const links = [
    {path: 'films', label: 'Films'},
    {path: 'actors', label: 'Actors'},
  ];
  return(
    <header id="header" className={`${isOpen && !desktop ? 'fixed' : ''}`}>
      <div className="headerContainer">
        <Link to='/' className="logoContainer">
          <img src={logo} alt={'Logo'}/>
        </Link>
        <div className="menuContainer">
          { (desktop || (!desktop && isOpen)) && <ul className="menu">
              {links.map(({path, label}, key) => <Link className="link" onClick={() => setIsOpen(false)} key={'link' + key} to={`/${path}`}>{label}</Link>)}
              {!desktop && <span className="link error" onClick={logout}>Logout</span>}
            </ul>
          }
        </div>
        <div className="iconsContainer">
          {user.isLog && desktop &&
            <Fragment>
              <p className="username white">{user.username}</p>
              <span className="icons icon-logout" onClick={logout} />
            </Fragment>
          }
          {!user.isLog && <Link to="/auth" className="icons icon-user"></Link>}     
          {isSearchOpen
            ? <span className="icons icon-close" onClick={() => setIsSearchOpen(false)}/>
            : <span className="icons icon-search" onClick={() => setIsSearchOpen(true)}/> 
          }
          {!desktop && <span className={`icons icon-${isOpen ? 'close' : 'menu'}`} onClick={() => setIsOpen(!isOpen)}/>}
        </div>
        { isSearchOpen && <div className="dropDownContainer">
          <input type="text" className="searchInput" placeholder="Recherche..." onChange={searchMovies} />
          <div className="searchList">
            {!!movies.length && movies.map((movie: MovieInterface, i) => {
              return <Link className="item" onClick={() => {setIsSearchOpen(false); setMovies([])}} key={`item_${i}`} to={`films/${movie.id}`}>{movie.title}</Link>
            })}
          </div>
        </div> }
      </div>
    </header>
  )
}
export default Header;