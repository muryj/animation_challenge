//@flow
import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import InputForm from './InputForm'
import UserProfile from './UserProfile'
import {connect} from 'react-redux';

type Props = {};

class Authentication extends Component<Props> {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            signUp: false,
        };
    }

    onChangeText = (text, field) => {
        this.setState({[field]: text})
    };

    toggleForm = () => {
        this.setState({email: '', password: '', signUp: !this.state.signUp})
    };


    renderForm = () => {
        const {user} = this.props.auth;
        const {email, password, signUp} = this.state;
        if (user) {
            return (
                <UserProfile/>
            )
        }
        return (
            <InputForm email={email} password={password} onChangeText={this.onChangeText}
                       toggleForm={this.toggleForm} signUp={signUp}/>
        )

    };

    render() {
        const {loading} = this.props.auth;
        return (
            <View style={styles.container}>
                {loading ? <ActivityIndicator size="large" color="#0000ff"/> : this.renderForm()}
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
});
export default connect(mapStateToProps)(Authentication)
