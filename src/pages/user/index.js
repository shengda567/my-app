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
import moment from "moment";
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
    console.log(item);
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
          content: "Please choose one item to delete.",
        });
        return;
      }
      let _this = this;
      Modal.confirm({
        title: "Confim to delete?",
        content: "You will delete the user you choose, right?",
        async onOk() {
          await Axios.post("http://localhost:3001/employees/delete", {
            id: item._id,
          }).then((res) => {
            _this.setState({
              isVisible: false,
            });
            _this.requestList();
          });
        },
      });
    }
  };

  handleSubmit = async () => {
    let type = this.state.type;
    let data = this.refs.userForm.myGetFieldsValue();
    console.log(JSON.stringify(data));

    if (type == "create") {
      await Axios.post("http://localhost:3001/employees/create", {
        username: data.username,
        status: data.status,
        gender: data.gender,
        hobby: data.hobby,
        marriage: data.marriage,
        birthday: data.birthday,
        address: data.address,
      }).then((res) => {
        this.setState({
          isVisible: false,
        });
        this.requestList();
        return;
      });
    } else if (type == "edit") {
      //console.log(data.birthday.format("YYYY-MM-DD"));
      //console.log(typeof data.birthday.format("YYYY-MM-DD"));
      await Axios.post("http://localhost:3001/employees/update", {
        username: data.username,
        status: data.status,
        gender: data.gender,
        hobby: data.hobby,
        marriage: data.marriage,
        birthday: data.birthday,
        address: data.address,
      }).then((res) => {
        this.setState({
          isVisible: false,
        });
        this.requestList();
        return;
      });
    } else if (type == "detail") {
      this.setState({
        isVisible: false,
      });
      this.requestList();
      return;
    } else if (type == "delete") {
    }
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
        title: "Gender",
        dataIndex: "gender",
        render(gender) {
          return gender == "male" ? "M" : "F";
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
          return isMarried == "married" ? "Married" : "Not Married";
        },
      },
      {
        title: "Birthday",
        dataIndex: "birthday",
        render(birthday) {
          return birthday;
        },
      },
      {
        title: "Address",
        dataIndex: "address",
        render(address) {
          return address;
        },
      },
    ];
    console.log(this.state);

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
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedItem={this.state.selectedItem}
            pagination={false}
          />
        </div>
        <Modal
          ref="Modal"
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          width={800}
          onCancel={() => {
            this.refs.userForm.myresetField();
            this.setState({
              isVisible: false,
              userInfo: "",
            });
          }}
        >
          <UserForm
            userInfo={this.state.userInfo}
            type={this.state.type}
            ref="userForm"
          />
        </Modal>
      </div>
    );
  }
}
class UserForm extends React.Component {
  myGetFieldsValue = () => {
    return this.refs.userForm.getFieldsValue();
  };
  myresetField = () => {
    this.refs.userForm.resetFields();
  };
  // getState = (state) => {
  //   return {
  //     1: "Entrepreneur",
  //     2: "Employee",
  //     3: "Engineer",
  //     4: "Manager",
  //     5: "Administrator",
  //   }[state];
  // };
  // getFormInitialValue = (type, userInfo) => {
  //   if (type == "create") {
  //     this.setState({
  //       formInitialValue: {},
  //     });
  //     return;
  //   } else if (type == "edit") {
  //     this.setState({
  //       formInitialValue: {
  //         username: userInfo.username,
  //         gender: userInfo.sex,
  //         status: userInfo.status,
  //         hobby: userInfo.hobby,
  //         marriage: userInfo.marriage,
  //         birthday: userInfo.birthday,
  //         address: userInfo.address,
  //       },
  //     });
  //     return;
  //   }
  // };
  render() {
    //const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    const userInfo = this.props.userInfo || {};
    const type = this.props.type;

    console.log(this.props);
    //this.getFormInitialValue(type, userInfo);
    return (
      <Form
        layout="horizontal"
        ref="userForm"
        // initialValues={{
        //   username: userInfo.username,
        //   gender: userInfo.gender,
        //   status: userInfo.status,
        //   birthday: userInfo.birthday,
        //   address: userInfo.address,
        // }}
      >
        <FormItem
          label="Name"
          name="username"
          initialValue={type == "create" ? "" : userInfo.username}
          {...formItemLayout}
        >
          {userInfo && type == "detail" ? (
            userInfo.username
          ) : (
            <Input type="text" placeholder="Please enter name:" />
          )}
        </FormItem>
        <FormItem
          label="Gender"
          name="gender"
          initialValue={type == "create" ? "" : userInfo.gender}
          {...formItemLayout}
        >
          {userInfo && type == "detail" ? (
            userInfo.gender
          ) : (
            <RadioGroup>
              <Radio value="male">M</Radio>
              <Radio value="female">F</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          label="Status"
          name="status"
          initialValue={type == "create" ? "" : userInfo.status}
          {...formItemLayout}
        >
          {userInfo && type == "detail" ? (
            userInfo.status
          ) : (
            <Select>
              <Option value="entrepreneur">Entrepreneur</Option>
              <Option value="employee">Employee</Option>
              <Option value="engineer">Engineer</Option>
              <Option value="manager">Manager</Option>
              <Option value="administrator">Administrator</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="Hobby"
          name="hobby"
          initialValue={type == "create" ? "" : userInfo.hobby}
          {...formItemLayout}
        >
          {userInfo && type == "detail" ? (
            userInfo.hobby
          ) : (
            <Input.TextArea rows={3} placeholder="Please enter your hobby:" />
          )}
        </FormItem>

        <FormItem
          label="Marriage"
          name="marriage"
          initialValue={type == "create" ? "" : userInfo.marriage}
          {...formItemLayout}
        >
          {userInfo && type == "detail" ? (
            userInfo.marriage
          ) : (
            <RadioGroup>
              <Radio value="married">Yes</Radio>
              <Radio value="not married">No</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          label="Birthday"
          name="birthday"
          //initialValue={type == "create" ? "" : userInfo.birthday}
          {...formItemLayout}
        >
          {userInfo && type == "detail" ? userInfo.birthday : <DatePicker />}
        </FormItem>
        <FormItem
          label="Address"
          name="address"
          initialValue={type == "create" ? "" : userInfo.address}
          {...formItemLayout}
        >
          {userInfo && type == "detail" ? (
            userInfo.address
          ) : (
            <Input.TextArea rows={3} placeholder="Please enter address:" />
          )}
        </FormItem>
      </Form>
    );
  }
}
