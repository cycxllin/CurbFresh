import React, {useState} from "react";
import {  QueryClient, QueryClientProvider } from 'react-query'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ManagerHeader from "../components/managerHeader/managerHeader.component";
import ManagerTabs from "../components/managerTabs/managerTabs.component";
import UserDropdown from "../components/userDropdown/userDropdown.component";

const queryClient = new QueryClient();

function Manager() {
    const [selectedManager, setSelectedManager] = useState(null);
    const [resInfo, setResInfo] = useState({});

    return (
        <QueryClientProvider client={queryClient}>
            <div className="Manager">
                <UserDropdown setSelectedUser={setSelectedManager} setResInfo={setResInfo} />
                <ManagerHeader selectedUser={selectedManager} setResInfo={setResInfo} />
                <ManagerTabs selectedManager={selectedManager} resInfo={resInfo}/>
            </div>
        </QueryClientProvider>
    )
}

export default Manager;