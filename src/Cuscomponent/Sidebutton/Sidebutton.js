import React from "react";
import styles from './Sidebutton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Sidebutton({Allicons, IconText, OnClicks}) {
    return (
        <>
            <div className={styles['Sidebutton_Con']}>
                <div onClick={OnClicks} className={styles['Inner_SButton']}>
                <FontAwesomeIcon icon={Allicons} /> 
                <p className={styles['Icon_Text']}>{IconText}</p>
                </div>
            </div>
        </>
    )
}
export default Sidebutton;