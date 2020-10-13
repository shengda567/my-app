import { Col, Row } from 'antd'
import React from 'react'
import './index.less'
import Util from '../../utils/util'
import axios from '../../axios'
import '../../style/common.less'
export default class Header extends React.Component {
    state = {}
    componentWillMount() {
        this.setState({
            userName: 'Klay'
        })
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
            this.getWeatherAPIData();
        }, 1000)
    }
    getWeatherAPIData() {
        axios.jsonp({
            url:"https://www.google.com/maps/search/?api=1&hoboken"

        })
    }
    render() {
        return (
            <div className='header'>
                <Row className='header-top'>
                    <Col span='24'>
                        <span>Welcome, {this.state.userName}</span>
                        <a href='#'>Exit</a>
                    </Col>
                    
                </Row>
                <Row className='bread'>
                    <Col span='2' className='bread-title'>
                        <span>Main page</span>
                    </Col>
                    <Col span='22' className='bread-weather'>
                        <sapn className='date'>{this.state.sysTime}</sapn>
                        <span className='weather-details'>Cloudy</span>
                    </Col>
                </Row>
            </div>
        );

    }
}