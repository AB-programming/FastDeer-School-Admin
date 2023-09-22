import {useRoutes} from "react-router-dom";
import routes from "./routes";
import {AuthProvider} from "./hooks/useAuth.tsx";

function App() {
    const element = useRoutes(routes)
    return (
        <AuthProvider>
            {element}
        </AuthProvider>
    )
}

export default App;