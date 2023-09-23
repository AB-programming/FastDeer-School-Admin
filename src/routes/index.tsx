import {Auth} from "../authMiddleware.tsx";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Home from "../pages/Home";
import Event from "../pages/Event";
import EventEditor from "../components/EventEditor";

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
    }
]