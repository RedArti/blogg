import {
  LOGIN, REGISTER, ERROR, LOGOUT,
  REG_ERR, CHANGE_PROFILE,
} from '../actionsTypes';

type Actions = {
  type: string,
  isRegister: boolean;
  isLogedIn: boolean;
  userData: any;
  isError: boolean;
  payload: boolean;
};

type InitState = {
  isLogedIn: boolean;
  isRegister: boolean;
  userData: { user: {
    email: string;
    id: string;
    token: string;
    username: string;
    image: string;
  }, username: string, image: string,  };
  isError: boolean;
  token: string;
  isRegError: boolean;
};

export type UserData = InitState['userData'];

export const initialState: InitState = {
  isLogedIn: false,
  isRegister: false,
  userData: {
    user: {
      email: '',
      id: '',
      token: '',
      username: '',
      image: '',
    },
    username: '',
    image: '',
  },
  isError: false,
  token: '',
  isRegError: false,
};

const loginReducer = ( state = initialState, actions: Actions ): InitState => {
  const { type, isRegister, isLogedIn, userData, isError, payload } = actions;

  switch (type) {
    case LOGIN:
      return { ...state, isLogedIn, userData, isError: false, token: userData.token };
    case REGISTER:
      return { ...state, isRegister, isLogedIn: true };
    case ERROR:
      return { ...state, isError };
    case LOGOUT: 
      return { ...state, userData: { ...state.userData }, isLogedIn: false, isRegister: false, isError: false  };
    case REG_ERR: 
      return { ...state, isRegError: payload };
    case CHANGE_PROFILE: 
      return { ...state, userData: 
        { ...userData, user: 
          { ...userData.user, 
            username: userData.user.username, 
            image: userData.user.image, 
            password: userData.user.password, 
            email: userData.user.email } } };
    default:
      return state;
  }
};

export default loginReducer;