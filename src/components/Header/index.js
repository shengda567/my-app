import { Col, Row } from "antd";
import React from "react";
import "./index.less";
import Util from "../../utils/utils";
//import axios from
export default class Header extends React.Component {
  state = {};
  componentWillMount() {
    this.setState({
      userName: "Harry",
    });
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime());
      this.setState({
        sysTime,
      });
    }, 1000);
    this.getWeatherAPIData();
  }
  getWeatherAPIData() {
    fetch(
      "https://community-open-weather-map.p.rapidapi.com/weather?q=Jersey%20City",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "348941e64bmshd8e55394c556837p163ca2jsn7a67afb1fec3",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        let data = response.weather[0];
        this.setState({
          weather: data.main,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span="24">
            <span>Welcome, {this.state.userName}</span>
            <a href="#">Exit</a>
          </Col>
        </Row>
        <Row className="bread">
          <Col span="4" className="bread-title">
            <span>Home</span>
          </Col>
          <Col span="20" className="bread-weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-details">{this.state.weather}</span>
          </Col>
        </Row>
      </div>
    );
  }
}
