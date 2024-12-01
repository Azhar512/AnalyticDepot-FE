import React from "react";
import styles from './Allscreen.module.css'
import Dashboard from "../../Cuscomponent/Dashboard/Dashboard";
import Sources from "../../Cuscomponent/Sources/Sources";
import Settings from "../../Cuscomponent/Settings/Settings";
import Drag from "../../Cuscomponent/Drag/Drag";
import Integration from "../../Cuscomponent/Integration/Integration";
import Analytics from "../../Cuscomponent/Analytics/Analytics";
import Usage from "../../Cuscomponent/Usage/Usage";

function Allscreen({CheckScreenAlls}) {
    
    if(CheckScreenAlls === 'Dashboard'){
       return <Dashboard />
    }else if(CheckScreenAlls === 'Sources'){
        return  <Sources />
    }else if(CheckScreenAlls === 'Settings'){
        return    <Settings />
    }else if(CheckScreenAlls === 'Drag & Drop'){
        return   <Drag />
    }else if(CheckScreenAlls === 'Usage'){
        return   <Usage />
    }else if(CheckScreenAlls === 'Integration'){
        return  <Integration />
    }else if(CheckScreenAlls === 'Analytics'){
        return   <Analytics />
    }

}
export default Allscreen;