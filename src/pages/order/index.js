
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

  handleFilter = (params) => {
    this.params = params;
    this.requestList();
  };
  requestList = () => {
    let _this = this;
    axios
      .ajax({
        url: "/order/list",
        data: {
          params: {
              page:this.params.page
          }
        },
      })
      .then((res) => {
        let list = res.result.item_list.map((item, index) => {
          item.key = index;
          return item;
        });
        this.setState({
          list,
          pagination: Utils.pagination(res, (current) => {
            _this.params.page = current;
            _this.requestList();
          }),
        });
      });
  };
  // 订单结束确认
  handleConfirm = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: "Message",
        content: "Please select one order",
      });
      return;
    }
    axios
      .ajax({
        url: "/order/ebike_info",
        data: {
          params: {
            orderId: item.id,
          },
        },
      })
      .then((res) => {
        if (res.code === 0) {
          this.setState({
            orderInfo: res.result,
            orderConfirmVisble: true,
          });
        }
      });
  };

  // 结束订单
  handleFinishOrder = () => {
    let item = this.state.selectedItem;
    axios
      .ajax({
        url: "/order/finish_order",
        data: {
          params: {
            orderId: item.id,
          },
        },
      })
      .then((res) => {
        if (res.code === 0) {
          message.success("Order completed");
          this.setState({
            orderConfirmVisble: false,
          });
          this.requestList();
        }
      });
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
    window.open(`/#/common/order/detail/${item.id}`, "_blank");
  };
  render() {
    const columns = [
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
          <FilterForm />
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
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                },
              };
            }}
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
            <FormItem label="Battery" {...formItemLayout}>
              {this.state.orderInfo.battery + "%"}
            </FormItem>
            <FormItem label="Start Time" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="Current Location" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
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
        <FormItem label="Order Time">
          <DatePicker name="start_time" showTime format="YYYY-MM-DD HH:mm:ss"/>
        </FormItem>
        <FormItem>
        <DatePicker name="End_time" showTime format="YYYY-MM-DD HH:mm:ss"/>
        </FormItem>
        <FormItem label="Order status" name="auth_status">
          <Select style={{ width: 140 }} placeholder="All">
            <Option value="">All</Option>
            <Option value="1">Riding</Option>
            <Option value="2">Locked</Option>
            <Option value="3">Completed</Option>
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

