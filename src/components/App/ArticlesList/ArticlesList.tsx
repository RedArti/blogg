import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Spin } from 'antd';
import ArticleItem from '../ArticlesItem';
import classes from './ArticlesList.module.scss';
import { getArticles } from '../../../redux/requests';
import { RootState } from '../../../redux/store';
import 'antd/dist/antd.css';
import { nextFive, noLoaded } from '../../../redux/actionsCreators';

type Article = {
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  author: {
    image: string;
    username: string;
  };
  description: string;
  favorited: boolean;
  favoritesCount: number;
  tagList: string[];
  updatedAt: string;
};

const ArticlesList = () => {
  const data = useSelector((state: RootState) => state.articlesReducer.data.articles);
  const isLoaded = useSelector((state: RootState) => state.articlesReducer.isLoaded);
    
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getArticles(5));
  }, [dispatch]);

  useEffect(() => {
    dispatch(noLoaded());
  }, [dispatch]);

  const loadNextFive = (page: number): void => {
    dispatch(nextFive());
    dispatch(getArticles(5 * page));
  };


  const articleList = data && data.slice(-5).map((article: Article) => <ArticleItem 
    description={article.description}
    slug={article.slug}
    key={article.slug}
    title={article.title}
    body={article.body}
    image={article.author.image}
    name={article.author.username}
    createdAt={article.createdAt}
    tagList={article.tagList}
    favoritesCount={article.favoritesCount}/>);

  return (
      <div className={classes.article_wrapper}>
        <ul>
            { isLoaded 
              ? articleList 
              : <div className={classes.spin_wrapper}>
                    <Spin />  
                </div>}
        </ul>
        <div className={classes.pagination_wrapper}>
          <Pagination
          onChange={(page) => loadNextFive(page)} 
          defaultPageSize={5}
          total={25}
          showSizeChanger={false}/>
        </div>
      </div>);
};

export default React.memo(ArticlesList);