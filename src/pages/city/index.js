import React from "react";
import { Card, Button, Table, Form, Select, Modal, message } from "antd";
import axios from "./../../axios/index";

import Axios from "axios";

import Utils from "./../../utils/utils";
const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component {
  params = {
    page: 1,
  };
  state = {
    list: [],
    isShowOpenCity: false,
  };
  componentDidMount() {
    this.requestList();
    this.getData();
  }

  getData = async () => {
    const data = await Axios.get("http://localhost:3001/city");
    console.log(data);
  };

  requestList = async () => {
    //let _this = this;
    // axios
    //   .ajax({
    //     url: "/city",
    //     data: {
    //       params: {

    //       },
    //     },
    //   })
    await Axios.get("http://localhost:3001/city").then((res) => {
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
  handleActivateCity = () => {
    this.setState({
      isShowActivateCity: true,
    });
  };

  handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    console.log(cityInfo);
    axios
      .ajax({
        url: "/city/open",
        data: {
          params: cityInfo,
        },
      })
      .then((res) => {
        if (res.code == "0") {
          message.success("开通成功");
          this.setState({
            isShowOpenCity: false,
          });
          this.requestList();
        }
      });
  };

  search = async (city_name, mode, op_mode, franchisee_name) => {
    await Axios.post("http://localhost:3001/city", {
      city_name: city_name,
      mode: parseInt(mode),
      op_mode: parseInt(op_mode),
      franchisee_name: franchisee_name,
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
        title: "City ID",

        dataIndex: "_id",
      },
      {
        title: "City Name",
        dataIndex: "city_name",
      },
      {
        title: "Usage Mode",
        dataIndex: "mode",
        render(mode) {
          return mode == 1 ? "DPZ" : "NPZ";
        },
      },
      {
        title: "Business Mode",
        dataIndex: "op_mode",
        render(op_mode) {
          return op_mode == 1 ? "Self-Op" : "Franchised";
        },
      },
      {
        title: "Franchisee authorization",
        dataIndex: "franchisee_name",
      },
      {
        title: "City Admins",
        dataIndex: "city_admins",
        render(arr) {
          return arr
            .map((item) => {
              return item.user_name;
            })
            .join(",");
        },
      },
      {
        title: "Activate Time",
        dataIndex: "open_time",
      },
      {
        title: "Update Time",
        dataIndex: "update_time",
        render: Utils.formateDate,
      },
      {
        title: "Operator",
        dataIndex: "sys_user_name",
      },
    ];
    return (
      <div>
        <Card>
          <FilterForm onRef={this.onRef} search={this.search} />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.handleActivateCity}>
            Activate City
          </Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          title="Activate City"
          visible={this.state.isShowActivateCity}
          onCancel={() => {
            this.setState({
              isShowActivateCity: false,
            });
          }}
          onOk={this.handleSubmit}
        >
          <ActivateCityForm
            wrappedComponentRef={(inst) => {
              this.cityForm = inst;
            }}
          />
        </Modal>
      </div>
    );
  }
}

class FilterForm extends React.Component {
  handleSubmit = () => {
    let formInfo = this.refs.addForm.getFieldsValue();
    console.log(JSON.stringify(formInfo));
    this.props.search(
      formInfo.city_name,
      formInfo.us_mode,
      formInfo.op_mode,
      formInfo.franchisee_name
    );
  };

  render() {
    return (
      <Form layout="inline" ref="addForm">
        <FormItem label="City" name="city_name">
          <Select style={{ width: 100 }} placeholder="All">
            <Option value="">All</Option>
            <Option value="Hoboken">Hoboken</Option>
            <Option value="Jersey City">Jersey City</Option>
            <Option value="New York">New York</Option>
          </Select>
        </FormItem>
        <FormItem label="Usage Mode" name="us_mode">
          <Select style={{ width: 220 }} placeholder="All">
            <Option value="">All</Option>
            <Option value="1">Designated Parking Zone</Option>
            <Option value="2">No Parking Zone</Option>
          </Select>
        </FormItem>
        <FormItem label="Business Mode" name="op_mode">
          <Select style={{ width: 140 }} placeholder="All">
            <Option value="">All</Option>
            <Option value="1">Self-operating</Option>
            <Option value="2">Franchised</Option>
          </Select>
        </FormItem>

        <FormItem
          label="Franchisee authorization status"
          name="franchisee_name"
        >
          <Select style={{ width: 140 }} placeholder="All">
            <Option value="">All</Option>
            <Option value="Lime1">Lime1</Option>
            <Option value="Lime2">Lime2</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            onClick={this.handleSubmit}
            style={{ margin: "0 20px" }}
          >
            Search
          </Button>
          <Button>Reset</Button>
        </FormItem>
      </Form>
    );
  }
}

class ActivateCityForm extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 19,
      },
    };
    return (
      <Form layout="horizontal">
        <FormItem
          label="Select city"
          {...formItemLayout}
          name="city_id"
          initialValue="1"
        >
          <Select style={{ width: 100 }}>
            <Option value="">All</Option>
            <Option value="1">Seattle</Option>
            <Option value="2">Qingdao</Option>
          </Select>
        </FormItem>
        <FormItem
          label="Business Mode"
          {...formItemLayout}
          name="op_mode"
          initialValue="1"
        >
          <Select style={{ width: 150 }}>
            <Option value="1">Self-operating</Option>
            <Option value="2">Franchised</Option>
          </Select>
        </FormItem>
        <FormItem
          label="Usage Mode"
          {...formItemLayout}
          name="use_mode"
          initialValue="1"
        >
          <Select style={{ width: 200 }}>
            <Option value="1">Designated Parking Zone</Option>
            <Option value="2">No Parking Zone</Option>
          </Select>
        </FormItem>
      </Form>
    );
  }
}
