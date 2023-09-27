import JobDisplay from "../../components/JobDisplay";
import {Button, Col, FloatButton, message, Popover, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export interface JobInfo {
    jobId: string,
    jobName: string,
    userId: string,
    nickName: string,
    avatar: string,
    degree: string,
    salary: string,
    description: string,
    company: string,
    date: string,
    deadline: string,
    contact: string,
}

function Job() {
    const [jobList, setJobList] = useState<Array<JobInfo>>([]);
    const [messageApi, contextHolder] = message.useMessage();

    const jobCardPreview = (jobId: string) => (
        <Button type={"primary"} danger onClick={async () => {
            const deleteRes = (await axios.delete(import.meta.env.VITE_END_ADDRESS + "/job/deleteJob?jobId=" + jobId, {
                headers: {
                    "Authorization": localStorage.getItem(import.meta.env.VITE_TOKEN)
                }
            })).data as HttpResponse<boolean>;
            if (deleteRes.code === '200' && deleteRes.data) {
                messageApi.success(deleteRes.msg);
                setJobList(jobList.filter(job => job.jobId !== jobId));
            } else {
                messageApi.error(deleteRes.msg);
            }
        }}>删除该职位</Button>
    )

    useEffect(() => {
        const fetchJobList = async () => {
            const jobListRes = (await axios.get(import.meta.env.VITE_END_ADDRESS + "/job/selectJobListBySchoolId?schoolId="
                + localStorage.getItem(import.meta.env.VITE_OPENID))).data as HttpResponse<Array<JobInfo>>;
            if (jobListRes.code === '200') {
                setJobList(jobListRes.data);
            }
        }
        fetchJobList().then();
    }, []);

    const navigate = useNavigate();
    return (
        <div>
            {contextHolder}
            <Row>
                {jobList.map(job =>
                    <Popover key={job.jobId} content={jobCardPreview(job.jobId)}>
                        <Col span={8}>
                            <JobDisplay {...job}/>
                        </Col>
                    </Popover>
                )}
            </Row>
            <FloatButton type={'primary'} icon={<PlusOutlined/>} onClick={() => navigate('/job-editor')}/>
        </div>
    )
}

export default Job;