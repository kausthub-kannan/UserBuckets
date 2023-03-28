import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom"
import {Button, Col, Card, Row, Space, Layout, Menu, Modal, Checkbox, Input} from "antd";
import {CaretRightFilled, EditFilled, DeleteFilled} from "@ant-design/icons"

const Bucket = () => {

    const navigate = useNavigate()

    const { id } = useParams();
    const [bucket, setBucket] = useState()
    const [selected, setSelected] = useState([])
    const [edit, setEdit] = useState(false)
    const [add, setAdd] = useState(false)
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState({})
    const [data, setData]=useState([])
    const [cardBody, setCardBody]=useState({id:"", title:"", url:"", bucket:"" })
    const [editBody, setEditBody]=useState({id:"", title:"", url:"", bucket:"" })

    useEffect( () =>{
        const call = async () =>{
            setBucket(id.toUpperCase())
            const response = await fetch("http://localhost:3500/cards?bucket="+id)
            const res = await response.json()
            setData(res)
        }
        call()

    },[id])

    //
    const uuidv4 = () => {
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    const handleChange = (event) => {
        setCardBody({ ...cardBody, [event.target.name]: event.target.value });
    };

    const handleEditChange = (event) => {
        console.log(100)
        setEditBody({ ...editBody, [event.target.name]: event.target.value });
    };

    //Select Card Modal
    const selectCard = (id) => {
        console.log(id)
        if(!(selected.find((e) => {return e===id})))
            setSelected(prevArray => [...prevArray, id])
        else{
            const newarr = selected.filter((e) => {return e!=id})
            setSelected(newarr)
        }
        console.log(selected)
    }

    //DB Operations
    //Add Card
    const addCard = async () => {
        setCardBody({ ...cardBody, id: uuidv4()});
        const response = await fetch("http://localhost:3500/cards",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cardBody)
        })
        console.log(response)
        if(response){
            setAdd(false)
            window.location.reload()
            alert("Card Added")
        }
    }

    //Delete Cards
    const deleteSelected = async () => {
        for (let i=0; i<selected.length; i++){
            const response = await fetch("http://localhost:3500/cards/" + selected[i],{
                method: "Delete",
            })
        }
        setAdd(false)
        window.location.reload()
    }

    const editCard = async (card) => {
        console.log(editBody)
        const response = await fetch("http://localhost:3500/cards/" + editBody.id,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editBody)
        })
        console.log(response)
        if(response){
            setAdd(false)
            window.location.reload()
        }
    }

    //History Adder
    const addtoHistory = async (card) => {
        const d = new Date()

        const historyBody = {
            id: uuidv4(),
            title: card.title,
            url: card.url,
            timestamp:  d
        }

        const response = await fetch("http://localhost:3500/history",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(historyBody)
        })
    }

    //Add Card Modal
    const addModal = () => {
        setAdd(true)
    }
    //Edit Card Modal
    const showEdit = (card) => {
        setEdit(true)
        setModal(card)
        console.log(card)
        setEditBody(card)
    };

    //Video Modal
    const showModal = (card) => {
        setOpen(true)
        setModal(card)
    };

    //Close Modal
    const handleCancel = () => {
        setOpen(false)
        setEdit(false)
        setAdd(false)
    }

    return(
        <div className="body-content">

            <h1>{bucket}</h1>

            <Button type="primary" style={{margin:"1% 0 2% 0", width:"5%", backgroundColor:"#1C6758"}} onClick={addModal}>+ Add</Button>
            <Modal
                title={"Add New Card"}
                open={add}
                onCancel={handleCancel}
                onOk={addCard}
            >
                <Input name="title" onChange={(e) =>{handleChange(e)}} placeholder="Card Name" value={cardBody.title}/>
                <Input name="url" onChange={(e) =>{handleChange(e)}} placeholder="Add Video URL" value={cardBody.url}/>
                <Input name="bucket" onChange={(e) =>{handleChange(e)}} placeholder="Existing Bucket / New Bucket" value={cardBody.bucket}/>
            </Modal>

            {((selected.length!=0)?<Button onClick={deleteSelected} type="primary" danger style={{margin:"1% 0 2% 1%"}}><DeleteFilled/>Delete</Button>:null)}
            <Row gutter={[16,16]}>
                    {data.map(card =>(
                        <Col span={6}>
                            <Card title={(card.title)} style={{background: "#57C5B6"}}>


                                <Button style={{background:"#002B5B", color:"white", border:0}} onClick={() => {showModal(card); addtoHistory(card)}}> <CaretRightFilled /> Play Video</Button>
                                <Modal title={modal.title} open={open} onCancel={handleCancel}>
                                    < iframe width = "400" height = "200" src = {modal.url} />
                                </Modal>

                                <EditFilled onClick={() => {showEdit(card)}} style={{marginLeft:"10%"}}/>
                                <Modal title={modal.title+ " Edit"} open={edit} onCancel={handleCancel} onOk={() => {editCard()}}>
                                        <Input name="title" onChange={(e) =>{handleEditChange(e)}} placeholder="Card Name" value={editBody.title}/>
                                        <Input name="url" onChange={(e) =>{handleEditChange(e)}} placeholder="Add Video URL" value={editBody.url}/>
                                        <Input name="bucket" onChange={(e) =>{handleEditChange(e)}} placeholder="Move to" value={editBody.bucket}/>
                                </Modal>

                                <Checkbox style={{marginLeft:"15%"}} onClick={() => {selectCard(card.id)}}></Checkbox>

                            </Card>
                        </Col>
                    ))}
            </Row>
        </div>
    )
}

export default Bucket