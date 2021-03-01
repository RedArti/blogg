import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { autorizationUser } from '../../accets/requests/requests';
import { RootState } from '../../redux/store';
import { DataUserAuthorize } from '../../types';
import classes from './SignIn.module.scss';

type SignInForm = {
  email: RegExp;
  password: string;
};

const SignIn = () => {

  const dispatch = useDispatch();
  const isError = useSelector<RootState>(state => state.loginReducer.isError);
  const isLogedIn = useSelector<RootState>(state => state.loginReducer.isLogedIn);
  
  const { register, handleSubmit, errors } = useForm<SignInForm>();

  const onSubmit = (data: DataUserAuthorize) => {
    localStorage.setItem('userData', JSON.stringify(data));
    dispatch(autorizationUser(data));
  };

  return isLogedIn
    ? <Redirect to='/' /> 
    : (
    <div className={classes.signin_wrapper}>
    <div className={classes.signin_form_wrapper}>
    <h3 className={classes.sign_in_title}>Sign In</h3>
    <form onSubmit={handleSubmit(onSubmit)} className={classes.signin_form}>
        <label htmlFor="" className={classes.sign_in_label}>
            <span>Email address</span>
            <input 
            className={ errors.email && classes.err }
            name='email' 
            type="text" 
            placeholder='Email address'
            ref={register({
              required: true,
              minLength: 10,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '',
              },
            })} />
            { errors.email && <p className={classes.err_message}>Not valid email.</p> }
        </label>

        <label htmlFor="" className={classes.sign_in_label}>
            <span>Password</span>
            <input 
            className={ errors.password && classes.err }
            name='password' 
            type="password" 
            placeholder='Password' 
            ref={register({ required: true, minLength: 8, maxLength: 40 })}/>
            { errors.password && <p className={classes.err_message}>Your password needs to be at least 6 characters.</p> }
        </label>
        { isError && <p className={classes.err_message}>Not valid password or email</p> }
    
        <input type="submit" value='Login' className={classes.sign_in_submit}/>

        <p className={classes.signIn_link_in_signOut}>
        Don’t have an account? <Link to='/sign-up'>Sign Up.</Link>
        </p>
    </form>
</div>
</div>
    );
};

export default SignIn;