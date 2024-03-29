import types from './types'
import * as firebase from 'react-native-firebase';
import 'firebase/firestore'

export const createUser = (email, password) => {
    const tmpString = email.split('@');
    const username = tmpString[0];
    return dispatch => {
        dispatch({type: types.SIGNUP_START});
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                createUserSuccess(dispatch, user)
            })
            .then(() => {
                const {currentUser} = firebase.auth();
                try {
                    const db = firebase.firestore();
                    db.collection("users").doc(`${currentUser.uid}`).set({
                        name_profile: username,
                        email,
                        username,
                        password,
                        userpic: 'https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png',
                    });
                } catch (error) {
                    alert(error);
                }
            })
            .catch(() => createUserFail(dispatch));
    };
};

const createUserSuccess = (dispatch, user) => {
    dispatch({
        type: types.SIGNUP_FINISHED,
        payload: user
    });
};

const createUserFail = dispatch => {
    dispatch({type: types.SIGNUP_ERROR});
};

export const loginUser = (email, password) => {
    return dispatch => {
        dispatch({type: types.LOGIN_START});
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => loginUserFail(dispatch));
    };
};

const loginUserFail = dispatch => {
    dispatch({type: types.LOGIN_ERROR});
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: types.LOGIN_FINISHED,
        payload: user
    });
};

export const logout = () => {
    return dispatch => {
        dispatch({type: types.LOGOUT_START});
        const loggedUser = firebase.auth();
        loggedUser
            .signOut()
            .then(() => logoutSuccess(dispatch))
            .catch(() => logoutFail(dispatch));
    }
};

const logoutSuccess = dispatch => {
    dispatch({type: types.LOGOUT_FINISHED});
};

const logoutFail = dispatch => {
    dispatch({type: types.LOGOUT_ERROR});
};


export const getUserData = () => {
    return dispatch => {
        dispatch({type: types.GET_USER_START});
        const {uid} = firebase.auth().currentUser;
        const db = firebase.firestore();
        const docRef = db.collection("users").doc(`${uid}`);
        docRef.get().then((doc) => {
            getUserSuccess(dispatch, doc.data());
        }).catch(() => {
            getUserFail(dispatch)
        });
    }
};

const getUserSuccess = (dispatch, data) => {
    dispatch({
        type: types.GET_USER_FINISHED,
        payload: data
    })
};
const getUserFail = dispatch => {
    dispatch({type: types.GET_USER_ERROR})
};

export const setUser = (user) => {
    return dispatch => {
        const {uid} = user;
        const db = firebase.firestore();
        const docRef = db.collection("users").doc(`${uid}`);
        docRef.get().then((doc) => {
            getUserSuccess(dispatch, doc.data());
        }).catch(() => {
            getUserFail(dispatch)
        });
        dispatch({type: types.SET_USER, payload: user})
    }
};

export const clearStore = () => {
    return dispatch => {
        dispatch({type: types.CLEAR_STORE})
    }
};
