//@flow
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, Avatar, Overlay} from 'react-native-elements'
import * as firebase from 'react-native-firebase';
import 'firebase/firestore';
import {logout, getUserData} from "../actions/userActions.js";
import {connect} from 'react-redux';

type Props = {};

class InputForm extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            overlayShown: false,
            username: this.props.auth.userData.username
        };
    }


    onChangeText = (text) => {
        this.setState({username: text})
    };

    changeUserName = () => {
        const {currentUser} = firebase.auth();
        try {
            const db = firebase.firestore();
            db.collection("users").doc(`${currentUser.uid}`).update({
                username: this.state.username,
            }).then(() => {
                console.log('You successfully changed your username');
                this.props.getUserData()
            });
        } catch (error) {
            alert(error);
        }
    };

    render() {
        console.log(this.props.auth.userData.username);
        const {logout} = this.props;
        return (
            <View style={styles.container}>
                <Avatar
                    source={{
                        uri:
                            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    }}
                    showEditButton
                    size={200}
                    rounded
                    activeOpacity={0.7}
                    onEditPress={() => this.setState({overlayShown: !this.state.overlayShown})}
                />

                <Overlay
                    isVisible={this.state.overlayShown}
                    windowBackgroundColor="rgba(255, 255, 255, .5)"
                    overlayBackgroundColor="rgb(128,0,120)"
                    width='60%'
                    height='30%'
                    onBackdropPress={() => this.setState({overlayShown: !this.state.overlayShown})}
                >
                    <View style={{flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                            <Input
                                inputContainerStyle={{borderBottomWidth: 0}}
                                leftIconContainerStyle={{marginRight: 10}}
                                value={this.state.username}
                                onChangeText={text => this.onChangeText(text)}
                                placeholder='user name'
                                autoCapitalize='none'
                                leftIcon={
                                    <Icon
                                        name='user'
                                        size={24}
                                        color='white'
                                    />
                                }
                            />
                            <View style={{marginRight: 10}}>
                                <Icon
                                    raised
                                    name='check-circle'
                                    type='font-awesome'
                                    size={24}
                                    color='green'
                                    onPress={() => this.changeUserName()}/>
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                raised
                                buttonStyle={styles.innerButton}
                                title='Log Out'
                                onPress={logout}/>
                        </View>
                    </View>
                </Overlay>
                <Text style={styles.nickName}>{this.props.auth.userData.username}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nickName: {
        fontSize: 30,
        marginTop: 15
    },
    innerButton: {
        height: 50,
        backgroundColor: 'darkmagenta',
    },
    buttonContainer: {
        marginBottom: 10
    }
});

const mapDispatchToProps = {
    logout,
    getUserData
};


const mapStateToProps = (state) => {
    return {auth: state}
};


export default connect(mapStateToProps, mapDispatchToProps)(InputForm)
