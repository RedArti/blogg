import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserProfile } from '../../accets/requests/requests';
import { RootState } from '../../redux/store';
import { DataUserChange } from '../../types';
import classes from './Profile.module.scss';

const Profile = () => {

  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const username = useSelector((state: RootState) => state.loginReducer.userData.user.username);
  const image = useSelector((state: RootState) => state.loginReducer.userData.user.image);

  const [name, setName] = useState(username);
  const [img, setImg] = useState(image);

  const userDataLocal: string | any = localStorage.getItem('userData');
  const parseData = JSON.parse(userDataLocal);

  const [userData, setUserData] = useState(parseData);

  const onSubmit = (data: DataUserChange) => {
    const userToken: string | null = localStorage.getItem('userToken');
    const newData = data.password && data.password.length > 8 
      ? {
        email: data.email,
        image: data.image,
        password: data.password,
        username: data.username,
      }
      : {
        email: data.email,
        image: data.image,
        username: data.username,
      };
    dispatch(changeUserProfile(newData, userToken));
  };

  return (
    <div className={classes.profile_wrapper}>
    <div className={classes.profile_form_wrapper}>
    <h3 className={classes.profile_title}>Edit Profile</h3>
    <form onSubmit={handleSubmit(onSubmit)} className={classes.profile_form}>
        <label htmlFor="" className={classes.profile_label}>
            <span>Username</span>
            <input 
            name='username' 
            type="text" 
            value={name && name}
            onChange={(event) => setName(event.target.value)}
            placeholder='Username'
            ref={register({
              minLength: 3,
              maxLength: 20,
            })} />
            { errors.username && <p className={classes.err_message}>
                From 3 to 20 characters inclusive
            </p> }
        </label>
   
        <label htmlFor="" className={classes.profile_label}>
            <span>Email Adress</span>
            <input 
            className={ errors.email && classes.err }
            name='email' 
            type="text" 
            value={userData.email}
            onChange={(event) => setUserData((prev: { email: string; password: string }) => ({ ...prev, email: event.target.value }))}
            placeholder='Email address'   
            ref={register({
              required: true,
              minLength: 10,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '',
              },
            })}/>
            { errors.email && <p className={classes.err_message}>Not valid email.</p> }
        </label>

        <label htmlFor="" className={classes.profile_label}>
            <span>New Password</span>
            <input 
            name='password' 
            type="password" 
            placeholder='New Password' 
            ref={register({ minLength: 8, maxLength: 40 })}/>
            { errors.password && <p className={classes.err_message}>Your password needs to be at least 6 characters.</p> }
        </label>

        <label htmlFor="" className={classes.profile_label}>
            <span>Avatar image (url)</span>
            <input 
            className={ errors.image && classes.err }
            name='image' 
            type="text" 
            value={img}
            onChange={(event) => setImg(event.target.value)}
            placeholder='Avatar image' 
            ref={register({
              pattern: {
                value: /[-a-zA-Z0-9@:%_.~#?&=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&=]*)?/gi,
                message: '',
              },
            })}/>
            { errors.image && <p className={classes.err_message}>Not valid url adress.</p> }
        </label>

        <input type="submit" value='Save' className={classes.profile_submit}/>

    </form>
</div>
</div>
  );
};

export default Profile;