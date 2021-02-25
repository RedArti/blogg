import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { cleanTagList, isEditFalse, logout } from '../../../redux/actionsCreators';
import { UserData } from '../../../redux/reducers/loginReducer';
import { autorizationUser } from '../../../redux/requests';
import { RootState } from '../../../redux/store';
import classes from './Header.module.scss';
import user_image from './user_image.png';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLogedIn = useSelector<RootState>(state => state.loginReducer.isLogedIn);
  const userData = useSelector<RootState, UserData>(state => state.loginReducer.userData);
  

  const logOut = () => {
    dispatch(logout());
    dispatch(isEditFalse());
    localStorage.clear();
    history.push('/');
  };

  const createArticle = () => {
    dispatch(cleanTagList());
    dispatch(isEditFalse());
  };

  useEffect(() => {
    const data: string | null = localStorage.getItem('userData');
    if (data) {
      dispatch(autorizationUser(JSON.parse(data)));
    }
  }, [dispatch, isLogedIn]);

  const getImage = () => userData.user.image
    ? userData.user.image : user_image;

  const isUserLogedIn = () => isLogedIn
    ? <>
    <li className={classes['header-item']}>
    <Link 
    to='/new-article'
    onClick={createArticle}>
      <button className={classes.header_article} type='button'>
       Create acticle
      </button>
    </Link>
    </li>
    <li className={classes['header-item']}>
        <Link 
        to='/profile'
        onClick={() => dispatch(isEditFalse())}>
            <div className={classes.user_img}>
                <span>{userData.user.username}</span>
                <img alt='user' src={getImage()} />
            </div>
        </Link>
    </li>
    <li className={classes['header-item']}>
        <button 
        className={classes.header_logout} 
        type='button'
        onClick={logOut}>
            Log out
        </button>
    </li>
    </>
    :  <>
    <li className={classes['header-item']}>
        <Link to='/sign-in'>Sign In</Link>
    </li>
    <li className={classes['header-item']}>
      <Link className={classes.header_sign_up} to='/sign-up'>
        <button className={classes.header_btn} type='button'>
            Sign up
        </button>
      </Link>
    </li>
    </>;

  return (
    <header className={classes.header}>
        <nav className={classes.nav}>
            <ul className={classes.header_list}>
                <li className={classes['header-item']}>
                    <Link 
                    to='/'
                    onClick={() => dispatch(isEditFalse())}>Realworld Blog</Link>
                </li>
                { isUserLogedIn() }
            </ul>
        </nav>
    </header>);
};

export default Header;