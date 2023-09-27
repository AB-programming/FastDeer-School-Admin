import React, {useEffect, useState} from 'react';
import {List, FloatButton, Avatar, Typography, Button, message} from 'antd';
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
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        const fetchEventList = async () => {
            const fetchEventListRes = (await axios.get(import.meta.env.VITE_END_ADDRESS + "/event/selectEventListBySchoolId?schoolId="
                + localStorage.getItem(import.meta.env.VITE_OPENID))).data as HttpResponse<Array<EventDisplay>>
            setData(fetchEventListRes.data)
        }
        fetchEventList().then()
    }, []);

    const navigate = useNavigate();
    const handleDelete = async (event: React.MouseEvent<HTMLElement, MouseEvent>, eventId: string) => {
        event.stopPropagation();
        const deleteRes = (await axios.delete(import.meta.env.VITE_END_ADDRESS + "/event/deleteEvent?eventId=" + eventId, {
            headers: {
                "Authorization": localStorage.getItem(import.meta.env.VITE_TOKEN)
            }
        })).data as HttpResponse<boolean>;
        if (deleteRes.code === '200' && deleteRes.data) {
            messageApi.success(deleteRes.msg);
            setData(data.filter(item => item.eventId !== eventId));
        } else {
            messageApi.error(deleteRes.msg);
        }
    }

    return (
        <>
            {contextHolder}
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
                        <Text strong style={{marginLeft: '5%'}}>{event.title}</Text>&nbsp;&nbsp;
                        <Button type={'primary'} danger onClick={e => handleDelete(e, event.eventId)}>删除该活动</Button>
                    </List.Item>)
                }
            />
            <FloatButton type={'primary'} icon={<PlusOutlined />} onClick={() => navigate('/event-editor')}/>
        </>
    )
};

export default Event;