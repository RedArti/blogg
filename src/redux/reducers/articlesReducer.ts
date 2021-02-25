import {
  GET_ARTICLES, GET_FAVORITE, NEXT_FIVE,
  IS_EDIT_TRUE, IS_SAME_FALSE, IS_SAME_TRUE,
  IS_EDIT_FALSE, GET_ARTICLE_DATA, DELETE_TAG_EDIT,
  ADD_TAG_EDIT,
} from '../actionsTypes';

type InitState = {
  data: any
  isLoaded: boolean
  isSame: boolean
  isEdit: boolean
  dataForEdit: any
};

type Actions = {
  type: string;
  dataArticles: [];
  payload: {
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
  };
};

const initialState: InitState = { 
  data: [],
  isLoaded: false,
  isSame: false,
  isEdit: false,
  dataForEdit: {
    newTags: [],
    slug: '',
  },
};

const articlesReducer = (state = initialState, actions: Actions ): InitState => {
  const { type, dataArticles, payload } = actions;
  
  switch (type) {
    case GET_ARTICLES:
      return { ...state, data: dataArticles, isLoaded: true };
    case GET_FAVORITE:
      return { 
        ...state,
        data: { 
          ...state.data, 
          articles: [ ...state.data.articles.map((el: any) => el.slug !== payload.slug ? el : payload) ], 
        },
      };
    case NEXT_FIVE:
      return { ...state, isLoaded: false };
    case IS_SAME_TRUE:
      return { ...state, isSame: true };
    case IS_SAME_FALSE:
      return { ...state, isSame: false };
    case IS_EDIT_TRUE:
      return { ...state, isEdit: true };
    case IS_EDIT_FALSE:
      return { ...state, isEdit: false };
    case GET_ARTICLE_DATA:
      return { ...state, dataForEdit: { ...payload } };
    case DELETE_TAG_EDIT:
      return { ...state, dataForEdit: { 
        ...state.dataForEdit, 
        newTags: state.dataForEdit.newTags.filter((tag: any) => tag.val !== payload) } };
    case ADD_TAG_EDIT:
      return { ...state, dataForEdit: {
        ...state.dataForEdit,
        newTags: state.dataForEdit.newTags.concat(payload) } };
    default:
      return state;
  }
};

export default articlesReducer;