import React from "react";
import { Card, Button, Table, Form, Select, Modal, message } from "antd";
import axios from "./../../axios/index";
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
  }
  requestList = () => {
    let _this = this;
    axios
      .ajax({
        url: "/open_city",
        data: {
          params: {
            page: this.params.page,
          },
        },
      })
      .then((res) => {
        let list = res.result.item_list.map((item, index) => {
          item.key = index;
          return item;
        });
        this.setState({
          list: list,
          pagination: Utils.pagination(res, (current) => {
            _this.params.page = current;
            _this.requestList();
          }),
        });
      });
  };
  handleActivateCity = () => {
    this.setState({
      isShowActivateCity: true,
    });
  };
  render() {
    const columns = [
      {
        title: "City ID",
        dataIndex: "id",
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
          <FilterForm />
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
  render() {
    return (
      <Form layout="inline">
        <FormItem label="City" name="city_id">
          <Select style={{ width: 100 }} placeholder="All">
            <Option value="">All</Option>
            <Option value="1">Hoboken</Option>
            <Option value="2">Jersey City</Option>
            <Option value="3">New York</Option>
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
        <FormItem label="Franchisee authorization status" name="auth_status">
          <Select style={{ width: 140 }} placeholder="All">
            <Option value="">All</Option>
            <Option value="1">Authorized</Option>
            <Option value="2">Unauthorized</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ margin: "0 20px" }}>
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