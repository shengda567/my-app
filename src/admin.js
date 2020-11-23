import { Col, Row } from "antd";
import React from "react";
import Header from "./components/Header"; //default find index.js
import Footer from "./components/Footer";
import NavLeft from "./components/NavLeft";
import "./style/common.less";
export default class Admin extends React.Component {
  render() {
    return (
      <Row className="container">
        <Col span="4" className="nav-left">
          <NavLeft/>
        </Col>
        <Col span="20" className="main">
          <Header/>
          <Row className="content">
            {this.props.children}
          </Row>
          <Footer/>
        </Col>
      </Row>
    );
  }
}
