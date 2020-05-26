import { AuthActionTypes, BaseAction, bug } from './types';

export const LogInUser = (email: string, password: string) => async (
  dispatch: any
) => {
  fetch('http://localhost:1500/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.json();
      }
    })
    .then((data) => {
      localStorage.setItem('auth-token', data.token);
      dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: data.token });
      dispatch(LoadUser());
    })
    .catch(async (err) => {
      dispatch({ type: AuthActionTypes.LOGIN_FAIL });
    });
};

export const LoadUser = () => async (dispatch: any) => {
  var token: string = localStorage.getItem('auth-token') || '';

  dispatch({ type: AuthActionTypes.USER_LOADING });

  fetch('http://localhost:1500/users/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.json();
      }
    })
    .then((data) => {
      const { fname, lname, email, userId } = data;

      dispatch({
        type: AuthActionTypes.USER_LOADED,
        payload: { fname, lname, email, userId },
      });
    })
    .catch(async (err) => {
      var response = await err;
      console.log(response.msg);
      dispatch({ type: AuthActionTypes.AUTH_ERROR });
    });
};

export const LogoutUser = () => {
  return { type: AuthActionTypes.LOGOUT_SUCCESS };
};
