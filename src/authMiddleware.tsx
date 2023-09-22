import React from "react";
import {AuthContext} from "./hooks/useAuth";
import {Suspense} from "react";
import Login from "./components/Login";
import {Spin} from "antd";

export const Auth = (element: React.ReactNode) => {
    return <AuthContext.Consumer>
        {
            value =>
                (
                    <Suspense fallback={<Spin size="large" />}>
                        {value.isAuthenticated ? element : <Login />}
                    </Suspense>
                )
        }
    </AuthContext.Consumer>
}