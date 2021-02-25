import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HeartFilled } from '@ant-design/icons';
import { likePost } from '../../../redux/requests';
import { RootState } from '../../../redux/store';
import AcceptModal from '../AcceptModal';
import classes from './ArticlesItem.module.scss';
import hurt from './hurt.svg';
import { getArticleData, isEditTrue, isSameFalse, isSameTrue, showModal } from '../../../redux/actionsCreators';

type Props = {
  title: string;
  body: string;
  image: string;
  name: string;
  createdAt: string;
  tagList: string[];
  favoritesCount: number;
  slug: string;
  description: string;
};

const ArticlesItem = ({ title, body, image, name, createdAt, tagList, favoritesCount, slug, description }: Props) => {

  const isLoaded = useSelector((state: RootState) => state.selfArticleReducer.isLoaded);
  const username = useSelector((state: RootState) => state.loginReducer.userData.user.username);
  const isSame = useSelector((state: RootState) => state.articlesReducer.isSame);
  const token = useSelector((state: RootState) => state.loginReducer.userData.user.token);
  const showModall = useSelector((state: RootState) => state.modalReducer.showModal);
  const isLogedIn = useSelector<RootState>(state => state.loginReducer.isLogedIn);
  
  const dispatch = useDispatch();

  const isMyArticle = () => {
    if (name === username) {
      dispatch(isSameTrue());
    } else {
      dispatch(isSameFalse());
    }
  };

  const editArticle = () => {
    const newTags = tagList.map((val: string) => ({ val, id: new Date().getTime() }));
    const dataForEdit = {
      title, body, newTags, description, slug,
    };
    dispatch(getArticleData(dataForEdit));
    dispatch(isEditTrue());
  };

  const favoriteArticle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(likePost(slug, token));
  };

  const deleteArticlesItem = () => {
    dispatch(showModal());
  };

  const setDescr = (text: string) => 
    text.length > 100 ? text.slice(0, 100) : text;

  const getReleaseDate = (date: string) => {
    const newDate = new Date(date); 
    const options = { month: 'long', year: 'numeric', day: 'numeric' }; 
    return newDate.toLocaleDateString('en-US', options); 
  };

  const tagsList = (tags: string[]) => 
    tags.map(tag => <li key={tag} className={classes.tag_item}>{ tag }</li>);

  return (
    <li className={classes.article_item}>
        <div className={classes.article_item_block}>
            <div className={classes.left}>
                <p className={classes.title}>
                    <Link
                    to={`/articles/${slug}`}
                    onClick={isMyArticle}>{title}</Link>
                    { isLogedIn
                      ? <button 
                      type='button' 
                      className={classes.btn_like_active}
                      onClick={(event) => favoriteArticle(event)}>
                        <img src={hurt} alt="like" />
                        <span className={classes.likes_counter}>{favoritesCount}</span>
                      </button>
                      : <button 
                      type='button' 
                      disabled
                      className={classes.btn_like_disable}>
                        <HeartFilled />
                        <span className={classes.likes_counter}>{favoritesCount}</span>
                      </button>
                    }
                </p>
                <ul className={classes.tag_list}>
                    {tagsList(tagList)}
                </ul>   
                <p className={classes.descr}>{setDescr(description)}</p>
                <p className={classes.descr}>
                  { isLoaded && body }
                </p>
            </div>
            <div className={classes.right}>
                <div className={classes.right_info}>
                    <p className={classes.username}>{ name }</p>
                    <p className={classes.date}>{getReleaseDate(createdAt)}</p>
                </div>
                <img 
                className={classes.right_image} 
                src={!image || image.indexOf('facebook') !== -1 || image.indexOf('drive') !== -1
                  ? 'https://static.productionready.io/images/smiley-cyrus.jpg' : image } alt="avatar"/>
                { isSame && isLoaded && 
                  <div className={classes.article_btns}>
                    <button 
                    className={classes.delete_article} 
                    type='button'
                    onClick={deleteArticlesItem}>Delete</button>
                    { showModall && <AcceptModal slug={slug} /> }
                    <Link 
                    onClick={editArticle}
                    to={`/articles/${slug}/edit`}>
                      <button className={classes.edit_article} type='button'>Edit</button>
                    </Link>
                  </div> }
            </div>
        </div>
    </li>);
};

export default React.memo(ArticlesItem);