import {
  HIDE_MODAL, SHOW_MODAL,
} from '../actionsTypes';

type Actions = {
  type: string;
};

type InitState = {
  showModal: boolean;
};

const initialState: InitState = {
  showModal: false,
};

const modalReducer = (state = initialState, actions: Actions) => {
  switch (actions.type) {
    case HIDE_MODAL:
      return { ...state, showModal: false };
    case SHOW_MODAL: 
      return { ...state, showModal: true };
    default:
      return state;
  }
};

export default modalReducer;