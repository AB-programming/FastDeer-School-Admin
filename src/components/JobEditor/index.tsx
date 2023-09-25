import {Affix, Button, DatePicker, Form, Input, Select} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import ReactQuill from "react-quill";
import {useState} from "react";

type FieldType = {
    jobName: string;
    degree?: string;
    salary?: string;
    company?: string;
    deadline?: string;
    contact: string;
}

function JobEditor() {
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['clean']
        ],
    }
    const formats = [
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
    ]

    const publishJob = (values: FieldType) => {
        console.log(values.deadline)
        console.log(description)
        // Todo
    }
    return (
        <div>
            <Affix offsetTop={10}>
                <Button type="primary" onClick={() => navigate(-1)} icon={<ArrowLeftOutlined/>} size={"large"}
                        shape={"circle"}>
                </Button>
            </Affix><br/>
            <Form
                onFinish={publishJob}
                name={"job"}
                labelCol={{span: 16}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 1200}}
                initialValues={{
                    "degree": "不限",
                }}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label={"职位名称"}
                    name={"jobName"}
                    rules={[{required: true, message: '职位名称不能数为空'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<FieldType>
                    label={"学历要求"}
                    name={"degree"}
                    rules={[{required: true, message: '学历要求必须选择'}]}
                >
                    <Select
                        style={{width: 120}}
                        options={[
                            {value: '不限', label: '不限'},
                            {value: '专科及以上', label: '专科及以上'},
                            {value: '本科及以上', label: '本科及以上'},
                            {value: '硕士及以上', label: '硕士及以上'},
                            {value: '博士及以上', label: '博士及以上'},
                        ]}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label={"薪资情况"}
                    name={"salary"}
                    rules={[{required: true, message: '薪资情况必须填写'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={"岗位描述"}
                >
                    <ReactQuill
                        style={{height: '400px'}}
                        theme={"snow"}
                        value={description}
                        onChange={setDescription}
                        modules={modules}
                        formats={formats}
                    />
                </Form.Item><br/><br/>

                <Form.Item<FieldType>
                    label={"所属公司"}
                    name={"company"}
                    rules={[{required: true, message: '公司必须填写'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<FieldType>
                    label={"截止日期"}
                    name={"deadline"}
                    rules={[{required: true, message: '截止日期必须选择'}]}
                >
                    <DatePicker format="YYYY-MM-DD"/>
                </Form.Item>

                <Form.Item<FieldType>
                    label={"联系方式"}
                    name={"contact"}
                    rules={[{required: true, message: '联系方式必须填写'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 18, span: 16}}>
                    <Button type={"primary"} htmlType={"submit"}>发布</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default JobEditor;