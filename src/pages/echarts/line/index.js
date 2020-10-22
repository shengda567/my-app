import React from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../echartTheme'
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts'
// 引入饼图和折线图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
export default class Line extends React.Component {

    state = {}

    componentWillMount(){
        echarts.registerTheme('Imooc',echartTheme);
    }

    getOption() {
        let option = {
            title: {
                text: 'Total order numbers'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: [
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thr',
                    'Fri',
                    'Sat',
                    'Sun'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Order Volume',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ]
                }
            ]
        }
        return option;
    }

    getOption2() {
        let option = {
            title: {
                text: 'Total order numbers'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend:{
                data:['Hot Wheels','Matchbox']
            },
            xAxis: {
                data: [
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thr',
                    'Fri',
                    'Sat',
                    'Sun'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'HW order number',
                    type: 'line',
                    stack: 'Total Volume',
                    data: [
                        1200,
                        3000,
                        4500,
                        6000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name: 'Match order number',
                    type: 'line',
                    stack: 'Total volume',
                    data: [
                        1000,
                        2000,
                        5500,
                        6000,
                        8000,
                        10000,
                        12000
                    ]
                },
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="OptionA">
                    <ReactEcharts
                        option={this.getOption()}
                        theme="SharedBike"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                        height: 500,
                        width: 1400
                    }}/>
                </Card>
                <Card title="OptionB" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption2()}
                        theme="SharedBike"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                        height: 500
                    }}/>
                </Card>
            </div>
        );
    }
}