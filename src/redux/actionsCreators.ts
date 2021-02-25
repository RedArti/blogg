import { 
  AddTagActionType,
  AddTagType, DeleteTagActionType, ErrorActionType, 
  GetAnotherSelfActionType, GetArticleDataType, GetArticlesActionType, 
  GetArticlesDataActionType, GetArticlesType, GetSelfActionType, GetSelfType, 
  LoginActionType, LoginUserDataType, RegErrActionType, RegisretActionType,
} from '../types';
import { 
  ADD_TAG, ADD_TAG_EDIT, CHANGE_PROFILE, 
  CLEAN_TAGLIST, DELETE_TAG, DELETE_TAG_EDIT, 
  ERROR, GET_ARTICLES, GET_ARTICLE_DATA, 
  GET_FAVORITE, GET_SELF, HIDE_MODAL, IS_EDIT_FALSE, 
  IS_EDIT_TRUE, IS_SAME_FALSE, IS_SAME_TRUE, LOGIN, 
  LOGOUT, NEXT_FIVE, NO_LOADED, REGISTER, REG_ERR, SHOW_MODAL,
} from './actionsTypes';

// articlesReducer action creators
export const getArticlesData = (dataArticles: GetArticlesType): GetArticlesActionType => ({ type: GET_ARTICLES, dataArticles });
export const getFavorite = (payload: GetSelfType): GetSelfActionType => ({ type: GET_FAVORITE, payload });
export const nextFive = (): { type: typeof NEXT_FIVE } => ({ type: NEXT_FIVE });
export const isSameTrue = (): { type: typeof IS_SAME_TRUE } => ({ type: IS_SAME_TRUE });
export const isSameFalse = (): { type: typeof IS_SAME_FALSE } => ({ type: IS_SAME_FALSE });
export const isEditTrue = (): { type: typeof IS_EDIT_TRUE } => ({ type: IS_EDIT_TRUE });
export const isEditFalse = (): { type: typeof IS_EDIT_FALSE } => ({ type: IS_EDIT_FALSE });
export const getArticleData = (payload: GetArticleDataType): GetArticlesDataActionType => ({ type: GET_ARTICLE_DATA, payload });
export const deleteTagEdit = (payload: string) => ({ type: DELETE_TAG_EDIT, payload });
export const addTagEdit = (payload: AddTagType): AddTagActionType => ({ type: ADD_TAG_EDIT, payload });

// loginReducer action creators
export const logout = (): { type: typeof LOGOUT } => ({ type: LOGOUT });
export const register = (isRegister: boolean): RegisretActionType => ({ type: REGISTER, isRegister });
export const regErr = (payload: boolean): RegErrActionType => ({ type: REG_ERR, payload });
export const login = (userData: LoginUserDataType, isLogedIn: boolean): LoginActionType => ({ type: LOGIN, userData, isLogedIn });
export const error = (isError: boolean): ErrorActionType => ({ type: ERROR, isError });
export const changeProfile = (userData: LoginUserDataType) => ({ type: CHANGE_PROFILE, userData });

// modalReducer action creators
export const showModal = (): { type: typeof SHOW_MODAL } => ({ type: SHOW_MODAL });
export const hideModal = (): { type: typeof HIDE_MODAL } => ({ type: HIDE_MODAL });

// selfArticleReducer action creators
export const getSelf = (dataArticle: GetSelfType): GetAnotherSelfActionType => ({ type: GET_SELF, dataArticle });
export const noLoaded = (): { type: typeof NO_LOADED } => ({ type: NO_LOADED });

// tagsReducer action creators
export const addTag = (payload: AddTagType): AddTagActionType => ({ type: ADD_TAG, payload });
export const deleteTag = (payload: number): DeleteTagActionType => ({ type: DELETE_TAG, payload });
export const cleanTagList = (): { type: typeof CLEAN_TAGLIST } => ({ type: CLEAN_TAGLIST });