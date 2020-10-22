import React from 'react'
import {Card,Form,Button,Input,Checkbox,Radio,Select,Switch,DatePicker,TimePicker,Upload,Icon,message, InputNumber} from 'antd'
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
export default class FormRegister extends React.Component{

    state={}

    handleSubmit = ()=>{
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
        message.success(`${userInfo.userName} Congrats, you have successfully registered!`)
    }

    getBase64 = (img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg:imageUrl,
                loading: false,
            }));
        }
    }

    render(){
        const formItemLayout = {
            labelCol:{
                xs:24,
                xxl:24
            },
            wrapperCol:{
                xs:24,
                xxl:24
            }
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        const rowObject = {
            minRows: 4, maxRows: 6
        }
        return (
            <div>
                <Card title="Register">
                    <Form layout="horizontal" style = {{width: "800"}}>
                        <FormItem label="Username" 
                        rules = {[
                            {
                                required: true,
                                message: 'This part cannot be empty.'
                            }
                        ]}>
                        <Input placeholder="Username" />
                        </FormItem>

                        <FormItem label="Password" >
                        <Input type="password" placeholder="Password" />
                        </FormItem>

                        <FormItem label="Sex" initialValue = "1">
                        <RadioGroup>
                            <Radio value="1">Male</Radio>
                            <Radio value="2">Female</Radio>
                        </RadioGroup>
                        </FormItem>

                        <FormItem 
                        label="Age" 
                        initialValue="18">
                        <InputNumber  />
                        </FormItem>

                        <FormItem label="Status" initialValue = "2">
                        <Select>
                            <Option value="1">Manager</Option>
                            <Option value="2">Emplyoee</Option>
                            <Option value="3">Administrator</Option>
                            <Option value="4">Entrepreneur</Option>
                            </Select>
                        </FormItem>

                        <FormItem label="Hobby" initialValue = "2">
                        <Select mode="multiple">
                            <Option value="1">Swimming</Option>
                            <Option value="2">Basketball</Option>
                            <Option value="3">Footbal</Option>
                            <Option value="4">Running</Option>
                            <Option value="5">Climbing</Option>
                            <Option value="6">Cycling</Option>
                        </Select>
                        </FormItem>

                        <FormItem label="Marriage"initialValue ="true" valuePropName ='checked'>
                        <Switch/>
                        </FormItem>
                        <FormItem label="Birthday" initialValue= {moment('1900-08-08')}>
                        <DatePicker
                            showTime
                            format="MM-DD-YYYY HH:mm:ss" />
                        </FormItem>
                        <FormItem label="Address" initialValue ={"1 Castle Point,Hoboken,NJ 07030,US">
                        <TextArea autosize={rowObject}/>
                        </FormItem>

                        <FormItem label="Image" >
                        <Upload
                            listType="picture-card"
                            showUploadList={false}
                            action="//jsonplaceholder.typicode.com/posts/"
                            onChange={this.handleChange}>
                            {this.state.userImg?<img src={this.state.userImg}/>:<Icon type="plus"/>}
                        </Upload>       
                        </FormItem>

                        <FormItem >
                        <Checkbox>I have accepted <a href="#">Shared Bike Mngt Sys Agreement</a></Checkbox>
                        </FormItem>

                        <FormItem >
                            <Button type="primary" onClick={this.handleSubmit}>Register</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
