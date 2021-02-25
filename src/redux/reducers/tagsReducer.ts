import {
  ADD_TAG, DELETE_TAG, CLEAN_TAGLIST,
} from '../actionsTypes';

type Actions = {
  type: string;
  payload: string;
};

type InitState = {
  tags: any[];
};

const initialState: InitState = {
  tags: [],
};

const tagsReducer = ( state = initialState, actions: Actions ) => {
  const { type, payload } = actions;
  switch (type) {
    case ADD_TAG:
      return { ...state, tags: [...state.tags, payload] }; 
    case DELETE_TAG:
      return { ...state, tags: state.tags.filter(tag => tag.id !== payload) };
    case CLEAN_TAGLIST: 
      return { ...state, tags: [] };
    default:
      return state;
  }

};

export default tagsReducer;