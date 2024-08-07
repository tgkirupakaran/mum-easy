import { Table } from "antd";
import React,{ useState,useEffect } from "react";
import { GiBabyBottle, GiNightSleep } from "react-icons/gi";
import { LuMilk } from "react-icons/lu";
import { FaRegClock, FaRulerVertical, FaPersonBreastfeeding, FaBaby } from "react-icons/fa6";
import { supabase } from '../supabaseClient';
import dayjs from 'dayjs';

const feedColumns = [
    {
      title: 'Date',
      dataIndex: 'datetime',
      key: 'datetime',
      render:(text) => dayjs(text).format('DD-MM-YYYY')
    },
    {
      title: 'Time',
      dataIndex: 'datetime',
      key: 'datetime',
      render:(text) => dayjs(text).format('HH:mm:ss')
    },
    {
      title: 'Type',
      dataIndex: 'feeding_type',
      key: 'feeding_type',
      render: (_ , record) => (
        <> {record.feeding_type==='Breast' ? 
          <div><FaPersonBreastfeeding /> Breast</div> : 
          null} 
          {record.feeding_type==='Formula' ? 
          <div><GiBabyBottle /> Formula</div> : 
          null} 
          {record.feeding_type==='Expressed' ? 
          <div><LuMilk /> Expressed</div> : 
          null} 
        </>
    )
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (_ , record) => (
          <> {record.feeding_type==='Breast' ? 
            <div>Left side : {record.left_minutes} minutes, Right side : {record.right_minutes} minutes.</div> : 
            null} 
            {record.feeding_type==='Formula' ? 
            <div>Quantity : {record.quantity} ml</div> : 
            null} 
            {record.feeding_type==='Expressed' ? 
            <div>Quantity : {record.quantity} ml</div> : 
            null} 
          </>
      )
    }
    
]
const History = () => {
    const [tableData, setTableData] = useState([]);

    async function getFeedings() {
      const { data } = await supabase.from("feedings").select();
      setTableData(data);
    }

    useEffect(() => {
      getFeedings()
      }, []);
    return(
        <div>
            <h2 style={{textAlign: 'center'}}>Baby Log</h2>
            <Table columns={feedColumns} dataSource={tableData} />
        </div>
    )
}
export default History;
