import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { getSelfArticle } from '../../../accets/requests/requests';
import { RootState } from '../../../redux/store';
import ArticlesItem from '../ArticlesItem';
import classes from './SelfItem.module.scss';

type Props = {
  slug: string
};

const ArticlesListItem = ({ slug }: Props) => {
  const dispatch = useDispatch();
  const article = useSelector((state: RootState) => state.selfArticleReducer.article?.article);
  const isLoaded = useSelector((state: RootState) => state.selfArticleReducer.isLoaded);
  useEffect(() => {
    dispatch(getSelfArticle(slug));
  }, [dispatch, slug]);

  return <>
  { isLoaded 
    ? <div className={classes.self_item}>
    <ArticlesItem 
    description={article.description}
    slug={article.slug}
    key={article.slug}
    title={article.title}
    body={article.body}
    image={article.author.image}
    name={article.author.username}
    createdAt={article.createdAt}
    tagList={article.tagList}
    favoritesCount={article.favoritesCount}/>
  </div> 
    : <div className={classes.spin_wrapper}>
    <Spin />  
    </div>}
  </>;
};

export default ArticlesListItem;