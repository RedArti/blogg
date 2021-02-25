import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import classes from './NewArticle.module.scss';
import { RootState } from '../../redux/store';
import { createArticle, getArticles, updateArticle } from '../../redux/requests';
import { addTag, addTagEdit, deleteTag, deleteTagEdit, isEditFalse } from '../../redux/actionsCreators';
import { NewArticleType } from '../../types';

const NewArticle = () => {

  const history = useHistory();
  const dispatch = useDispatch(); 
  const { handleSubmit, register, errors } = useForm();

  const token = useSelector((state: RootState) => state.loginReducer.userData.user.token);
  const tagsList = useSelector((state: RootState) => state.tagsReducer.tags);
  const isEdit = useSelector((state: RootState) => state.articlesReducer.isEdit);
  const articleData = useSelector((state: RootState) => state.articlesReducer.dataForEdit);
  const isLogedIn = useSelector((state: RootState) => state.loginReducer.isLogedIn);

  const [value, setValue] = useState<string>('');
  const [titleValue, setTitleValue] = useState<string>(articleData.title);
  const [descrValue, setDescrtValue] = useState<string>(articleData.description);
  const [bodyValue, setBodyValue] = useState<string>(articleData.body);
  const [newArt, setNewArt] = useState({
    valTitle: '',
    valDescr: '',
    valBody: '',
  });

  useEffect(() => {
    localStorage.setItem('userToken', token);
  }, [token]);
  
  const onSubmit = (data: NewArticleType) => {
    const userToken: string | null = localStorage.getItem('userToken');
    const sendArticle = {
      ...data,
      tagList: [...tagsList.map(tag => tag.val)],
    };
    const sendArticlePut = {
      ...data,
      tagList: [...articleData.newTags.map((tag: { val: string; }) => tag.val)],
      slug: articleData.slug,
    };
    if (isEdit) {
      dispatch(updateArticle(sendArticlePut, userToken));
      dispatch(isEditFalse());
    } else {
      dispatch(createArticle(sendArticle, userToken));
    }
    dispatch(getArticles(5));
    history.push('/articles');
  };

  const createTag = (val: string) => {
    if (val.length > 0) {
      const tag = {
        val, id: new Date().getTime(),
      };
      if (isEdit) {
        dispatch(addTagEdit(tag));
      } else {
        dispatch(addTag(tag));
      }
      setValue('');
    }
  };

  return isLogedIn 
    ? (
    <div className={classes.newarticle_wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.newarticle_form}>
        <p className={classes.newarticle_title}>
          { isEdit ? 'Edit article' : 'Create new article' }
        </p>
        <label className={classes.newarticle_label}>
          <span className={classes.label_title}>Title</span>
          <input 
          ref={register({ required: true })}
          name='title'
          value={isEdit ? titleValue : newArt.valTitle}
          onChange={(event) => isEdit 
            ? setTitleValue(event.target.value) 
            : setNewArt(prev => ({ ...prev, valTitle: event.target.value }))}
          className={classes.newarticle_input} 
          type="text"
          placeholder='Title' />
          { errors.title && <p className={classes.required}>Required</p> }
        </label>

        <label className={classes.newarticle_label}>
          <span className={classes.label_title}>Short description</span>
          <input 
          ref={register({ required: true })}
          name='description'
          value={isEdit ? descrValue : newArt.valDescr}
          onChange={(event) => isEdit 
            ? setDescrtValue(event.target.value)
            : setNewArt((prev) => ({ ...prev, valDescr: event.target.value }))
          }
          className={classes.newarticle_input} 
          type="text"
          placeholder='Short description' />
          { errors.description && <p className={classes.required}>Required</p> }
        </label>

        <label className={classes.newarticle_label}>
          <span className={classes.label_title}>Text</span>
          <textarea 
          ref={register({ required: true })}
          name='body'
          value={isEdit ? bodyValue : newArt.valBody}
          onChange={(event) => isEdit 
            ? setBodyValue(event.target.value)
            : setNewArt((prev) => ({ ...prev, valBody: event.target.value }))
          }
          placeholder='Text'
          className={classes.newarticle_textarea} />
          { errors.body && <p className={classes.required}>Required</p> }
        </label>

        <div className={classes.newarticle_tags}>
          <p className={classes.label_title}>Tags</p>
        <div className={classes.wr}>
          <div className={classes.tags_inputs}>
            { isEdit ? 
              articleData.newTags.map((tag: any) => (
              <div className={classes.addedtag_wrapper} key={tag.val}>
                <input 
                name='tag'
                className={classes.newarticle_tag} 
                value={tag.val}
                readOnly
                type="text"
                placeholder='Tag' />
                <button 
                className={classes.delete_tag} 
                type='button'
                onClick={() => dispatch(deleteTagEdit(tag.val))}
                >Delete</button>
              </div>
              ))
              : tagsList.map((tag) => (
              <div className={classes.addedtag_wrapper} key={tag.val}>
                <input 
                name='tag'
                className={classes.newarticle_tag} 
                value={tag.val}
                readOnly
                type="text"
                placeholder='Tag' />
                <button 
                className={classes.delete_tag} 
                type='button'
                onClick={() => dispatch(deleteTag(tag.id))}
                >Delete</button>
              </div>
              )) }
          </div>
          <div className={classes.add_tagg}>
          <input 
              name='tag'
              className={classes.newarticle_tag} 
              value={value}
              onChange={(event) => setValue(event.target.value)}
              type="text"
              placeholder='Tag' />
            <button
             className={classes.add_tag}
             type='button'
             onClick={() => createTag(value)}>Add tag</button>
          </div>
        </div>
        </div>

        <input type="submit" value='Send' className={classes.newarticle_submit}/>
      </form>
    </div>
    )
    : <Redirect to='/sign-in' />;
};

export default NewArticle;