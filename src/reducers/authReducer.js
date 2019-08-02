import types from "../actions/types";

const initialState = {
  errorLoging: "",
  errorCreating: "",
  errorGettingUser: "",
  errorLogout: "",
  loading: false,
  user: null,
  userData: null
};
const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_START:
      return { ...state, loading: true };
    case types.SIGNUP_ERROR:
      return {
        ...state,
        errorCreating: "Creation failed! Please check the credentials!",
        loading: false
      };
    case types.SIGNUP_FINISHED:
      return {
        ...state,
        loading: false,
        errorCreating: "",
        user: action.payload
      };
    case types.LOGIN_START:
      return { ...state, loading: true };
    case types.LOGIN_ERROR:
      return {
        ...state,
        errorLoging: "Login failed! Please check the credentials!",
        loading: false
      };
    case types.LOGIN_FINISHED:
      return {
        ...state,
        loading: false,
        errorLoging: "",
        user: action.payload
      };
    case types.LOGOUT_START:
      return { ...state, loading: true };
    case types.LOGOUT_ERROR:
      return { ...state, loading: false, errorLogout: "Error during logout" };
    case types.LOGOUT_FINISHED:
      return {
        ...state,
        userData: null,
        user: null,
        loading: false,
        errorLogout: ""
      };
    case types.GET_USER_START:
      return { ...state, loading: true };
    case types.GET_USER_ERROR:
      return {
        ...state,
        errorGettingUser: "Getting user failed!",
        loading: false
      };
    case types.GET_USER_FINISHED:
      return {
        ...state,
        loading: false,
        errorGettingUser: "",
        userData: action.payload
      };
    case types.SET_USER:
      return { ...state, user: action.payload };
    case types.CLEAR_STORE:
      return {
        errorLoging: "",
        errorCreating: "",
        errorGettingUser: "",
        errorLogout: "",
        loading: false,
        user: null,
        userData: null
      };
    default:
      return state;
  }
};

export default auth;
