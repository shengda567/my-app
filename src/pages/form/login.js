import React from "react";
import { Card, Form, Input, Button, message, Icon, Checkbox } from "antd";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { add_session } from "../../redux/action";

const FormItem = Form.Item;

class FormLogin extends React.Component {
  state = {
    userinfo: {},
  };
  componentDidMount() {
    //this.searchUser();
  }
  handleSubmit = async () => {
    let userInfo = this.refs.userForm.getFieldsValue();
    console.log(JSON.stringify(userInfo));

    await this.searchUser(userInfo.username, userInfo.password);
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     message.success(` Congrats, you have logged in.`);
    //   }
    // });
  };

  searchUser = async (username, password) => {
    await Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((res) => {
      const { dispatch } = this.props;
      dispatch(add_session(res.data.data));
      this.setState({
        userinfo: res.data.data,
      });
    });
  };
  render() {
    return (
      <div>
        <Card title="" style={{ marginTop: 30 }}>
          <Form style={{ width: 500 }} ref="userForm">
            <FormItem
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "This option cannot be empty.",
                },
                {
                  min: 0,
                  max: 10,
                  message: "Out of range",
                },
                {
                  pattern: new RegExp("^\\w+$", "g"),
                  message: "Username must be words/numbers",
                },
              ]}
            >
              <Input
                prefix={<Icon type="user" />}
                placeholder="Pls enter UsrName"
              />
            </FormItem>
            <FormItem name="password" label="Password" rules={[]}>
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="Pls enter pwd"
              />
            </FormItem>
            <FormItem name="remember" lable="remember" initialValue="true">
              <Checkbox>Remember me</Checkbox>
              <a href="#" style={{ float: "right" }}>
                Forgot it?
              </a>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.handleSubmit}>
                Login
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default connect()(FormLogin);
