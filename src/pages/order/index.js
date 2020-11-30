import React from "react";
import {
  Card,
  Button,
  Table,
  Form,
  Select,
  Modal,
  DatePicker,
  message,
} from "antd";
import axios from "../../axios";
import Utils from "../../utils/utils";
import Axios from "axios";
import ETable from "./../../components/ETable";
// import BaseForm from "../../components/BaseForm";
const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends React.Component {
  state = {
    orderInfo: {},
    orderConfirmVisble: false,
  };
  params = {
    page: 1,
  };
  formList = [
    {
      type: "SELECT",
      label: "City",
      field: "city",
      placeholder: "All",
      initialValue: "1",
      width: 80,
      list: [
        { id: "0", name: "All" },
        { id: "1", name: "Hoboken" },
        { id: "2", name: "Jersey City" },
        { id: "3", name: "New York" },
      ],
    },
    {
      type: "Time",
    },
    {
      type: "SELECT",
      label: "Order status",
      field: "order_status",
      placeholder: "All",
      initialValue: "1",
      width: 80,
      list: [
        { id: "0", name: "All" },
        { id: "1", name: "Riding" },
        { id: "2", name: "End" },
      ],
    },
  ];
  componentDidMount() {
    this.requestList();
  }

  handleFilter = async (params) => {
    this.params = params;
    await this.requestList();
  };
  requestList = async () => {
    let _this = this;
    await Axios.get("http://localhost:3001/orders").then((res) => {
      let list = res.data.map((item, index) => {
        item.key = index;
        return item;
      });
      this.setState({
        list,
        // pagination: Utils.pagination(res, (current) => {
        //   _this.params.page = current;
        //   _this.requestList();
        // }),
      });
    });
  };
  // 订单结束确认
  handleConfirm = async () => {
    let item = this.state.selectedItem;
    console.log(item);
    if (!item) {
      Modal.info({
        title: "Message",
        content: "Please select one order",
      });
      return;
    }
    await Axios.post("http://localhost:3001/orders/complete", {
      _id: item._id,
      status: item.status,
    }).then((res) => {
      this.setState({
        orderInfo: res.data,
        orderConfirmVisble: true,
      });
    });
  };

  // 结束订单
  handleFinishOrder = () => {
    let item = this.state.selectedItem;

    message.success("Order completed");
    this.setState({
      orderConfirmVisble: false,
    });
    this.requestList();
  };
  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record,
    });
  };

  openOrderDetail = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: "Message",
        content: "Please select one order",
      });
      return;
    }
    this.props.history.push(`/common/order/detail/${item._id}`);
    //window.open(`/#/common/order/detail/${item._id}`, "_blank");
  };

  search = async (city_name, start_time, end_time, status) => {
    await Axios.post("http://localhost:3001/orders", {
      city_name: city_name,
      start_time: start_time,
      end_time: end_time,
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
        title: "City Name",
        dataIndex: "city_name",
      },
      {
        title: "Order number",
        dataIndex: "order_sn",
      },
      {
        title: "Bike number",
        dataIndex: "bike_sn",
      },
      {
        title: "User name",
        dataIndex: "user_name",
      },
      {
        title: "Phone number",
        dataIndex: "mobile",
      },
      {
        title: "Distance",
        dataIndex: "distance",
        render(distance) {
          return distance + " mile";
        },
      },
      {
        title: "Travel time",
        dataIndex: "total_time",
      },
      {
        title: "Status",
        dataIndex: "status",
      },
      {
        title: "Start time",
        dataIndex: "start_time",
      },
      {
        title: "End time",
        dataIndex: "end_time",
      },
      {
        title: "Order amount",
        dataIndex: "total_fee",
      },
      {
        title: "Paid",
        dataIndex: "user_pay",
      },
    ];
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: "radio",
      selectedRowKeys,
    };
    return (
      <div>
        <Card>
          <FilterForm onRef={this.onRef} search={this.search} />
          {/* <BaseForm formList={this.formList} filterSubmit={this.handleFilter} /> */}
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.openOrderDetail}>
            Order Status
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={this.handleConfirm}
          >
            Complete Order
          </Button>
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedIds={this.state.selectedIds}
            selectedItem={this.state.selectedItem}
            pagination={this.state.pagination}
            // rowSelection="checkbox"
          />
        </div>
        <Modal
          title="Complete Order"
          visible={this.state.orderConfirmVisble}
          onCancel={() => {
            this.setState({
              orderConfirmVisble: false,
            });
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form layout="horizontal">
            <FormItem label="Bike Number" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="Order Number" {...formItemLayout}>
              {this.state.orderInfo.order_sn}
            </FormItem>
            <FormItem label="Start Time" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="Order Status" {...formItemLayout}>
              {this.state.orderInfo.status}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
class FilterForm extends React.Component {
  handleSubmit = () => {
    let formInfo = this.refs.orderForm.getFieldsValue();
    console.log(JSON.stringify(formInfo));
    this.props.search(
      formInfo.city_name,
      formInfo.start_time.format("YYYY-MM-DD"),
      formInfo.end_time.format("YYYY-MM-DD"),
      formInfo.status
    );
  };
  render() {
    return (
      <Form layout="inline" ref="orderForm">
        <FormItem label="City" name="city_name">
          <Select style={{ width: 100 }} placeholder="All">
            <Option value="">All</Option>
            <Option value="hoboken">Hoboken</Option>
            <Option value="jersey city">Jersey City</Option>
            <Option value="princeton">Princeton</Option>
          </Select>
        </FormItem>
        <FormItem label="Order Time" name="start_time">
          <DatePicker name="start_time" showTime format="YYYY-MM-DD" />
        </FormItem>
        <FormItem name="end_time">
          <DatePicker name="end_time" showTime format="YYYY-MM-DD" />
        </FormItem>
        <FormItem label="Order status" name="status">
          <Select style={{ width: 140 }} placeholder="All">
            <Option value="">All</Option>
            <Option value="riding">Riding</Option>
            <Option value="locked">Locked</Option>
            <Option value="completed">Completed</Option>
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
