import React from "react";
import {
  Card,
  Button,
  Form,
  Input,
  Select,
  Radio,
  Modal,
  DatePicker,
} from "antd";
import axios from "../../axios/index";
import Utils from "../../utils/utils";
import ETable from "../../components/ETable/index";
import Moment from "moment";
import Axios from "axios";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
export default class User extends React.Component {
  state = {
    list: [],
  };

  params = {
    page: 1,
  };

  requestList = async () => {
    await Axios.get("http://localhost:3001/employees").then((res) => {
      this.setState({
        list: res.data.map((item, index) => {
          item.key = index;
          return item;
        }),
      });
    });
  };

  componentDidMount() {
    this.requestList();
    this.getData();
  }

  getData = async () => {
    const data = await Axios.get("http://localhost:3001/employees");
    console.log(data);
  };

  // 操作员工
  handleOperator = (type) => {
    let item = this.state.selectedItem;
    if (type == "create") {
      this.setState({
        title: "Create",
        isVisible: true,
        type,
      });
    } else if (type == "edit" || type == "detail") {
      if (!item) {
        Modal.info({
          title: "Notification",
          content: "Please select one user",
        });
        return;
      }
      this.setState({
        title: type == "edit" ? "Edit" : "More info",
        isVisible: true,
        userInfo: item,
        type,
      });
    } else if (type == "delete") {
      if (!item) {
        Modal.info({
          title: "Notification",
          content: "Please select one user",
        });
        return;
      }
      Utils.ui.confirm({
        text: "Ready to delete the user?",
        onOk: () => {
          axios
            .ajax({
              url: "/user/delete",
              data: {
                params: {
                  id: item.id,
                },
              },
            })
            .then((res) => {
              if (res.code == 0) {
                this.setState({
                  isVisible: false,
                });
                this.requestList();
              }
            });
        },
      });
    }
  };

  handleSubmit = () => {
    let type = this.state.type;
    let data = this.userForm.props.form.getFieldsValue();
    axios
      .ajax({
        url: type == "create" ? "/user/add" : "/user/edit",
        data: {
          params: {
            ...data,
          },
        },
      })
      .then((res) => {
        if (res.code == 0) {
          this.setState({
            isVisible: false,
          });
          this.requestList();
        }
      });
  };

  handleSearch = () => {
    let formInfo = this.refs.searchEmployees.getFieldsValue();
    console.log(JSON.stringify(formInfo));
    this.search(formInfo.username, formInfo.status);
  };

  search = async (username, status) => {
    await Axios.post("http://localhost:3001/employees", {
      username: username,
      status: status,
    }).then((res) => {
      console.log(res);
      let list = res.data.map((item, index) => {
        item.key = index;
        return item;
      });
      this.setState({
        list: list,
        // pagination: Utils.pagination(res, (current) => {
        //   _this.params.page = current;
        //   _this.requestList();
        // }),
      });
    });
  };

  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "_id",
      },
      {
        title: "UserName",
        dataIndex: "username",
      },
      {
        title: "Sex",
        dataIndex: "gender",
        render(sex) {
          return sex == "male" ? "M" : "F";
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        render(state) {
          return state;
        },
      },
      {
        title: "Hobby",
        dataIndex: "hobby",
        render(interest) {
          return interest;
        },
      },
      {
        title: "Marriage",
        dataIndex: "marriage",
        render(isMarried) {
          return isMarried ? "Maiired" : "Not Married";
        },
      },
      {
        title: "Birthday",
        dataIndex: "birthday",
      },
      {
        title: "Address",
        dataIndex: "address",
      },
    ];
    return (
      <div>
        <Card style={{ width: 1400 }}>
          <Form layout="inline" ref="searchEmployees">
            <FormItem label="Username" name="username" style={{ width: 200 }}>
              <Input placeholder="Please enter username:" />
            </FormItem>
            <FormItem
              label="Status"
              style={{ width: 200 }}
              name="status"
              placeholder="All"
            >
              <Select placeholder="All">
                <Option value="">All</Option>
                <Option value="employee">Employee</Option>
                <Option value="manager">Manager</Option>
                <Option value="engineer">Engineer</Option>
                <Option value="entrepreneur">Entrepreneur</Option>
                <Option value="administrator">Administrator</Option>
              </Select>
            </FormItem>

            <FormItem style={{ width: 80 }}>
              <Button type="primary" onClick={this.handleSearch}>
                Search
              </Button>
            </FormItem>
          </Form>
        </Card>
        <Card style={({ marginTop: 10 }, { width: 1400 })}>
          <Button type="primary" onClick={() => this.handleOperator("create")}>
            Create
          </Button>
          <Button onClick={() => this.handleOperator("edit")}>Edit</Button>
          <Button onClick={() => this.handleOperator("detail")}>Info</Button>
          <Button type="danger" onClick={() => this.handleOperator("delete")}>
            Delete
          </Button>
        </Card>
        <div className="content-wrap">
          <ETable
            columns={columns}
            selectedRowKeys={this.state.selectedRowKeys}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          width={800}
          onCancel={() => {
            this.userForm.props.form.resetFields();
            this.setState({
              isVisible: false,
              userInfo: "",
            });
          }}
        >
          <UserForm
            userInfo={this.state.userInfo}
            type={this.state.type}
            wrappedComponentRef={(inst) => (this.userForm = inst)}
          />
        </Modal>
      </div>
    );
  }
}
class UserForm extends React.Component {
  getState = (state) => {
    return {
      1: "Entrepreneur",
      2: "Employee",
      3: "Engineer",
      4: "Manager",
      5: "Administrator",
    }[state];
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    const userInfo = this.props.userInfo || {};
    const type = this.props.type;
    return (
      <Form layout="horizontal">
        <FormItem label="Name" {...formItemLayout}>
          {userInfo && type == "detail"
            ? userInfo.username
            : getFieldDecorator("user_name", {
                initialValue: userInfo.username,
              })(<Input type="text" placeholder="Please enter name:" />)}
        </FormItem>
        <FormItem label="Sex" {...formItemLayout}>
          {userInfo && type == "detail"
            ? userInfo.sex == 1
              ? "M"
              : "F"
            : getFieldDecorator("sex", {
                initialValue: userInfo.sex,
              })(
                <RadioGroup>
                  <Radio value={1}>M</Radio>
                  <Radio value={2}>F</Radio>
                </RadioGroup>
              )}
        </FormItem>
        <FormItem label="Status" {...formItemLayout}>
          {userInfo && type == "detail"
            ? this.getState(userInfo.state)
            : getFieldDecorator("state", {
                initialValue: userInfo.state,
              })(
                <Select>
                  <Option value={1}>Entrepreneur</Option>
                  <Option value={2}>Employee</Option>
                  <Option value={3}>Engineer</Option>
                  <Option value={4}>Manager</Option>
                  <Option value={5}>Administrator</Option>
                </Select>
              )}
        </FormItem>
        <FormItem label="Birthday" {...formItemLayout}>
          {userInfo && type == "detail"
            ? userInfo.birthday
            : getFieldDecorator("birthday", {
                initialValue: Moment(userInfo.birthday),
              })(<DatePicker />)}
        </FormItem>
        <FormItem label="Address" {...formItemLayout}>
          {userInfo && type == "detail"
            ? userInfo.address
            : getFieldDecorator("address", {
                initialValue: userInfo.address,
              })(
                <Input.TextArea rows={3} placeholder="Please enter address:" />
              )}
        </FormItem>
      </Form>
    );
  }
}
