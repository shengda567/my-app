import { Col, Row } from 'antd'
import React from 'react'
import './index.less'
import Util from '../../utils/utils'
//import axios from 
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
            //this.getWeatherAPIData();
        }, 1000)
    }
    // getWeatherAPIData() {

    // }
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
                    <Col span='4' className='bread-title'>
                        <span>Then main page</span>
                    </Col>
                    <Col span='20' className='bread-weather'>
                        <span className='date'>{this.state.sysTime}</span>
                        <span className='weather-details'>sunny</span>
                    </Col>
                </Row>
            </div>
        );

    }
}