import types from '../actions/types';

const initialState = {
    errorLoging: '',
    errorCreating: '',
    loading: false,
    user: null
};
const auth = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGNUP_START:
            return {...state, ...initialState, loading: true};
        case types.SIGNUP_ERROR:
            return {...state, errorCreating: 'Creation failed! Please check the credentials!', loading: false};
        case types.SIGNUP_FINISHED:
            return {...state, loading: false, error: '', user: action.payload};
        case types.LOGIN_START:
            return {...state, ...initialState, loading: true};
        case types.LOGIN_ERROR:
            return {...state, errorLoging: 'Login failed! Please check the credentials!', loading: false};
        case types.LOGIN_FINISHED:
            return {...state, loading: false, error: '', user: action.payload};
        default:
            return state;
    }
};

export default auth;
