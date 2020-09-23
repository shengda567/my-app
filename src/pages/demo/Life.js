import React from 'react'

export default class Life extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            count : 0
        }
    }
    render () {
        return <div style={{padding : 50}}>
            <p>生命周期介绍</p>
            <button onClick = {this.handleButton}>click on it</button>
            <button onClick = {this.handleButton2.bind(this)}>click on it</button>
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