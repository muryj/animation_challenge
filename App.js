//@flow
import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import FaceCard from './src/components/FaceCard'
import Animations from './src/components/Animations'
import Authentication from './src/components/Authentication'
import Performance from './src/components/Performance'
import NativeModule from './src/components/NativeModule'
import {Provider} from 'react-redux'
import {store} from './src/store/store.js';
import FireBase from './src/FireBase/firebase'

type Props = {};
export default class App extends Component<Props> {
    constructor() {
        super();
    }

    componentDidMount() {
        const fireBase = new FireBase();
    }


    render() {
        return (
            <Provider store={store}>
                <Router navigationBarStyle={{backgroundColor: 'grey'}}>
                    <Stack key="root">
                        <Scene key="faceCard" component={FaceCard} title="Initial"/>
                        <Scene key="animations" component={Animations} title="Animations" backButtonTextStyle/>
                        <Scene key="authentication" component={Authentication} title="Authentication"
                               backButtonTextStyle/>
                        <Scene key="performance" component={Performance} title="Performance" backButtonTextStyle/>
                        <Scene key="nativeModule" component={NativeModule} title="Native Module" backButtonTextStyle/>
                    </Stack>
                </Router>
            </Provider>
        )
    }
}
