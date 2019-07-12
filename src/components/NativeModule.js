//@flow
import React, {Component} from "react";
import {
    StyleSheet,
    View,
    NativeModules,
    TouchableOpacity,
    Text,
    Image
} from "react-native";
import images from '../images'
import * as Animatable from 'react-native-animatable';

type Props = {};
export default class NativeModule extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {isOn: false};
        this.updateStatus();
    }

    componentDidUpdate() {
        if (this.animatedImage)
            this.animatedImage.startAnimation()
    }

    turnOn = () => {
        NativeModules.Bulb.turnOn();
        this.updateStatus()
    };
    turnOff = () => {
        NativeModules.Bulb.turnOff();
        this.updateStatus()
    };
    updateStatus = () => {
        NativeModules.Bulb.getStatus((error, isOn) => {
            this.setState({isOn: isOn});
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <Animatable.Image
                    animation="flash"
                    style={styles.lamp}
                    source={this.state.isOn ? images.lampOn : images.lampOf}
                    ref={lamp => this.animatedImage = lamp}
                />
                {this.state.isOn ?
                    <TouchableOpacity onPress={this.turnOff}>
                        <Text>Turn Off</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={this.turnOn}>
                        <Text>Turn On</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "grey",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lamp: {
        resizeMode: 'contain',
        width: 200,
        height: 250,
        position: 'absolute',
        top: 0,
    }
});
