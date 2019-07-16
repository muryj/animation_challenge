//@flow
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements'
import 'firebase/firestore';
import {createUser, loginUser, getUserData} from "../actions/userActions.js";
import {connect} from 'react-redux';

type Props = {};

class InputForm extends Component<Props> {
    constructor() {
        super();
        this.state = {};
    }


    render() {
        const {email, password, onChangeText, toggleForm, signUp, createUser, loginUser, getUserData} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder='email'
                        containerStyle={styles.input}
                        inputContainerStyle={{borderBottomWidth: 0}}
                        leftIconContainerStyle={{marginRight: 10}}
                        value={email}
                        onChangeText={text => onChangeText(text, 'email')}
                        autoCapitalize='none'
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Input
                        containerStyle={styles.input}
                        inputContainerStyle={{borderBottomWidth: 0}}
                        leftIconContainerStyle={{marginRight: 10}}
                        value={password}
                        onChangeText={text => onChangeText(text, 'password')}
                        placeholder='password'
                        secureTextEntry={true}
                        autoCapitalize='none'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    {signUp ? <View style={{flexDirection: 'column', width: '100%'}}>
                            <View style={styles.buttonContainer}>
                                <Button
                                    raised
                                    buttonStyle={styles.innerButton}
                                    title='Sign Up'
                                    onPress={() => {
                                        createUser(email, password);
                                        getUserData();
                                    }}/>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    raised
                                    buttonStyle={styles.innerButton}
                                    title='Already registered?'
                                    onPress={toggleForm}/>
                            </View>
                        </View>
                        : <View style={{flexDirection: 'column', width: '100%'}}>
                            <View style={styles.buttonContainer}>
                                <Button
                                    raised
                                    buttonStyle={styles.innerButton}
                                    title='Sign In'
                                    onPress={() => {
                                        loginUser(email, password);
                                        getUserData();
                                    }}/>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    raised
                                    buttonStyle={styles.innerButton}
                                    title='Register here'
                                    onPress={toggleForm}/>
                            </View>
                        </View>
                    }
                </View>

            </View>
        )
    }
}

const mapDispatchToProps = {
    createUser,
    loginUser,
    getUserData
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'column',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: 'purple',
        borderRadius: 25,
        marginBottom: 20,
    },
    buttonContainer: {
        marginBottom: 10
    },
    innerButton: {
        height: 60,
        backgroundColor: 'darkmagenta'
    },
});

export default connect(null, mapDispatchToProps)(InputForm)
