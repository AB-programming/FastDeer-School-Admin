import {Avatar, Button, Space, Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
interface DataType {
    key: string;
    name: string;
    avatar: string;
    title: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: '学校',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (url) => <>
            <Avatar src={url}/>
            <Avatar src={url}/>
            <Avatar src={url}/>
            <Avatar src={url}/>
            <Avatar src={url}/>
            <Avatar src={url}/>
        </>
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <p>{record.key}</p>
                <a>查看内容</a>
                <a>查看报名人数</a>
                <Button danger type={"primary"}>删除</Button>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        avatar: "https://img2.baidu.com/it/u=452199401,3287833971&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1037",
        title: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        avatar: "https://img2.baidu.com/it/u=2421724804,2783972970&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
        title: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        avatar: "https://img2.baidu.com/it/u=1976906421,3700633530&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747",
        title: 'Sydney No. 1 Lake Park',
    },
];

function Volunteer() {
    return <div>
        <Table columns={columns} dataSource={data} />
    </div>
}

export default Volunteer;