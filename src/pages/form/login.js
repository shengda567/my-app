import React from "react";
import { Card, Form, Input, Button, message, Icon, Checkbox } from "antd";
const FormItem = Form.Item;
export default class FormLogin extends React.Component{

    handleSubmit = ()=>{
        const onFinish = values => {
            console.log('Received values of form: ', values);
        }
    }
       
    render(){
        return (
            <div>
                <Card title="" style={{marginTop:30}}>
                    <Form style={{width:500}}>
                        <FormItem
                        label="Username"
                        rules = {[
                            {
                                required:true,
                                message:'This option cannot be empty.'
                            },
                            {
                                min:0,max:10,
                                message:'Out of range'
                            },
                            {
                                pattern:new RegExp('^\\w+$','g'),
                                message:'Username must be words/numbers'
                            }
                        ]}>
                        <Input prefix={<Icon type="user"/>} placeholder="Pls enter UsrName" />
                        </FormItem>
                        <FormItem
                        label = "Password"
                        rules = {[]}> 
                        <Input prefix={<Icon type="lock" />} type="password" placeholder="Pls enter pwd" />
                        </FormItem>
                        <FormItem
                        lable = "remember"
                        initialValue = "true">
                        <Checkbox>Remember me</Checkbox>
                        <a href="#" style={{float:'right'}}>Forgot it?</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onFinish={this.handleSubmit}>Login</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
