import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { hideModal } from '../../../redux/actionsCreators';
import { deleteArticle, getArticles } from '../../../redux/requests';
import { RootState } from '../../../redux/store';
import classes from './AcceptModal.module.scss';

const AcceptModal = ({ slug }: { slug: string }) => {

  const history = useHistory();

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.loginReducer.userData.user.token);

  const deleteArticleItem = () => {
    dispatch(deleteArticle(slug, token));
    dispatch(getArticles(5));
    dispatch(hideModal());
    history.push('/');
  };

  return (
    <div className={classes.modal_wrapper}>
      <p className={classes.modal_title}>Are you sure to delete this article?</p>
      <div className={classes.modal_btns}>
        <button
        className={classes.no} 
        type='button'
        onClick={() => dispatch(hideModal())}>No</button>
        <button 
        className={classes.yes} 
        type='button'
        onClick={deleteArticleItem}>Yes</button>
      </div>
    </div>
  );
};

export default AcceptModal;