import React, {useEffect, useState} from 'react';
import {
    FrownOutlined,
    HomeOutlined,
    ScheduleOutlined,
    SmileOutlined,
    LoadingOutlined,
    PlusOutlined,
    AuditOutlined,
    TeamOutlined
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Avatar, Layout, Menu, theme, Typography, Dropdown, Modal, notification, Drawer, Upload} from 'antd';
import {Outlet, useNavigate, useRoutes} from "react-router-dom";
import {LABEL} from "../../util/constant";
import routes from "../../routes";
import Title from "antd/es/typography/Title";
import "./index.css"
import axios from "axios";
import {useLoginStatus} from "../../hooks/useLoginStatus.ts";

const {Header, Content, Footer, Sider} = Layout;

const sideMenuItems: MenuProps['items'] = [
    HomeOutlined,
    ScheduleOutlined,
    AuditOutlined,
    TeamOutlined
].map((ico, index) => {
    const key = String(index)
    const icon = React.createElement(ico)
    let label = '';
    switch (index) {
        case 0: {
            label = LABEL.HOME;
            break;
        }
        case 1: {
            label = LABEL.EVENT;
            break;
        }
        case 2: {
            label = LABEL.JOB;
            break;
        }
        case 3: {
            label = LABEL.VOLUNTEER;
            break;
        }
        default: {
            label = LABEL.OTHER;
            break;
        }
    }
    return ({
        key,
        icon,
        label
    })
});

const {Text} = Typography;

interface SchoolInfo {
    id: string
    nickName: string
    avatarUrl: string
    gender: string
    place: string,
    birth: string,
    school: string,
    major: string,
    qualification: string,
    graduationDate: string,
    role: string
}

export default function Dashboard() {

    const navigate = useNavigate();
    const route = useRoutes(routes);
    const routeName = route?.props.routeContext.outlet.props.match.route.name;
    const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>();
    const [isShowExitModal, setIsShowExitModal] = useState(false);
    const [api, contextHolder] = notification.useNotification()
    const [isShowInfoEdit, setIsShowInfoEdit] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string>();
    const [avatarUploadLoading, setAvatarUploadLoading] = useState(false);

    useEffect(() => {
        const fetchSchoolInfo = async () => {
            const fetchSchoolInfoRes = (await axios.get(import.meta.env.VITE_END_ADDRESS + "/user/getUserById?openId="
                + localStorage.getItem(import.meta.env.VITE_OPENID), {
                headers: {
                    'Authorization': localStorage.getItem(import.meta.env.VITE_TOKEN)
                }
            })).data
            if (fetchSchoolInfoRes.code === '200') {
                setSchoolInfo(fetchSchoolInfoRes.data)
                setAvatarUrl(fetchSchoolInfoRes.data.avatarUrl)
            }
        }
        fetchSchoolInfo().then()
    }, []);

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    function changeItem(key: string) {
        switch (key) {
            case '0': {
                navigate('/');
                break;
            }
            case '1': {
                navigate('/event');
                break;
            }
            case '2': {
                navigate('/job');
                break;
            }
            case '3': {
                navigate('/volunteer')
                break;
            }
        }
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Text onClick={() => setIsShowInfoEdit(true)}>
                    编辑信息
                </Text>
            ),
        }, {
            key: '2',
            label: (
                <Text onClick={() => setIsShowExitModal(true)}>
                    退出登录
                </Text>
            ),
        },
    ];

    const handleExit = async () => {
        const logoutRes = (await axios.get(import.meta.env.VITE_END_ADDRESS + "/logout", {
            headers: {
                'Authorization': localStorage.getItem(import.meta.env.VITE_TOKEN)
            }
        })).data as HttpResponse<null>;
        if (logoutRes.code === '200') {
            localStorage.removeItem(import.meta.env.VITE_TOKEN)
            localStorage.removeItem(import.meta.env.VITE_OPENID)
            api.success({
                message: logoutRes.msg,
                icon: <SmileOutlined style={{color: '#108ee9'}}/>
            })
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        } else {
            api.error({
                message: logoutRes.msg,
                icon: <FrownOutlined style={{color: '#e32417'}}/>
            })
        }
        setIsShowExitModal(false)
    }

    return (
        <Layout hasSider>
            {contextHolder}
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} items={sideMenuItems}
                      onClick={event => changeItem(event.key)}/>
            </Sider>
            <Layout className="site-layout" style={{marginLeft: 200}}>
                <Header style={{background: colorBgContainer}} className={'header'}>
                    <Title
                        level={1}
                        className={'title'}
                        // mark
                        underline
                    >{routeName}</Title>
                    <div className={'info'}>
                        <Text strong>{schoolInfo?.nickName}</Text>
                        <Dropdown menu={{items}}>
                            <Avatar size="large" src={avatarUrl}/>
                        </Dropdown>
                    </div>
                </Header>
                <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                    <Outlet/>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    <p>Released under the MIT License.</p>
                    <p>Copyright © 2023-2025 FastDeer Team</p>
                </Footer>
            </Layout>
            <Modal
                title="退出登录"
                open={isShowExitModal}
                onOk={handleExit}
                onCancel={() => setIsShowExitModal(false)}
                okText="确认"
                cancelText="取消"
            >
                <p>是否要安全退出登录?</p>
            </Modal>
            <Drawer title="学校信息" placement="right" onClose={() => setIsShowInfoEdit(false)}
                    open={isShowInfoEdit}>
                <Text>账户：</Text><Text strong type="secondary">{schoolInfo?.id}</Text><br/>
                <Text>学校：</Text><Text strong type="success">{schoolInfo?.nickName}</Text><br/><br/>
                <Avatar size="large" src={avatarUrl}/><br/><br/>
                <Upload
                    maxCount={1}
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={async (option) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        if (!await useLoginStatus()) {
                            api.error({
                                message: "请先登录",
                                icon: <FrownOutlined style={{color: '#e32417'}}/>
                            })
                            setTimeout(() => {
                                navigate('/login')
                            }, 1000)
                            return;
                        }
                        setAvatarUploadLoading(true);
                        const file = option.file as File;
                        const formData = new FormData();
                        formData.append('file', file);
                        const openId = localStorage.getItem(import.meta.env.VITE_OPENID);
                        if (openId) {
                            formData.append('openId', openId);
                        }
                        try {
                            const updateAvatarRes = (await axios.post(import.meta.env.VITE_END_ADDRESS + "/user/updateAvatar", formData, {
                                headers: {
                                    'Authorization': localStorage.getItem(import.meta.env.VITE_TOKEN)
                                }
                            })).data as HttpResponse<string>;
                            if (updateAvatarRes.code === '200') {
                                api.success({
                                    message: updateAvatarRes.msg,
                                    icon: <SmileOutlined style={{color: '#108ee9'}}/>
                                })
                                setAvatarUploadLoading(false)
                                setAvatarUrl(updateAvatarRes.data + "?" + new Date().getTime())
                            } else {
                                api.error({
                                    message: updateAvatarRes.msg,
                                    icon: <FrownOutlined style={{color: '#e32417'}}/>
                                })
                            }
                        } catch(err) {
                            api.error({
                                message: "网络错误，请稍后再试",
                                icon: <FrownOutlined style={{color: '#e32417'}}/>
                            })
                        }
                    }}
                >
                    <div>
                        {avatarUploadLoading ? <LoadingOutlined/> : <PlusOutlined/>}
                        <div style={{marginTop: 8}}>上传头像</div>
                    </div>
                </Upload>
            </Drawer>
        </Layout>
    );
}