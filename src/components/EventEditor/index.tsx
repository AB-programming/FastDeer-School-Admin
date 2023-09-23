import {Affix, Button, Input, Modal, message, Upload, UploadFile} from "antd";
import ImgCrop from 'antd-img-crop';
import {useNavigate} from "react-router-dom";
import {ArrowLeftOutlined, EditOutlined, UploadOutlined} from '@ant-design/icons';
import * as ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useRef, useState} from "react";
import "./index.css";
import axios from "axios";
import {useLoginStatus} from "../../hooks/useLoginStatus.ts";
import {useDate} from "../../hooks/useDate.ts";

function EventEditor() {
    const navigate = useNavigate();

    const [eventContent, setEventContent] = useState("");
    const [title, setTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [previewCover, setPreviewCover] = useState<UploadFile>();

    const modules = {
        toolbar: [
            [{'header': [1, 2, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    const quillRef = useRef(null);

    const publish = async () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const loginStatus = await useLoginStatus()
        if (!loginStatus) {
            messageApi.open({
                type: 'error',
                content: "请先登录"
            })
            return;
        }
        if (title === "") {
            messageApi.open({
                type: 'error',
                content: "标题不能为空"
            })
            return;
        }
        const blob = new Blob([eventContent], {type: 'text/html'})
        const formData = new FormData();
        formData.append("file", blob, "event.html");
        const userId = localStorage.getItem(import.meta.env.VITE_OPENID);
        if (userId) {
            formData.append("userId", userId);
        }
        // eslint-disable-next-line react-hooks/rules-of-hooks
        formData.append("date", useDate());
        formData.append("title", title);
        formData.append("cover", previewCover?.originFileObj as File);
        try {
            const res = await axios.post(import.meta.env.VITE_END_ADDRESS + "/event/publishEvent", formData, {
                headers: {
                    "Authorization": localStorage.getItem(import.meta.env.VITE_TOKEN)
                }
            });
            const publishRes = res.data as HttpResponse<boolean>
            if (publishRes.code === '200' && publishRes.data) {
                messageApi.open({
                    type: 'success',
                    content: publishRes.msg
                });
                setTimeout(() => navigate(-1), 1500);
            } else {
                messageApi.open({
                    type: 'error',
                    content: publishRes.msg
                })
            }
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: "网络错误，请稍后再试"
            });
        }
        setIsModalOpen(false);
    }

    const cancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            {contextHolder}
            <Affix offsetTop={10}>
                <Button type="primary" onClick={() => navigate(-1)} icon={<ArrowLeftOutlined/>} size={"large"}
                        shape={"circle"}>
                </Button>
            </Affix><br/>
            <header className={'header'}>
                <Input
                    size="large"
                    placeholder="请输入标题"
                    prefix={<EditOutlined/>}
                    showCount style={{width: '60%'}}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />&nbsp;&nbsp;
                <Button type={'primary'} size={'large'} icon={<UploadOutlined/>}
                        onClick={() => setIsModalOpen(true)}>发布</Button>
            </header><br/>
            <ImgCrop rotationSlider modalOk={"确定"} modalCancel={"取消"} modalTitle={"上传封面"}>
                <Upload
                    maxCount={1}
                    onChange={info => setPreviewCover(info.file)}
                    onRemove={() => setPreviewCover(undefined)}
                    customRequest={() => {
                    }}
                >
                    <Button icon={<UploadOutlined/>}>上传封面</Button>
                </Upload>
            </ImgCrop>
            <br/>
            <ReactQuill
                modules={modules}
                formats={formats}
                ref={quillRef}
                theme={'snow'}
                value={eventContent}
                onChange={setEventContent}
                className={'quill-editor'}
            />

            <Modal
                open={isModalOpen}
                onOk={publish}
                onCancel={cancel}
                okText={"确认"}
                cancelText={"取消"}
            >
                <p>是否发布此活动?</p>
            </Modal>
        </>
    )
}

export default EventEditor;