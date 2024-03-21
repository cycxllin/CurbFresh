import React, {useState, useEffect} from "react";
import { QueryClient, QueryClientProvider } from 'react-query'; 
import 'bootstrap/dist/css/bootstrap.min.css';
//import UserDropdown from "../components/userDropdown/userDropdown.component";
import ManagerHeader from "../components/managerHeader/managerHeader.component";
import ManagerTabs from "../components/managerTabs/managerTabs.component";

const queryClient = new QueryClient();

function Manager() {
    const [selectedManager, setSelectedManager] = useState();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="Manager">
                <ManagerHeader/>
                <ManagerTabs/>
            </div>
        </QueryClientProvider>
    )
}

export default Manager;