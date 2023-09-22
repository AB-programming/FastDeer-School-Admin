import React, {useState} from 'react';
import {
    HomeOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Avatar, Layout, Menu, theme, Typography } from 'antd';
import {Outlet, useNavigate, useRoutes} from "react-router-dom";
import {LABEL} from "../../util/constant";
import routes from "../../routes";
import Title from "antd/es/typography/Title";
import "./index.css"

const {Header, Content, Footer, Sider} = Layout;

const items: MenuProps['items'] = [
    HomeOutlined,
].map((ico, index) => {
    const key = String(index)
    const icon = React.createElement(ico)
    let label = '';
    switch (index) {
        case 0: {
            label = LABEL.HOME;
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

const { Text } = Typography;

export default function Dashboard() {

    const navigate = useNavigate();
    const route = useRoutes(routes);
    const routeName = route?.props.routeContext.outlet.props.match.route.name;
    const [avatar, setAvatar] = useState(import.meta.env.VITE_END_ADDRESS + "/static/logo.png");

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    function changeItem(key: string) {
        switch (key) {
            case '0': {
                navigate('/');
                break;
            }
        }
    }

    return (
        <Layout hasSider>
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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} items={items}
                      onClick={event => changeItem(event.key)}/>
            </Sider>
            <Layout className="site-layout" style={{marginLeft: 200}}>
                <Header style={{background: colorBgContainer}} className={'header'}>
                    <Title level={2}>{routeName}</Title>
                    <div className={'info'}>
                        <Text>山东交通学院</Text>
                        <Avatar size="large" src={avatar}/>
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
        </Layout>
    );
}