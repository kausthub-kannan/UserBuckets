import React, {useEffect, useState} from "react";
import {Button, Col, Card, Row, Space, Layout, Menu, Table} from "antd";
const History = () => {

    const [data, setData] = useState([])

    useEffect( () =>{
        const call = async () =>{
            const response = await fetch("http://localhost:3500/history?_sort=timestamp&_order=desc&_page=1")
            const res = await response.json()
            console.log(res)
            setData(res)
        }
        call()

    },[])

    const historyConetnt =[
        {
            name: "XYZ",
            url: "https",
            timestamp: "4PM at 26th March 2023"
        },
        {
            name: "XYZ",
            url: "https",
            timestamp: "4PM at 26th March 2023"
        },
        {
            name: "XYZ",
            url: "https",
            timestamp: "4PM at 26th March 2023"
        },
        {
            name: "XYZ",
            url: "https",
            timestamp: "4PM at 26th March 2023"
        },
    ]

    const columns =[
        {
            title: 'Card Name',
            dataIndex: 'title',
            key: 'name',
        },
        {
            title: 'Link',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: 'Time-stamp',
            dataIndex: 'timestamp',
            key: 'timestamp',
        },
    ]

    return(
        <div className="body-content">
            <Table align="center" dataSource={data}      columns={columns} />
        </div>
    )
}

export default History