import {Affix, Button, Typography, Image} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const {Title} = Typography;

function EventDisplay() {
    const navigate = useNavigate();

    const {state} = useLocation();
    console.log(state)
    const [content, setContent] = useState<string>("");
    useEffect(() => {
        const fetchEventContent = async () => {
            const eventContentRes = (await axios.get(import.meta.env.VITE_END_ADDRESS
                + "/event/getEventUrlByEventId?eventId=" + state.eventId)).data as HttpResponse<string>;
            if (eventContentRes.code === '200') {
                const eventContent = (await axios.get(eventContentRes.data)).data
                setContent(eventContent)
            }
        };
        fetchEventContent().then();
    }, []);


    return (
        <div>
            <Affix offsetTop={10}>
                <Button type="primary" onClick={() => navigate(-1)} icon={<ArrowLeftOutlined/>} size={"large"}
                        shape={"circle"}>
                </Button>
            </Affix>
            <Title
                mark
                type={'secondary'}
                underline
                style={{marginLeft: "10%", marginRight: "10%"}}
            >{state.title}</Title>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Image
                    width={400}
                    src={state.cover}
                />
            </div>
            <div style={{padding: '2%'}} dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
    )
}

export default EventDisplay;
