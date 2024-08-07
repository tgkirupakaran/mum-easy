import { Table } from "antd";
import React,{ useState,useEffect } from "react";


const columns = [
    {
      title: 'Ticker',
      dataIndex: 'tick',
      key: 'tick',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'LTP',
      dataIndex: 'ltp',
      key: 'ltp',
    },
    {
      title: 'Open',
      dataIndex: 'open',
      key: 'open',
    },
    {
      title: 'High',
      dataIndex: 'high',
      key: 'high',
    },
    {
      title: 'Low',
      dataIndex: 'low',
      key: 'low',
    }
]
const Graphs = () => {
    const [tableData, setTableData] = useState([]);
    const [ticks, setTicks] = useState({});
    useEffect(() => {
        console.log("data")
      }, []);
    return(
        <div>
            <h2 style={{textAlign: 'center'}}>Graphs</h2>
            <Table columns={columns} dataSource={tableData} />
        </div>
    )
}
export default Graphs;
