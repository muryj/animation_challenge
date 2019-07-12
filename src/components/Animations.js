//@flow
import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, Dimensions} from 'react-native';
import {Slider} from 'react-native-elements';

type Props = {};
export default class Animations extends Component<Props> {
    constructor() {
        super();
        this.squareAnimatedValue = new Animated.Value(-1);
        this.opacityValue = new Animated.Value(1);
        this.textAnimatedValues = [];
        this.sequence = [];
        this.deviceWidth = Dimensions.get('window').width;
        this.deviceHeight = Dimensions.get('window').height;
        this.state = {
            animationSpeed: 1000
        }
    }

    componentDidMount() {
        this.startAnimation()
    }

    componentDidUpdate(prevState) {
        if (prevState.animationSpeed !== this.state.animationSpeed) {
            this.refreshAnimation();
        }
    }

    refreshAnimation = () => {
        this.squareAnimatedValue.setValue(-1);
        this.opacityValue.setValue(1);
        this.textAnimatedValues.forEach(item => item.setValue(0));
        this.startAnimation();
    };

    startAnimation = () => {
        Animated.sequence([
            Animated.sequence([
                    Animated.timing(this.squareAnimatedValue, {
                        toValue: 0,
                        duration: this.state.animationSpeed,
                        useNativeDriver: true
                    }),
                    Animated.timing(this.opacityValue, {
                        toValue: 0,
                        duration: this.state.animationSpeed,
                        useNativeDriver: true
                    }),
                ]
            ),
            Animated.parallel(this.sequence),
            Animated.sequence([
                    Animated.parallel([
                        Animated.timing(this.opacityValue, {
                            toValue: 1,
                            duration: this.state.animationSpeed,
                            useNativeDriver: true
                        }),
                        Animated.timing(this.squareAnimatedValue, {
                            toValue: 1,
                            duration: this.state.animationSpeed,
                            useNativeDriver: true
                        })
                    ])
                ]
            )
        ]).start()
    };

    renderText = (str) => {
        const arrayOfSymbols = str.split('');
        const space = arrayOfSymbols.indexOf(' ');
        const outputText = {beforeSpace: [], afterSpace: []};
        const position = (index, outputRange) => {
            return {
                transform: [
                    {
                        translateY: this.textAnimatedValues[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, outputRange]
                        })
                    },
                    {
                        rotate: this.textAnimatedValues[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', `${Math.random() * 360}deg`]
                        })
                    },
                ]
            };
        };

        arrayOfSymbols.forEach((el, index) => {
            this.textAnimatedValues.push(new Animated.Value(0));
            this.sequence.push(
                Animated.timing(this.textAnimatedValues[index], {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                    delay: index * 70
                }));
            outputText.beforeSpace.push(
                <View
                    key={index}
                >
                    {index < space ? <Animated.Text
                        style={[position(index, 70), styles.text]}
                    >{el}</Animated.Text> : null}</View>
            );
            outputText.afterSpace.push(
                <View
                    key={index}
                >
                    {index > space ? <Animated.Text
                        style={[position(index, 55), styles.text]}
                    >{el}</Animated.Text> : null}</View>
            );
        });
        return outputText;
    };

    render() {
        const position = {
            transform: [
                {
                    translateX: this.squareAnimatedValue.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: [0, this.deviceWidth / 2 - this.deviceWidth / 4, this.deviceWidth - this.deviceWidth / 2]
                    })
                },
                {
                    translateY: this.squareAnimatedValue.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: [0, this.deviceHeight / 2 - this.deviceHeight / 10 - 30, 0]
                    })
                },
                {
                    scaleX: this.squareAnimatedValue.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: [0, 1, 0]
                    })
                },
                {
                    scaleY: this.squareAnimatedValue.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: [0, 1, 0]
                    })
                },
                {
                    rotate: this.squareAnimatedValue.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: ['0deg', '360deg', '0deg']
                    })
                }
            ]
        };
        const text = this.renderText('Animation Challenge');
        return (
            <View style={styles.container}>
                <Animated.View
                    style={[styles.animatedElement, position, {opacity: this.opacityValue}]}
                >
                </Animated.View>
                <Animated.View
                    style={[styles.animatedElementForText, position]}
                >
                    <View>
                        <View style={styles.row}>{text.beforeSpace}</View>
                        <View style={styles.row}>{text.afterSpace}</View>
                    </View>

                </Animated.View>
                <View
                    style={{
                        width: '100%',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: 0,
                    }}>
                    <Slider
                        value={this.state.animationSpeed}
                        thumbTintColor={'orange'}
                        minimumValue={100}
                        maximumValue={2000}
                        step={1}
                        onSlidingComplete={value => this.setState({animationSpeed: value})}
                    />
                    <Text>Duration: {this.state.animationSpeed}</Text>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        flex: 1
    },
    animatedElement: {
        opacity: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        width: '50%',
        height: '20%',
        backgroundColor: 'orange',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: 'white',
        overflow: 'hidden'
    },
    animatedElementForText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        width: '50%',
        height: '20%',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: 'white',
        overflow: 'hidden'
    },
    row: {
        flexDirection: 'row'
    },
    text: {
        color: 'orange',
    }
});
