import JobDisplay from "../../components/JobDisplay";
import {Col, FloatButton, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";


function Job() {
    const data = {
        jobTitle: '前端工程师',
        employerName: '张三',
        employerAvatar: 'http://192.168.110.191:8080/static/avatar/1.jpg',
        educationRequirement: '本科及以上',
        salary: '20,000 - 30,000元/月',
        jobDescription: '负责前端开发工作...',
        companyName: 'ABC公司',
        publishDate: '2023-09-25',
        applicationDeadline: '2023-10-15',
        contactInfo: '联系邮箱: zhangsan@example.com',
    }
    return (
        <div>
            <Row>
                <Col span={8}>
                    <JobDisplay {...data}/>
                </Col>
                <Col span={8}>
                    <JobDisplay {...data}/>
                </Col>
                <Col span={8}>
                    <JobDisplay {...data}/>
                </Col>
                <Col span={8}>
                    <JobDisplay {...data}/>
                </Col>
            </Row>
            <FloatButton type={'primary'} icon={<PlusOutlined />}/>
        </div>
    )
}

export default Job;