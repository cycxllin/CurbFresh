import React, {useState} from "react";
import {  QueryClient, QueryClientProvider } from 'react-query'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ManagerHeader from "../components/ManagerHeader/ManagerHeader.component";
import ManagerTabs from "../components/ManagerTabs/ManagerTabs.component";
import UserDropdown from "../components/UserDropdown/UserDropdown.component";

const queryClient = new QueryClient();

function Manager() {
    const [selectedManager, setSelectedManager] = useState(null);
    const [resInfo, setResInfo] = useState({});

    return (
        <QueryClientProvider client={queryClient}>
            <div className="Manager">
                <UserDropdown setSelectedUser={setSelectedManager} />
                <ManagerHeader selectedUser={selectedManager} setResInfo={setResInfo} />
                <ManagerTabs selectedManager={selectedManager} resInfo={resInfo}/>
            </div>
        </QueryClientProvider>
    )
}

export default Manager;