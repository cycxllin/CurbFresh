import React, {useState, useEffect} from "react";
import { QueryClient, QueryClientProvider } from 'react-query'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ManagerHeader from "../components/managerHeader/ManagerHeader.component";
import ManagerTabs from "../components/ManagerTabs/ManagerTabs.component";

const queryClient = new QueryClient();

function Manager() {
    const [selectedManager, setSelectedManager] = useState(null);
    return (
        <QueryClientProvider client={queryClient}>
            <div className="Manager">
                <ManagerHeader selectedUser={selectedManager} setSelectedUser={setSelectedManager}/>
                <p>selected:{selectedManager}</p>
                <ManagerTabs selectedManager={selectedManager}/>
            </div>
        </QueryClientProvider>
    )
}

export default Manager;