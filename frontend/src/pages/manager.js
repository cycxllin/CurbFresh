import React, {useState, useEffect} from "react";
import { QueryClient, QueryClientProvider } from 'react-query'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import userDropdown from "../components/userDropdown/userDropdown.component";

const queryClient = new QueryClient();

function Manager() {
    const [selectedManager, setSelectedManager] = useState();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="Manager">Manager
                <userDropdown type="Manager" setSelectedUser={setSelectedManager}/>
            </div>
            
        </QueryClientProvider>
    )
}

export default Manager;