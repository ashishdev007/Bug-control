import { BaseAction, AuthActionTypes } from '../actions/types';

export interface UserType {
  userId: number | null;
  email: string;
  fname: string;
  lanme: string;
}

export interface stateType {
  isAuthenticated: boolean;
  loading: boolean;
  token: string | null;
  user: UserType | null;
  error: {
    source: string;
    data: any;
  };
}

const INITIAL_STATE: stateType = {
  isAuthenticated: false,
  loading: true,
  token: localStorage.getItem('auth-token'),
  user: null,
  error: {
    source: '',
    data: {},
  },
};

const authReducer = (state: stateType = INITIAL_STATE, action: BaseAction) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, token: action.payload };

    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.AUTH_ERROR:
    case AuthActionTypes.REGISTER_FAIL:
    case AuthActionTypes.LOGOUT_SUCCESS:
      localStorage.removeItem('auth-token');
      return { ...state, isAuthenticated: false, token: '', user: null };

    case AuthActionTypes.USER_LOADING:
      return { ...state, loading: true };

    case AuthActionTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: { ...action.payload },
      };

    default:
      return state;
  }
};

export default authReducer;
