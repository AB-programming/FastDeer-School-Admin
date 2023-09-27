import {Affix, Button, DatePicker, Form, Input, message} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import ReactQuill from "react-quill";
import {useState} from "react";
import axios from "axios";
import {useDate} from "../../hooks/useDate.ts";

type FieldType = {
    title: string;
    deadline: string;
}

function VolunteerEditor() {
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

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

    const onFinish = async (values: FieldType) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const date = new Date(values.deadline.$d)
        const deadline = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0')
            + " " + String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0')
            + ":" + String(date.getSeconds()).padStart(2, '0');
        const publishRes = (await axios.post(import.meta.env.VITE_END_ADDRESS + "/volunteer/publishVolunteer", {
            userId: localStorage.getItem(import.meta.env.VITE_OPENID),
            title: values.title,
            description: description,
            // eslint-disable-next-line react-hooks/rules-of-hooks
            date: useDate(),
            deadline: deadline,
        }, {
            headers: {
                "Authorization": localStorage.getItem(import.meta.env.VITE_TOKEN)
            }
        })).data as HttpResponse<boolean>;
        if (publishRes.code === '200' && publishRes.data) {
            messageApi.open({
                type: 'success',
                content: publishRes.msg
            });
            setTimeout(() => {
                navigate(-1)
            }, 1000)
        } else {
            messageApi.open({
                type: 'error',
                content: publishRes.msg
            });
        }
    }
    return (
        <div>
            {contextHolder}
            <Affix offsetTop={10}>
                <Button type="primary" onClick={() => navigate(-1)} icon={<ArrowLeftOutlined/>} size={"large"}
                        shape={"circle"}>
                </Button>
            </Affix><br/>
            <Form
                onFinish={onFinish}
                name={"job"}
                labelCol={{span: 16}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 1200}}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label={"志愿标题"}
                    name={"title"}
                    rules={[{required: true, message: '职位标题不能为空'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={"志愿描述"}
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
                    label={"截止日期"}
                    name={"deadline"}
                    rules={[{required: true, message: '截止日期必须选择'}]}
                >
                    <DatePicker format="YYYY-MM-DD"/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 18, span: 16}}>
                    <Button type={"primary"} htmlType={"submit"}>发布</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default VolunteerEditor;