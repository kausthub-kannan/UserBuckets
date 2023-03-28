import React, {useEffect, useState} from "react";
import {Routes, Route, useNavigate, } from "react-router-dom"
import Bucket from "./pages/Bucket.jsx";
import {Link} from "react-router-dom"
import './index.css'
import {Button, Card, Col, Dropdown, Input, Layout, Menu, Modal, Row, Space} from "antd";
import { DownOutlined } from '@ant-design/icons';
import History from "./pages/History.jsx";
function App() {

    const navigate = useNavigate()
    const { Header, Content, Footer, Sider } = Layout;
    const [addBucket, showAddBucket] = useState(false)
    const [list, setList] = useState([])

    useEffect(() =>{
        const call = async () => {
            const response = await fetch("http://localhost:3500/cards")
            const res = await response.json()

            const uniqueNames = {};

            for (let i = 0; i < res.length; i++) {
                const name = res[i].bucket;
                uniqueNames[name] = res[i];
            }

            const result = Object.values(uniqueNames);
            console.log(result)
            setList(result)
            console.log(list)
        }
        call()
    },[])
    const handleButtonClick = () => {
        //
    }

    const handleMenuClick = (e) => {
        if(e.key!="addBucket")
            navigate('/'+e.key)
        else
            showAddBucket(true)
    }

    const handleCancel = () =>{
        showAddBucket(false)
    }


    const items = []

    const menuProps ={
        items,
        onClick: handleMenuClick,
    }

  return (
    <>
        <Layout>
            <Header>
                <Menu theme="dark" mode="horizontal" className="menu">
                    <Menu.Item><a href="/">History</a></Menu.Item>
                    {list.map(e =>(
                        <Menu.Item><a href={"/"+e.bucket}>{e.bucket}</a></Menu.Item>
                    ))}
                </Menu>
                <Modal
                    title={"Edit Bucket Name"}
                    open={addBucket}
                    onCancel={handleCancel}
                >
                    <Input placeholder="New Bucket Name"/>
                </Modal>
            </Header>
                <Content>
                    <Routes>
                        <Route path="/:id" element={<Bucket />}/>
                        <Route path="/" element={<History />} />
                    </Routes>
                </Content>
                <Footer style={{position:"absolute", bottom:0, width:"100%", textAlign:"center", background:"none"}}>Copyrights UserBuckets @2023</Footer>
            </Layout>
    </>
  )
}

export default App