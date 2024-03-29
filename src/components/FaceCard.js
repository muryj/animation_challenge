//@flow
import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button} from 'react-native-elements'
import firebase from "react-native-firebase";
import {connect} from 'react-redux'
import {setUser, clearStore} from "../actions/userActions";

type Props = {};

class FaceCard extends Component<Props> {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.clearStore()
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.button}>
                        <Button
                            raised
                            buttonStyle={styles.innerButton}
                            icon={{name: 'fast-forward'}}
                            title='ANIMATIONS'
                            onPress={() => Actions.animations()}/>
                    </View>
                    <View style={styles.button}>
                        <Button
                            raised
                            buttonStyle={styles.innerButton}
                            icon={{name: 'people'}}
                            title='AUTHENTICATION'
                            onPress={() => Actions.authentication()}/>
                    </View>
                    <View style={styles.button}>
                        <Button
                            raised
                            buttonStyle={styles.innerButton}
                            icon={{name: 'code'}}
                            title='NATIVE MODULE'
                            onPress={() => Actions.nativeModule()}/>
                    </View>
                    <View style={styles.button}>
                        <Button
                            raised
                            buttonStyle={styles.innerButton}
                            icon={{name: 'flight'}}
                            title='PERFORMANCE'
                            onPress={() => Actions.performance()}/>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        flex: 1
    },
    button: {
        width: '80%',
        marginBottom: 20
    },
    innerButton: {
        justifyContent: 'flex-start',
        height: 60,
        backgroundColor: 'darkmagenta'
    },
    scrollView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
const mapDispatchToProps = {
    setUser,
    clearStore
};
export default connect(null, mapDispatchToProps)(FaceCard)
