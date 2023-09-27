import {Avatar, Button, Drawer, FloatButton, List, message, Popover, Space, Table, Typography} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {ManOutlined, WomanOutlined} from "@ant-design/icons";

const {Text} = Typography;

interface Member {
    userId: string;
    name: string;
    avatar: string;
    gender: string;
    school: string;
    major: string;
    qualification: string;
}

interface DataType {
    key: string;
    volunteerId: string;
    userId: string;
    name: string;
    avatar: string;
    title: string;
    description: string;
    date: string;
    deadline: string;
    members: Array<Member>;
}

function Volunteer() {
    const navigate = useNavigate();
    const [data, setData] = useState<Array<DataType>>([]);
    const [description, setDescription] = useState("");
    const [membersOpen, setMembersOpen] = useState(false);
    const [members, setMembers] = useState<Array<Member>>([]);
    const [messageApi, contextHolder] = message.useMessage();

    const contentPreview = (
        <div>
            <div dangerouslySetInnerHTML={{__html: description}} style={{whiteSpace: "pre-wrap"}}/>
        </div>
    )

    useEffect(() => {
        const fetchVolunteerList = async () => {
            const volunteerListRes = (await axios.get(import.meta.env.VITE_END_ADDRESS + "/volunteer/selectVolunteerListBySchoolId?schoolId="
                + localStorage.getItem(import.meta.env.VITE_OPENID))).data as HttpResponse<Array<DataType>>;
            if (volunteerListRes.code === '200') {
                setData(volunteerListRes.data.map(volunteer => ({
                    ...volunteer,
                    key: volunteer.volunteerId
                })));
            }
        };
        fetchVolunteerList().then();
    }, []);

    const columns: ColumnsType<DataType> = [
        {
            title: '学校',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '报名者',
            dataIndex: 'members',
            key: 'members',
            render: (urls: Array<Member>) => (
                urls.slice(0, 5).map(url => {
                    return <Avatar src={url.avatar} alt="avatar" key={url.userId}/>
                })
            )
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => {
                setDescription(record.description)
                return (<Popover content={contentPreview} title={record.title}>
                    <Text>{record.title}</Text>
                </Popover>
            )}
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        setMembers(record.members);
                        setMembersOpen(true);
                    }}>查看报名人数</a>
                    <Button danger type={"primary"} onClick={async () => {
                        const deleteRes = (await axios.delete(import.meta.env.VITE_END_ADDRESS + "/volunteer/deleteVolunteer?volunteerId=" + record.volunteerId, {
                            headers: {
                                "Authorization": localStorage.getItem(import.meta.env.VITE_TOKEN)
                            }
                        })).data as HttpResponse<boolean>;
                        if (deleteRes.code === '200' && deleteRes.data) {
                            messageApi.success(deleteRes.msg);
                            setData(data.filter(volunteer => volunteer.volunteerId !== record.volunteerId));
                        } else {
                            messageApi.error(deleteRes.msg);
                        }
                    }}>删除</Button>
                </Space>
            ),
        },
    ];

    return <div>
        {contextHolder}
        <Table columns={columns} dataSource={data}/>
        <FloatButton type={'primary'} icon={<PlusOutlined/>} onClick={() => navigate('/volunteer-editor')}/>
        <Drawer title="报名人数展示" placement="right" onClose={() => setMembersOpen(false)} open={membersOpen}
                width={800}>
            <List
                itemLayout="horizontal"
                dataSource={members}
                renderItem={member => (
                    <List.Item key={member.userId}>
                        <List.Item.Meta
                            avatar={<Avatar src={member.avatar}/>}
                            title={<>
                                <Text strong>{member.name}</Text>&nbsp;&nbsp;&nbsp;
                                {member.gender === "男" ? <ManOutlined style={{color: '#0b4ab8'}}/> :
                                    <WomanOutlined style={{color: '#c90c77'}}/>}
                            </>}
                            description={<>
                                <Text strong mark type={"secondary"}>手机号：{member.userId}</Text><br/>
                                <Text strong type={"success"}>学校：{member.school}</Text><br/>
                                <Text strong type={"warning"} italic>专业：{member.major}</Text><br/>
                                <Text strong color={'#fff'}>学历：{member.qualification}</Text>
                            </>}
                        />
                    </List.Item>
                )}
            >
        </List>
    </Drawer>
</div>
}

export default Volunteer;