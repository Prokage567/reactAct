import { createBrowserRouter } from "react-router-dom";
import H from "../h"
import Example from "../example"

const router = createBrowserRouter([
    {
        path: "/main",
        element: <H/>
    },
    {
        path: "/sub",
        element: <Example/>
    }
])

export default router