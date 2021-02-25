enum ActionsTypesEmun {
  GetArticles = 'GET_ARTICLES',
  GetFavorite = 'GET_FAVORITE',
  NextFive = 'NEXT_FIVE',
  IsSameTrue = 'IS_SAME_TRUE',
  IsSameFalse = 'IS_SAME_FALSE',
  IsEditTrue = 'IS_EDIT_TRUE', 
  IsEditFalse = 'IS_EDIT_FALSE',
  GetArticleData = 'GET_ARTICLE_DATA',
  DeleteTagEdit = 'DELETE_TAG_EDIT',
  AddTagEdit = 'ADD_TAG_EDIT',
  Login = 'LOGIN',
  Register = 'REGISTER',
  Error = 'ERROR',
  Logout = 'LOGOUT',
  RegErr = 'REG_ERR',
  ChangeProfile = 'CHANGE_PROFILE',
  HideModal = 'HIDE_MODAL',
  ShowModal = 'SHOW_MODAL',
  GetSelf = 'GET_SELF',
  NoLoaded = 'NO_LOADED',
  AddTag = 'ADD_TAG',
  DeleteTag = 'DELETE_TAG',
  CleanTagList = 'CLEAN_TAGLIST',
}

// articleReducer actions types
export const GET_ARTICLES = ActionsTypesEmun.GetArticles;
export const GET_FAVORITE = ActionsTypesEmun.GetFavorite;
export const NEXT_FIVE = ActionsTypesEmun.NextFive;
export const IS_SAME_TRUE = ActionsTypesEmun.IsSameTrue;
export const IS_SAME_FALSE = ActionsTypesEmun.IsSameFalse;
export const IS_EDIT_TRUE = ActionsTypesEmun.IsEditTrue;
export const IS_EDIT_FALSE = ActionsTypesEmun.IsSameFalse;
export const GET_ARTICLE_DATA = ActionsTypesEmun.GetArticleData;
export const DELETE_TAG_EDIT = ActionsTypesEmun.DeleteTagEdit;
export const ADD_TAG_EDIT = ActionsTypesEmun.AddTagEdit;

// liginReducer actions types
export const LOGIN = ActionsTypesEmun.Login;
export const REGISTER = ActionsTypesEmun.Register;
export const ERROR = ActionsTypesEmun.Error;
export const LOGOUT = ActionsTypesEmun.Logout;
export const REG_ERR = ActionsTypesEmun.RegErr;
export const CHANGE_PROFILE = ActionsTypesEmun.ChangeProfile;

// modalReducer actions types
export const HIDE_MODAL = ActionsTypesEmun.HideModal;
export const SHOW_MODAL = ActionsTypesEmun.ShowModal;

// selfArticleReducer action types 
export const GET_SELF = ActionsTypesEmun.GetSelf;
export const NO_LOADED = ActionsTypesEmun.NoLoaded;

// tagsReducer action types
export const ADD_TAG = ActionsTypesEmun.AddTag;
export const DELETE_TAG = ActionsTypesEmun.DeleteTag;
export const CLEAN_TAGLIST = ActionsTypesEmun.CleanTagList;