import { AuthRoutes } from "./AuthRoutes";
import { BrowserRouter } from "react-router";
import { EmployeeRoutes } from "./EmployeeRoutes";

export function Routes(){
    return (
        <BrowserRouter>
            <EmployeeRoutes/>
        </BrowserRouter>
    )
}