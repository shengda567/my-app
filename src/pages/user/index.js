import React from 'react'
import { Card, Button, Form, Input,Select,Radio, Modal, DatePicker } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'
import ETable from '../../components/ETable/index'
import Moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
export default class User extends React.Component{

    state = {
        list:[]
    }

    params = {
        page:1
    }

    requestList = ()=>{
        axios.ajax({
            url:'/user/list',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            let _this = this;
            this.setState({
                list:res.result.list.map((item,index)=>{
                    item.key=index
                    return item;
                }),
                pagination:Utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    componentDidMount(){
        this.requestList();
    }

    // 操作员工
    handleOperator = (type)=>{
        let item = this.state.selectedItem;
        if(type =='create'){
            this.setState({
                title:'Create',
                isVisible:true,
                type
            })
        }else if(type=="edit" || type=='detail'){
            if(!item){
                Modal.info({
                    title: 'Notification',
                    content: 'Please select one user'
                })
                return;
            }
            this.setState({
                title:type=='edit'?'Edit':'More info',
                isVisible:true,
                userInfo:item,
                type
            })
        }else if(type=="delete"){
            if(!item){
                Modal.info({
                    title: 'Notification',
                    content: 'Please select one user'
                })
                return;
            }
            Utils.ui.confirm({
                text:'Ready to delete the user?',
                onOk:()=>{
                    axios.ajax({
                        url:'/user/delete',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then((res)=>{
                        if(res.code ==0){
                            this.setState({
                                isVisible:false
                            })
                            this.requestList();
                        }
                    })
                }
            })
        }
    }

    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url:type == 'create'?'/user/add':'/user/edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res.code ==0){
                this.setState({
                    isVisible:false
                })
                this.requestList();
            }
        })
    }

    render(){
        const columns = [{
            title: 'id',
            dataIndex: 'id'
          }, {
            title: 'UserName',
            dataIndex: 'username'
          }, {
            title: 'Sex',
            dataIndex: 'sex',
            render(sex){
                return sex ==1 ?'M':'F'
            }
          }, {
            title: 'Status',
            dataIndex: 'state',
            render(state){
                let config = {
                    '1':'Entrepreneur',
                    '2':'Employee',
                    '3':'Engineer',
                    '4':'Manager',
                    '5':'Administrator'
                }
                return config[state];
            }
          },{
            title: 'Hobby',
            dataIndex: 'interest',
            render(interest){
                let config = {
                    '1':'Swimming',
                    '2':'Basketball',
                    '3':'Football',
                    '4':'Running',
                    '5':'Hiking',
                    '6':'Cycling',
                    '7':'Tennis',
                }
                return config[interest];
            }
          },{
            title: 'Marriage',
            dataIndex: 'isMarried',
            render(isMarried){
                return isMarried?'Maiired':'Not Married'
            }
          },{
            title: 'Birthday',
            dataIndex: 'birthday'
          },{
            title: 'Address',
            dataIndex: 'address'
          },
        ];
        return (
            <div>
                <Card style={{width:1400}}>
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="Please enter username:"/>
                        </FormItem>
                        <FormItem>
                            <Input type="password" placeholder="Please enter password:"/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary">Login</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card style={{marginTop:10},{width: 1400}} >
                    <Button type="primary"  onClick={()=>this.handleOperator('create')}>Create</Button>
                    <Button  onClick={()=>this.handleOperator('edit')}>Edit</Button>
                    <Button onClick={()=>this.handleOperator('detail')}>Info</Button>
                    <Button type="danger"  onClick={()=>this.handleOperator('delete')}>Delete</Button>
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
                    onCancel={()=>{
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible:false,
                            userInfo:''
                        })
                    }}
                >
                    <UserForm userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={(inst) => this.userForm = inst }/>
                </Modal>
            </div>
        );
    }
}
class UserForm extends React.Component{

    getState = (state)=>{
        return {
            '1':'Entrepreneur',
            '2':'Employee',
            '3':'Engineer',
            '4':'Manager',
            '5':'Administrator'
        }[state]
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const userInfo = this.props.userInfo || {};
        const type = this.props.type;
        return (
            <Form layout="horizontal">
                <FormItem label="Name" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.username:
                        getFieldDecorator('user_name',{
                            initialValue:userInfo.username
                        })(
                            <Input type="text" placeholder="Please enter name:"/>
                        )
                    }
                </FormItem>
                <FormItem label="Sex" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.sex==1?'M':'F':
                        getFieldDecorator('sex',{
                            initialValue:userInfo.sex
                        })(
                        <RadioGroup>
                            <Radio value={1}>M</Radio>
                            <Radio value={2}>F</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem label="Status" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?this.getState(userInfo.state):
                        getFieldDecorator('state',{
                            initialValue:userInfo.state
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
                    {
                        userInfo && type=='detail'?userInfo.birthday:
                        getFieldDecorator('birthday',{
                            initialValue:Moment(userInfo.birthday)
                        })(
                        <DatePicker />
                    )}
                </FormItem>
                <FormItem label="Address" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.address:
                        getFieldDecorator('address',{
                            initialValue:userInfo.address
                        })(
                        <Input.TextArea rows={3} placeholder="Please enter address:"/>
                    )}
                </FormItem>
            </Form>
        );
    }
}
