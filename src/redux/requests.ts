import { Dispatch } from 'redux';
import { ActionsTypes, DataUserAuthorize, DataUserChange, NewArticlePostType, RegisteationUser } from '../types';
import { changeProfile, error, getArticlesData, getFavorite, getSelf, login, regErr, register } from './actionsCreators';

export const getArticles = (num: number) => async (dispatch: Dispatch<ActionsTypes>) => {
  const body = await fetch(`https://conduit.productionready.io/api/articles?limit=${num}`);
  const res = await body.json();
  const result = await res;
  dispatch(getArticlesData(result));
};

export const getSelfArticle = (slug: string) => async (dispatch: Dispatch<ActionsTypes>) => {
  const body = await fetch(`https://conduit.productionready.io/api/articles/${slug}`);
  const res = await body.json();
  const result = await res;
  dispatch(getSelf(result));
};

export const registrationUser = (data: RegisteationUser) => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    const response = await fetch('https://conduit.productionready.io/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ 
        'user': {
          'username': data.username,
          'email': data.email,
          'password': data.password,
        },
      }),
    });
    const body = await response.json();
    const res = await body;

    if (res.errors ) {
      throw new Error('Not valid email or password');
    }
    dispatch(register(true));
    return res;
  } catch (err) {
    dispatch(regErr(true));
  }
  return null;
};

export const autorizationUser = (data: DataUserAuthorize) => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    const response = await fetch('https://conduit.productionready.io/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        'user': {
          'email': data.email,
          'password': data.password,
        },
      }),
    });

    const body = await response.json();
    const res = await body;
    localStorage.setItem('userToken', res.user.token);
    if (res.errors ) {
      throw new Error('Not valid email or password');
    }
    dispatch(login(res, true));
    return res;
  } catch {
    dispatch(error(true));
  }
  return null;
};

export const createArticle = (data: NewArticlePostType, token: string | null) => async () => {
  const response = await fetch('https://conduit.productionready.io/api/articles', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`, 
    },
    body: JSON.stringify({
      'article': {
        'title': data.title,
        'description': data.description,
        'body': data.body,
        'tagList': data.tagList,
      },
    }),
  });
  const body = await response.json();
  const res = await body;
  return res;
};

export const changeUserProfile = (data: DataUserChange, token: string | null) => async (dispatch: any) => {
  const reqBody = data.password.length >= 8
    ? {
      'user':{
        'email': data.email,
        'image': data.image,
        'password': data.password,
        'username': data.username,
      },
    } : {
      'user':{
        'email': data.email,
        'image': data.image,
        'username': data.username,
      },
    };
  const response = await fetch('https://conduit.productionready.io/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`, 
    },
    body: JSON.stringify(reqBody),
  });

  const body = await response.json();
  const res = await body;
  dispatch(changeProfile(res));
  return res;
};

export const deleteArticle = (slug: string, token: string) => async () => {
  const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`, 
    },
  });
  const body = response.json();
  const res = await body;
  return res;
};

export const updateArticle = (data: NewArticlePostType, token: string | null) => async () => {
  const response = await fetch(`https://conduit.productionready.io/api/articles/${data.slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`, 
    },
    body: JSON.stringify({
      'article': {
        'title': data.title,
        'body': data.body,
        'description': data.description,
        'tagList': data.tagList,
      },
    }),
  });
  const body = await response.json();
  const res = await body;
  return res;
};

export const likePost = (slug: string, token: string) => async (dispatch: Dispatch<ActionsTypes>) => {
  const response = await fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`, 
    },
  });
  const body = await response.json();
  const res = await body;
  dispatch(getFavorite(res.article));
  return res;
};