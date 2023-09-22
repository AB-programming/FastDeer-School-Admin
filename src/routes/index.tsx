import {Auth} from "../authMiddleware.tsx";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Home from "../pages/Home";

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
        ]
    },
    {
        path: '/login',
        element: <Login/>,
    }
]