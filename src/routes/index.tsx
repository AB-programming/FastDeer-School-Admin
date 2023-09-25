import {Auth} from "../authMiddleware.tsx";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Home from "../pages/Home";
import Event from "../pages/Event";
import EventEditor from "../components/EventEditor";
import EventDisplay from "../components/EventDisplay";
import Job from "../pages/Job";
import JobEditor from "../components/JobEditor";
import Volunteer from "../pages/Volunteer";

export default [
    {
        path: '/',
        element: Auth(<Dashboard/>),
        children: [
            {
                path: '/',
                name: '首页',
                element: Auth(<Home />)
            },
            {
                path: '/event',
                name: '活动',
                element: Auth(<Event />)
            },
            {
                path: '/job',
                name: '工作',
                element: Auth(<Job />)
            },
            {
                path: '/volunteer',
                name: '志愿服务',
                element: Auth(<Volunteer />)
            }
        ]
    },
    {
        path: '/login',
        name: '登录',
        element: <Login/>,
    },
    {
        path: '/event-editor',
        name: '活动编辑器',
        element: Auth(<EventEditor />)
    },
    {
        path: "/event-display",
        name: "活动预览",
        element: Auth(<EventDisplay />)
    },
    {
        path: '/job-editor',
        name: '工作编辑器',
        element: Auth(<JobEditor />)
    }
]