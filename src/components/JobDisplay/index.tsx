
import {Card, Image} from 'antd';
import React from "react";
import {JobInfo} from "../../pages/Job";

const { Meta } = Card;

const JobDisplay: React.FC<JobInfo> = (jobInfo: JobInfo) => {
    const {
        jobName,
        nickName,
        avatar,
        degree,
        salary,
        description,
        company,
        date,
        deadline,
        contact,
    } = jobInfo;

    return (
        <div style={{display: "flex", justifyContent: "center", paddingTop: "4vh"}}>
            <Card
                style={{ width: 400}}
                // loading
                hoverable
                bordered
            >
                <Meta
                    avatar={<Image alt={"学校avatar"} src={avatar} width={100}/>}
                    title={jobName}
                    description={
                        <div>
                            <p>发布人: {nickName}</p>
                            <p>学历要求: {degree}</p>
                            <p>薪资: {salary}</p>
                            <div>职位描述:
                                <div dangerouslySetInnerHTML={{__html: description}}></div>
                            </div>
                            <p>所属公司: {company}</p>
                            <p>发布日期: {date}</p>
                            <p>投递截止日期: {deadline}</p>
                            <p>联系方式: {contact}</p>
                        </div>
                    }
                />
            </Card>
        </div>
    );
};

export default JobDisplay;
