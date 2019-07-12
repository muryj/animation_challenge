//@flow
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Image, TouchableOpacity, Text, ActivityIndicator, Animated} from 'react-native';
import {Input, Icon} from 'react-native-elements'
import {connect} from 'react-redux';
import images from '../images'
import {createUser, loginUser, logout} from "../actions/userActions";
import * as firebase from 'firebase';
import 'firebase/firestore';

type Props = {};

class Authentication extends Component<Props> {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            signUp: false,
            userData: null
        };
        this.animatedImage = new Animated.Value(0);
    }

    logoAnimation = () => {
        Animated.timing(this.animatedImage, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            this.getUserDataFromFireBase()
        })
    };

    componentDidUpdate() {
        if (this.props.auth.user) {
            this.logoAnimation();
        }
    }

    getUserDataFromFireBase = () => {
        const {uid} = firebase.auth().currentUser || '';
        const db = firebase.firestore();
        const docRef = db.collection("users").doc(`${uid}`);
        docRef.get().then(doc => {
            if (doc.exists) {
                this.setState({...this.state, userData: doc.data()})
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };

    render() {
        const {loading, user} = this.props.auth;
        const imagePosition = {
            transform: [
                {
                    scaleX: this.animatedImage.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 3]
                    })
                },
                {
                    scaleY: this.animatedImage.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 3]
                    })
                },
            ]
        };
        return (
            <View style={styles.container}>
                {loading ? <ActivityIndicator size="large" color="#0000ff"/> :
                    <View style={styles.authContainer}>
                        <Animated.View style={[styles.avatar, imagePosition]}>
                            <Image source={user ? images.user : images.lock} style={styles.avatarImage}/>
                        </Animated.View>
                        {this.state.userData ? <Text>{this.state.userData.username}</Text> : null}
                        {!user ? <>
                            <TextInput style={styles.textInput}
                                       value={this.state.email}
                                       onChangeText={text => this.setState({...this.state, email: text})
                                       }
                                       placeHolder='email'
                                       autoCapitalize='none'/>
                            < TextInput style={styles.textInput}
                                        value={this.state.password}
                                        onChangeText={text => this.setState({...this.state, password: text})}
                                        placeHolder='password'
                                        secureTextEntry={true}
                                        autoCapitalize='none'
                            />
                            {this.state.signUp ?
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                    <TouchableOpacity
                                        onPress={() => this.props.createUser(this.state.email, this.state.password)}><Text>Sign
                                        Up</Text></TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.setState({
                                            email: '',
                                            password: '',
                                            signUp: !this.state.signUp
                                        })}><Text>Already
                                        registered?</Text></TouchableOpacity>
                                </View> :
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                    <TouchableOpacity
                                        onPress={() => this.props.loginUser(this.state.email, this.state.password)}><Text>Log
                                        in</Text></TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.setState({
                                            email: '',
                                            password: '',
                                            signUp: !this.state.signUp
                                        })}><Text>Register
                                        here</Text></TouchableOpacity>
                                </View>
                            }
                        </> : null}
                    </View>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {auth: state}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey'
    },
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%'
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 50,
        marginBottom: 10
    },
    avatarImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    textInput: {
        height: 30,
        backgroundColor: 'white',
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 20
    }
});
export default connect(mapStateToProps, {createUser, loginUser, logout})(Authentication)
