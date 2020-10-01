import React from 'react'
import './life.less'
import 'antd/dist/antd.css'
import { Button, Input } from 'antd'

export default class Life extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            count : 0
        }
    }
    render () {
        return <div className="content">
            <p>生命周期介绍<Input></Input></p>
            <Button onClick = {this.handleButton}>click on it</Button>
            <button onClick = {this.handleButton2.bind(this)}>click on it</button>
            <button>antD button</button>
            <p>{this.state.count }</p>
        </div>
    }
    handleButton = () => {
        this.setState({
            count : this.state.count + 1
        })
    }
    handleButton2() {
        this.setState({
            count : this.state.count + 1
        })
    }
}