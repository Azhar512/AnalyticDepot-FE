import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import styles from './Insight.module.css'

function Insight() {
    return (
        <>
            <div className={styles['Main_Insight_Con']}>
                <div className={styles['insight_Button']}>
                    <span className={styles['Span_Con']} ><FontAwesomeIcon className={styles['Inight_Icon']} icon={faChartLine} /></span>
                </div>
            </div>
        </>
    )
}
export default Insight;