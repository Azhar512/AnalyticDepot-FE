import React from "react";
import styles from './Button.module.css'

function Button({ EnterText, OnClick }) {
    return (
        <>
            <div className={styles['Button_Main_Con']}>
                <button onClick={OnClick} className={styles['Button_Con']}>{EnterText}</button>
            </div>
        </>
    )
}
export default Button;