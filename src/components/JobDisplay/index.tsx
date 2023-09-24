
import {Card, Image} from 'antd';
import React from "react";

const { Meta } = Card;

interface JobInfo {
    jobTitle: string,
    employerName: string,
    employerAvatar: string,
    educationRequirement: string,
    salary: string,
    jobDescription: string,
    companyName: string,
    publishDate: string,
    applicationDeadline: string,
    contactInfo: string,
}

const JobDisplay: React.FC<JobInfo> = (jobInfo) => {
    const {
        jobTitle,
        employerName,
        employerAvatar,
        educationRequirement,
        salary,
        jobDescription,
        companyName,
        publishDate,
        applicationDeadline,
        contactInfo,
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
                    avatar={<Image alt={jobTitle} src={employerAvatar} width={100}/>}
                    title={jobTitle}
                    description={
                        <div>
                            <p>发布人: {employerName}</p>
                            <p>学历要求: {educationRequirement}</p>
                            <p>薪资: {salary}</p>
                            <div>职位描述:
                                <div dangerouslySetInnerHTML={{__html: jobDescription}}></div>
                            </div>
                            <p>所属公司: {companyName}</p>
                            <p>发布日期: {publishDate}</p>
                            <p>投递截止日期: {applicationDeadline}</p>
                            <p>联系方式: {contactInfo}</p>
                        </div>
                    }
                />
            </Card>
        </div>
    );
};

export default JobDisplay;
