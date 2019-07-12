import React from 'react'
import {View} from 'react-native'
import {BarChart, Grid} from 'react-native-svg-charts'
import {Text} from 'react-native-svg'

class BarChartVerticalWithLabels extends React.PureComponent {

    render() {

        const data = [120, 90, 140, 120, 100]
        const data2 = [80, 60, 110, 90, 80]

        const CUT_OFF = 20
        const Labels = ({x, y, bandwidth, data}) => (
            data.map((value, index) => (
                <Text
                    key={index}
                    x={x(index) + (bandwidth / 2)}
                    y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
                    fontSize={14}
                    fill={value >= CUT_OFF ? 'white' : 'black'}
                    alignmentBaseline={'middle'}
                    textAnchor={'middle'}
                >
                    {value}
                </Text>
            ))
        )

        return (
            <>
                <View style={{flexDirection: 'row', height: 350, paddingVertical: 16}}>
                    <BarChart
                        style={{flex: 1}}
                        data={data}
                        svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
                        contentInset={{top: 10, bottom: 10}}
                        spacing={0.2}
                        gridMin={0}
                    >
                        <Grid direction={Grid.Direction.HORIZONTAL}/>
                        <Labels/>
                    </BarChart>
                </View>
                <View style={{flexDirection: 'row', height: 350, paddingVertical: 16, marginTop:-300}}>
                    <BarChart
                        style={{flex: 1}}
                        data={data2}
                        svg={{fill: 'rgba(150, 20, 244, 0.6)'}}
                        contentInset={{top: 10, bottom: 10}}
                        spacing={0.2}
                        gridMin={0}
                    >
                        <Labels/>
                    </BarChart>
                </View>
            </>

        )
    }

}

export default BarChartVerticalWithLabels
