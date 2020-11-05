import React from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../echartTheme'
// import echarts from 'echarts'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入饼图和折线图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
export default class Bar extends React.Component {

    state={}

    componentWillMount(){
        echarts.registerTheme('SharedBike',echartTheme);
    }

    getOption(){
        let option = {
            title: {
                text: 'Total order numbers'
            },
            tooltip : {
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
                    type: 'bar',
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

    render(){
        return (
            <div>
                <Card title="Bar Chart">
                    <ReactEcharts option={this.getOption()} theme="SharedBike" notMerge={true} lazyUpdate={true} style={{height: 500, width: 1400}} />
                </Card>

            </div> 
        );
    }
}