import React from "react";
import {
  Card,
  Form,
  Button,
  Input,
  Checkbox,
  Radio,
  Select,
  Switch,
  DatePicker,
  Upload,
  Icon,
  message,
  InputNumber,
} from "antd";
import Axios from "axios";
import moment from "moment";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
export default class FormRegister extends React.Component {
  state = {};

  handleSubmit = async () => {
    let userInfo = this.refs.registerForm.getFieldsValue();
    console.log(JSON.stringify(userInfo));
    if (
      !userInfo.username ||
      !userInfo.password ||
      !userInfo.gender ||
      !userInfo.age ||
      !userInfo.status ||
      !userInfo.hobby ||
      !userInfo.marriage ||
      !userInfo.birthday ||
      !userInfo.address
    ) {
      message.error(
        `Sorry, you do not register successfully, you need fill all the input of the form.!`
      );
    } else {
      await Axios.post("http://localhost:3001/users", {
        username: userInfo.username,
        password: userInfo.password,
        gender: userInfo.gender,
        age: userInfo.age,
        status: userInfo.status,
        hobby: userInfo.hobby,
        marriage: userInfo.marriage,
        birthday: userInfo.birthday,
        address: userInfo.address,
      })
        .then((res) => {
          message.success(
            `${userInfo.username} Congrats, you have successfully registered!`
          );
        })
        .catch((e) => {
          message.error(`Sorry, something wrong, the errorr is ${e.message}!`);
        });
    }
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          userImg: imageUrl,
          loading: false,
        })
      );
    }
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: 24,
        xxl: 24,
      },
      wrapperCol: {
        xs: 24,
        xxl: 24,
      },
    };
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4,
        },
      },
    };
    const rowObject = {
      minRows: 4,
      maxRows: 6,
    };
    return (
      <div>
        <Card title="Register" style={{ width: 500 }}>
          <Form layout="horizontal" ref="registerForm">
            <FormItem
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "This part cannot be empty.",
                },
              ]}
            >
              <Input placeholder="Username" />
            </FormItem>

            <FormItem label="Password" name="password">
              <Input type="password" placeholder="Password" />
            </FormItem>

            <FormItem label="Sex" initialValue="1" name="gender">
              <RadioGroup>
                <Radio value="1">Male</Radio>
                <Radio value="2">Female</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="Age" name="age">
              <InputNumber />
            </FormItem>

            <FormItem label="Status" name="status" initialValue="2">
              <Select>
                <Option value="1">Manager</Option>
                <Option value="2">Emplyoee</Option>
                <Option value="3">Administrator</Option>
                <Option value="4">Entrepreneur</Option>
              </Select>
            </FormItem>

            <FormItem label="Hobby" name="hobby" initialValue="2">
              <Select mode="multiple">
                <Option value="1">Swimming</Option>
                <Option value="2">Basketball</Option>
                <Option value="3">Footbal</Option>
                <Option value="4">Running</Option>
                <Option value="5">Climbing</Option>
                <Option value="6">Cycling</Option>
              </Select>
            </FormItem>

            <FormItem label="Marriage" name="marriage" valuePropName="checked">
              <Switch />
            </FormItem>

            <FormItem label="Birthday" name="birthday">
              <DatePicker showTime format="MM-DD-YYYY" />
            </FormItem>

            <FormItem label="Address" name="address">
              <TextArea autosize={rowObject} />
            </FormItem>

            {/* <FormItem label="Image">
              <Upload
                listType="picture-card"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                onChange={this.handleChange}
              >
                {this.state.userImg ? (
                  <img src={this.state.userImg} />
                ) : (
                  <Icon type="plus" />
                )}
              </Upload>
            </FormItem> */}

            {/* <FormItem>
              <Checkbox>
                I have accepted <a href="#">Shared Bike Mngt Sys Agreement</a>
              </Checkbox>
            </FormItem> */}

            <FormItem>
              <Button type="primary" onClick={this.handleSubmit}>
                Register
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
