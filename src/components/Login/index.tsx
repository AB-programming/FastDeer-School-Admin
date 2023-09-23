import {AuthContext} from "../../hooks/useAuth";
import axios from "axios";
import {Button, Checkbox, Form, Input, notification} from 'antd';
import {useState} from "react";
import "./index.css"
import {FrownOutlined, SmileOutlined} from "@ant-design/icons";
import {FieldData} from "rc-field-form/lib/interface";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onFiledChange = (changeField: FieldData[]) => {
        if (changeField[0].name[0] === 'username') {
            setUsername(changeField[0].value)
        } else {
            setPassword(changeField[0].value)
        }
    }

    type FieldType = {
        username?: string;
        password?: string;
        remember?: boolean;
        login?: (token: string) => void
    };

    interface SchoolLoginResult {
        status: boolean,
        data: string
    }

    const [api, contextHolder] = notification.useNotification()
    const openNotification = (loginFlag: boolean, loginRes: HttpResponse<SchoolLoginResult>) => {
        api.open({
            message: loginRes.msg,
            description: loginFlag ? '' : loginRes.data.data,
            icon: loginFlag ? <SmileOutlined style={{color: '#108ee9'}}/> : <FrownOutlined style={{color: '#e32417'}}/>
        })
    }

    const login = async (login: (token: string) => void) => {
        if (username === '' || password === '') {
            return;
        }
        try {
            const res = await axios.post(import.meta.env.VITE_END_ADDRESS + '/school/login', {
                username,
                password
            });
            const loginRes = res.data as HttpResponse<SchoolLoginResult>
            if (loginRes.code === '200' && loginRes.data.status) {
                openNotification(true, loginRes)
                localStorage.setItem(import.meta.env.VITE_OPENID, username)
                setTimeout(() => {
                    login(loginRes.data.data)
                }, 1000)
            } else {
                openNotification(false, loginRes)
            }
        } catch (e) {
            api.open({
                message: '网络错误，请稍后再试'
            })
        }
    }

    return (
        <AuthContext.Consumer>
            {
                value => {
                    return <>
                        {contextHolder}
                        <Form
                            className={'form'}
                            name="basic"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 16}}
                            style={{maxWidth: 600}}
                            initialValues={{remember: true}}
                            onFieldsChange={onFiledChange}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label="用户名"
                                name="username"
                                rules={[{required: true, message: '请输入用户名！'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="密码"
                                name="password"
                                rules={[{required: true, message: '请输入密码！'}]}
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item<FieldType>
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{offset: 8, span: 16}}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                <Button type="primary" htmlType="submit" onClick={() => login(value.login)}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                }
            }
        </AuthContext.Consumer>
    )
}
