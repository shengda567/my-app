import React from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../echartTheme'
import themeLight from '../themeLight'
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts'
// 引入饼图和折线图
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
export default class Bar extends React.Component {

    state = {}

    componentWillMount(){
        echarts.registerTheme('SharedBike',themeLight);
    }

    getOption() {
        let option = {
            title: {
                text: 'Total order number',
                x : 'center'
            },
            legend : {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['Mon','Tue','Wed','Thr','Fri','Sat','Sun']
            },
            tooltip: {
                trigger : 'item',
                formatter : "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name : 'Order volume',
                    type : 'pie',
                    radius : '55%',
                    center : [
                        '50%', '60%'
                    ],
                    data:[
                        {
                            value:1000,
                            name:'Mon'
                        },
                        {
                            value: 1000,
                            name: 'Tue'
                        },
                        {
                            value: 2000,
                            name: 'Wed'
                        },
                        {
                            value: 1500,
                            name: 'Thr'
                        },
                        {
                            value: 3000,
                            name: 'Fri'
                        },
                        {
                            value: 2000,
                            name: 'Sat'
                        },
                        {
                            value: 1200,
                            name: 'Sun'
                        },
                    ],
                    itemStyle : {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="Pie Chart">
                    <ReactEcharts
                        option={this.getOption()}
                        theme="Shared Bike"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{ height: 500, width: 1400}}/>
                </Card>
            </div>
        );
    }
}