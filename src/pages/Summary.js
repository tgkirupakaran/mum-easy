import { Table } from "antd";
import React,{ useState,useEffect } from "react";
import VoiceRecognitionComponent from "../components/VoiceRecognitionComponent "; 
const Summary = () => {
    return(
        <div>
            <h2 style={{textAlign: 'center'}}>Summary</h2>
            <VoiceRecognitionComponent />
       </div>
    )
}
export default Summary;
