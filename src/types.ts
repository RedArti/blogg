// eslint-disable-next-line import/no-cycle
import { GET_ARTICLES, GET_ARTICLE_DATA, GET_FAVORITE, CHANGE_PROFILE } from './redux/actionsTypes';

export type DataUserChange = { 
  email: string;
  image: string;
  password: string;
  username: string;
};

export type DataUserAuthorize = {
  email: string;
  password: string;
};
 
export type RegisteationUser = {
  username: string;
  email: string;
  password: string;
};

export type RegisretActionType = {
  type: string;
  isRegister: boolean;
};

export type ErrorActionType = {
  type: string;
  isError: boolean;
};

export type LoginActionType = {
  type: string;
  userData: LoginUserDataType;
  isLogedIn: boolean;
};

export type RegErrActionType = {
  type: string;
  payload: boolean;
};

export type NewArticleType = {
  body: string; 
  title: string; 
  description: string;
};

export type NewArticlePostType = {
  body: string; 
  title: string; 
  description: string;
  slug?: string;
  tagList: {
    val: string;
    id: number;
  }[];
};

export type GetAnotherSelfActionType = {
  type: string;
  dataArticle: GetSelfType;
};

export type AddTagType = {
  val: string;
  id: number;
};

export type AddTagActionType = {
  type: string;
  payload: AddTagType;
};

export type UserType = {
  email: string;
  id: string;
  token: string;
  username: string;
  image: string;
};

export type LoginUserDataType = {
  user: {
    email: string;
    id: string;
    token: string;
    username: string;
    image: string;
  },
};

export type ChangeProfileActionType = {
  type: typeof CHANGE_PROFILE;
  payload: LoginUserDataType;
};

export type GetSelfType = {
  article: {
    author: {
      username: string;
      image: string;
    },
    body: string;
    description: string;
    favoritesCount: number;
    slug: string;
    title: string;
    tagList: string[];    
  },
};

export type GetSelfActionType = {
  type: typeof GET_FAVORITE;
  payload: GetSelfType;
};

export type GetArticleDataType = {
  body: string; 
  title: string; 
  description: string;
  slug?: string;
  newTags: {
    val: string;
    id: number;
  }[];
};

export type GetArticlesDataActionType = {
  type: typeof GET_ARTICLE_DATA;
  payload: GetArticleDataType;
};

export type GetArticlesType = {
  articles: GetSelfType[];
};

export type GetArticlesActionType = {
  type: typeof GET_ARTICLES;
  dataArticles: GetArticlesType;
};

export type DeleteTagActionType = {
  type: string;
  payload: number;
};

export type ActionsTypes = RegisretActionType | ErrorActionType | LoginActionType | RegErrActionType | 
GetAnotherSelfActionType | AddTagActionType| GetSelfActionType | GetArticlesDataActionType | GetArticlesActionType |
DeleteTagActionType | ChangeProfileActionType;