import React, {useEffect, useState} from 'react';
import {List, FloatButton, Avatar, Typography} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const { Text, Link } = Typography;

interface EventDisplay {
    eventId: string;
    userId: string;
    name: string;
    avatar: string;
    title: string;
    cover: string;
    date: string;
}

const Event: React.FC = () => {
    const [data, setData] =  useState<EventDisplay[]>([]);
    useEffect(() => {
        const fetchEventList = async () => {
            const fetchEventListRes = (await axios.get(import.meta.env.VITE_END_ADDRESS + "/event/selectEventListByUserId?userId="
                + localStorage.getItem(import.meta.env.VITE_OPENID))).data as HttpResponse<Array<EventDisplay>>
            setData(fetchEventListRes.data)
        }
        fetchEventList().then()
    }, []);

    const navigate = useNavigate();
    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={event => (
                    <List.Item
                        onClick={() => {
                            navigate("/event-display", {
                                state: event
                            })
                        }}
                        key={event.eventId}
                        extra={
                            <img
                                width={100}
                                alt="logo"
                                src={event.cover}
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={event.avatar} />}
                            title={<Link>{event.name}</Link>}
                            description={event.date}
                        />
                        <Text strong style={{marginLeft: '5%'}}>{event.title}</Text>
                    </List.Item>)
                }
            />
            <FloatButton type={'primary'} icon={<PlusOutlined />} onClick={() => navigate('/event-editor')}/>
        </>
    )
};

export default Event;