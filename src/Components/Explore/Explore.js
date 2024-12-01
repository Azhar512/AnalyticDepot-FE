import React, { useState } from "react";
import styles from './Explore.module.css'

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Allscreen from "../Allscreen/Allscreen";

function Explore() {
    const [CheckScreen, setChekScreen] = useState('Dashboard')
    console.log('yaha chek ho rha hay,',CheckScreen)

    

    return (
        <>
            <div className={styles['MAin_View']}>
                <Header />

                <div className={styles['Sidebar_Allscreens_Con']}>
                    <Sidebar setChekScreen={setChekScreen} />
                    <Allscreen  CheckScreenAlls={CheckScreen} />
                </div>

            </div>
        </>
    )
}
export default Explore;