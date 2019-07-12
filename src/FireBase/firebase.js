import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD0SEgnRbsTbhKmGWo5y0dp-S2QbTu3a_s",
    authDomain: "englishmaster-bd795.firebaseapp.com",
    databaseURL: "https://englishmaster-bd795.firebaseio.com",
    projectId: "englishmaster-bd795",
    storageBucket: "englishmaster-bd795.appspot.com",
    messagingSenderId: "1023951777549",
    appId: "1:1023951777549:web:03982cd6d43381a4"
};

export default class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }
}

