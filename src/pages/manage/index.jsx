import React, { useState,useEffect } from 'react'
import FeedBack from '../../components/FeedBack';
import { db } from "../../api/firebaseConfig"; 
import { BtnBack, Wrap,Title,BtnFeedback,WrapFeed,Nickname,Feed, ContFeed ,BtnFeed,BtnSetting} from '../../styles/feedbackStyle';
import btnBack from '../../assets/images/btnBack.png'
import "firebase/firestore"; 
import Image from 'next/image';
import FeedbackModal from '../../components/modal/FeedbackModal'
import useCustomModal from "../../hooks/useCustomModal";
import ModalPortal from "../../components/modal/ModalPortal";
import ConfirmModal from '../../components/modal/ConfirmModal';
import Login from '../../components/Login';
import 나가기 from '../../assets/images/나가기.svg'
import setting from '../../assets/images/settings.svg'
import GoogleAd from "../../hooks/GoogleAd";


export default function index() {
const arr = [
    {name:"냥",
    comment:"안녕하세요",
    datetime:"23.03.02",
    secret:true},
    {name:"냥냥",
        comment:"나영너리오ㅓ랸얼ㄴ나영너리오ㅓ랸얼ㄴ나영너리오ㅓ랸얼ㄴ나영너리오ㅓ랸얼ㄴ나영너리오ㅓ랸얼ㄴ나영너리오ㅓ랸얼ㄴ나영너리오ㅓ랸얼ㄴ",
        datetime:"20230302",
        secret:true},
    {name:"뇽뇽",
    comment:"나영너리오ㅓ랸얼ㄴ",
    datetime:"20230302",
    secret:false},
    ]
    const {
        modalOpen,
        selected,
        modalSecondOpen,
        setModalSecondOpen,
        setModalOpen,
        showModal,
    } = useCustomModal();
const [array, setArray]=useState([]);
const [select, setSelect]=useState();
const [isLoading, setIsLoading]=useState(true);

useEffect(()=>{
    db.collection('feedback').get().then((결과)=>{
        let arr=[]
        결과.forEach((doc)=>{
        
        arr.push({...doc.data(),...{id:doc.id}});
        console.log(arr);
}
            )
        // if(!arr[-1]){
        //     arr.pop()
        // }
        const arrSort = arr.sort((a,b)=>{
            return b.publish - a.publish
        }) 
        
        setArray(arrSort)
    })
    
},[modalOpen, modalSecondOpen])

const showSecondModal = (e)=>{
    setSelect(e.target.id)
    console.log(select);
    setModalSecondOpen(true)
    // console.log();
}



if(isLoading){

    return(
        <Login setIsLoading={setIsLoading}/>
    )
}else{

        return (
            
        <div className='feedback'>
            <Wrap>
            <BtnBack src={btnBack} alt="" onClick={()=>window.close()}/>
            <Title>피드백을 남겨주세요!</Title>
            <ContFeed type="manage">
                {array.map((a)=>
                    <WrapFeed key={a.id} >
                        <Nickname>
                            <p>{a.nickname}</p>
                            <span>{a.datetime}</span>
                        </Nickname>
                        <Feed attr={a.secret}>
                            <BtnSetting src={setting} width="16" height="16"  onClick={showModal} id={a.id} attr={modalOpen} type="setting"/>
                            <BtnSetting  src={나가기} width="12" height="12" onClick={showSecondModal} id={a.id} attr={modalSecondOpen}/>
                            <p>
                                {a.comment}
                            </p>
                        </Feed>
                    </WrapFeed>
                )}         
            </ContFeed>
            <ModalPortal>
                    {modalOpen && 
                        <FeedbackModal 
                                modalOpen={modalOpen}
                                selected={selected}
                                setModalOpen={setModalOpen} 
                                type="feedback"
                                />}
                    {modalSecondOpen && 
                    <ConfirmModal 
                            modalOpen={modalOpen}
                            selected={select}
                            setModalOpen={setModalSecondOpen} 
                            type="feedback"
                            />
                            
                                }    
            </ModalPortal>  
            <GoogleAd/>
            </Wrap>
        </div>
    )
    }
}
