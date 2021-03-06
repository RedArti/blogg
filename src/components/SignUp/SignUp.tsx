import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { autorizationUser, registrationUser } from '../../accets/requests/requests';
import { RootState } from '../../redux/store';
import { RegisteationUser } from '../../types';
import classes from './SignUp.module.scss';

type PassValues = {
  passValue: string;
  repeatPass: string;
};

type SignUpForm = {
  username: string;
  email: RegExp;
  password: string;
  repeat: string;
};

const SignUp = () => {

  const isRegister = useSelector<RootState>(state => state.loginReducer.isRegister);
  const isRegError = useSelector<RootState>(state => state.loginReducer.isRegError);
  const dispatch = useDispatch();

  const [passValues, setPassValues] = useState<PassValues>({
    passValue: '',
    repeatPass: '',
  });

  const [dataForReg, setDataForReg] = useState({
    username: '',
    email: '',
    checkBox: false,
  });

  const { register, handleSubmit, errors } = useForm<SignUpForm>();

  const onSubmit = (data: RegisteationUser) => {
    const dataForAuth = {
      email: data.email,
      password: data.password,
    };
    localStorage.setItem('userData', JSON.stringify(dataForAuth));
    dispatch(registrationUser(data));
    dispatch(autorizationUser(dataForAuth));
  };

  return isRegister 
    ? <Redirect to='/'/>
    : (
    <div className={classes.signup_wrapper}>
        <div className={classes.signup_form_wrapper}>
        <h3 className={classes.sign_up_title}>Create new account</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.signup_form}>
            { isRegError && <p className={classes.err_message}>Such user is already registered. Try else.</p> }
            <label htmlFor="" className={classes.sign_up_label}>
                <span>Username</span>
                <input 
                className={ errors.username && classes.err }
                name='username' 
                value={dataForReg.username}
                onChange={(event) => setDataForReg(p => ({ ...p, username: event.target.value }))}
                type="text" 
                placeholder='Username' 
                ref={register({ required: true, minLength: 3, maxLength: 20 })}/>
                { errors.username && <p className={classes.err_message}>
                    From 3 to 20 characters inclusive
                </p> }
            </label>

            <label htmlFor="" className={classes.sign_up_label}>
                <span>Email address</span>
                <input 
                className={ errors.email && classes.err }
                name='email' 
                value={dataForReg.email}
                onChange={(event) => setDataForReg(p => ({ ...p, email: event.target.value.toLowerCase() }))}
                type="text" 
                placeholder='Email address' 
                ref={register({
                  required: true,
                  minLength: 10,
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                    message: '',
                  },
                })}/>
                { errors.email && <p className={classes.err_message}>Not valid email.</p> }
            </label>

            <label htmlFor="" className={classes.sign_up_label}>
                <span>Password</span>
                <input 
                value={passValues.passValue}
                onChange={(event) => setPassValues(p => ({ ...p, passValue: event.target.value }))}
                className={ errors.password && classes.err }
                name='password' 
                type="password" 
                placeholder='Password' 
                ref={register({ required: true, minLength: 8, maxLength: 40 })}/>
                { errors.password && <p className={classes.err_message}>Your password needs to be at least 6 characters.</p> }
            </label>

            <label htmlFor="" className={classes.sign_up_label}>
                <span>Repeat Password</span>
                <input 
                value={passValues.repeatPass}
                onChange={(event) => setPassValues(p => ({ ...p, repeatPass: event.target.value }))}
                name='repeat' 
                type="password" 
                placeholder='Repeat Password' 
                ref={register({ required: true, 
                  minLength: 8, 
                  maxLength: 40,
                  validate: (value) =>
                    value === passValues.passValue })}/>
                { errors.repeat && <p className={classes.err_message}>Passwords must match</p> }
            </label>

            <label htmlFor="" className={classes.sign_up_checkbox}>
                <input 
                type="checkbox"
                name='agree'
                checked={dataForReg.checkBox}
                onChange={() => setDataForReg(p => ({ ...p, checkBox: !dataForReg.checkBox }))}
                ref={register({ required: true })}/>
                <span>I agree to the processing of my personal information</span>
            </label>
        
            { 
              dataForReg.username && dataForReg.email && passValues.passValue && passValues.repeatPass && dataForReg.checkBox
                ? <input type="submit" value='Create' className={classes.sign_up_submit}/>
                : <input type="submit" disabled value='Create' className={classes.sign_up_submit_disabled}/>
            }

            <p className={classes.signIn_link_in_signOut}>
            Already have an account? <Link to='/sign-in'>Sign In.</Link>
            </p>
        </form>
    </div>
    </div>
    );
};

export default SignUp;