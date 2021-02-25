import {
  GET_SELF, NO_LOADED,
} from '../actionsTypes';

type InitState = {
  isLoaded: boolean;
  article: any;
};

type Actions = {
  type: string;
  dataArticle: {};
};

const initState: InitState = {
  isLoaded: false,
  article: null,
};

const selfArticleReducer = ( state = initState, actions: Actions ): InitState => {
  const { type, dataArticle } = actions;
  
  switch (type) {
    case GET_SELF:
      return { ...state, article: dataArticle, isLoaded: true };    
    case NO_LOADED:
      return { ...state, isLoaded: false };
    default:
      return state;
  }
};

export default selfArticleReducer;