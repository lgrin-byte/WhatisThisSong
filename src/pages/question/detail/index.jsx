import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import YouTube from "react-youtube";

import note from "../../../assets/images/note.png";
import play from "../../../assets/images/play.png";
import replay from "../../../assets/images/replay.png";
import pause from "../../../assets/images/pause.png";
import timer from "../../../assets/images/timer.png";
import { Btn } from "../../../components/Button";
import { Cont_Inp, Title, Inp, MentEng } from "../../../components/InputAnswer";
import { Player } from "../../../components/Youtube";
import {
    Wrap,
    Div,
    Ment,
    Img,
    Rate,
    MyProgress,
    StateBar,
    TimerImg,
} from "../../../styles/questionStyle";
import useInterval from "../../../hooks/useInterval";
import year2020 from "../../../year2020";
import Link from "next/link";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../hooks/count/counterSlice";

export default function Question(props) {
    const count = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    let reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;


    
    // let count.music=[]
    const answerArr = [];
    const youtubeRef = useRef();
    const [playEvent, setPlayEvent] = useState();
    const [playState, setPlayState] = useState();
    const [singer, setSinger] = useState();
    const [title, setTitle] = useState();
    const [isActive, setIsActive] = useState("question");
    const [level, setLevel] = useState(1);
    // const arr = [1,2,3,4,5,6,7,8,9,10];
    const [second, setSecond] = useState(35);

    useEffect(() => {

            if (count.music.length !== 0) {
                youtubeRef.current.updateVideo();
            } else {
                Router.push("/");
            }
            
            
        }, []);

        useInterval(
            () => {
                setSecond(second - 1);
            },
            1000,
            second,
            playState
        );

    
    const state = {
        play: {
            image: play,
            onClick: () => {
                playEvent
                    ? playEvent.target.playVideo()
                    : youtubeRef.current.updateVideo();
            },
        },
        replay: {
            image: replay,
            onClick: () => {
                youtubeRef.current.updateVideo();
            },
        },
        pause: {
            image: pause,
            onClick: () => {
                playEvent.target.pauseVideo();
            },
        },
    };

useEffect(()=>{
    if(playState==1){

        dispatch(
            login({
                name: count.name,
                music: count.music,
                year: count.year,
                musicImg: count.musicImg,
                score: count.score,
                state:1
            })
        );
    }
},[playState])


    const handleAnswer = (e) => {
        // Input??? ???????????? state??? ???????????? ??????.
        if (e.target.name === "singer") setSinger(e.target.value);
        else if (e.target.name === "songName") setTitle(e.target.value);
        // (singer&title) ? setIsActive("change") : setIsActive("question")
    };

    const handleBtn = () => {
        if (level < 11 && second<35) {
            setLevel(level + 1);
            setSecond(35);
            handleCheck();
        } else {
            // Router.replace('/???')
        }
    };

    const handleCheck = () => {
        const answerTitle = count.music[level - 1]?.title.split("/");
        const answerSinger = count.music[level - 1]?.singer.split("/");
        let ?????? = 0;
        console.log(
            " Bad Girl Good Girl ANTIFRAGILE heartbeat 8282 HOT".includes(
                count.music[level - 1]?.title))
        for (let i of answerTitle) {
            i = i.toLowerCase().split(" ").join("");
            let resultData = title.toLowerCase().split(" ").join("").replace(reg, "");

            if (resultData === i) {
                ?????? += 1;
                break;
            }
        }

        for (let j of answerSinger) {
            j = j.toLowerCase().split(" ").join("");
            let resultData2 = singer.toLowerCase().split(" ").join("").replace(reg, "");

            if (resultData2 === j) {
                ?????? += 10;
                break;
            }
        }
        if (?????? === 11) {
            let score = count.score + 1;
            dispatch(
                login({
                    name: count.name,
                    music: count.music,
                    year: count.year,
                    musicImg: count.musicImg,
                    score: score,
                    state: 1 
                })
            );
        }else{
            dispatch(
                login({
                    name: count.name,
                    music: count.music,
                    year: count.year,
                    musicImg: count.musicImg,
                    score: count.score,
                    state: 1 
                })
            );
            // alert(`?????? ??????:${answerTitle}, ${answerSinger}`)
        }
    };

    useEffect(() => {
        if (singer && title) {
            setIsActive("change");
        } else {
            setIsActive("question");
        }
    }, [singer, title]);

    if (second === 0) {
        setLevel(level + 1);
        setSecond(30);
        handleCheck();
    }

    useEffect(() => {
        if (level === 11) {
            handleBtn();

            const targerPage = "/loading";
            Router.push(targerPage);
        }
        setSinger("");
        setTitle("");
    }, [level]);
    // // ???????????? ?????? ??????
    const preventClose = (e) => {
        e.preventDefault();
        e.returnValue = ""; // chrome????????? ????????? ???????????? ?????? ??????
    };

    // // ??????????????? ????????? ??? ??? ?????? ???????????? ??????
    useEffect(() => {
        (() => {
            window.addEventListener("beforeunload", preventClose);
        })();

        return () => {
            window.removeEventListener("beforeunload", preventClose);
        };
    }, []);

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            focusRef.current.focus();
        }
    };
    const focusRef = useRef();
    return (
        <div className={`color${count.year}`}>
            <Wrap>
                <Div type="header">
                    <Img src={note} alt="" />

                    <span className="span">{level}/10</span>

                    <div></div>
                    {count.music.map((a, i) => (
                        <Rate range={i + 1} level={level}></Rate>
                    ))}
                    {count.year === "All" ? (
                        <span className="span">Alltime</span>
                    ) : (
                        <span className="span">{count.year}s</span>
                    )}
                </Div>
                <Player>
                    <Image
                        src={count.musicImg}
                        alt=""
                        width="327"
                        height="223"
                    />
                    {playState === 1 ? (
                        <Image
                            className="btn_play"
                            alt=""
                            src={state["pause"].image}
                            onClick={state["pause"].onClick}
                        />
                    ) : (
                        <Image
                            className="btn_play"
                            alt=""
                            src={state["play"].image}
                            onClick={state["play"].onClick}
                        />
                    )}
                    <Image
                        className="btn_replay"
                        alt=""
                        src={state["replay"].image}
                        onClick={state["replay"].onClick}
                    />
                    {count.music[level - 1] && (
                        <YouTube
                            videoId={count.music[level - 1].url}
                            id="yotube"
                            ref={youtubeRef}
                            className="ir"
                            opts={{
                                width: "560",
                                height: "315",
                                playerVars: {
                                    start: 0.5,
                                    end: 11,
                                    autoplay: 1, //???????????? O
                                    rel: 0, //?????? ????????? ???????????? ?????? (?????? ?????? ?????? ?????????..)
                                    modestbranding: 1, // ????????? ?????? youtube ????????? ???????????? ??????
                                },
                            }}
                            onPlay={(e) => {
                                e.target.playVideo();
                                setPlayEvent(e);
                                setPlayState(e.data);
                            }}
                            onPause={(e) => {
                                setPlayState(e.data);
                            }}
                            onEnd={(e) => {
                                setPlayState(e.data);
                                setPlayEvent();
                                e.target.stopVideo(0);
                            }}
                        />
                    )}
                </Player>
                <MyProgress>
                    <StateBar className="stateBar" width={second}></StateBar>
                </MyProgress>
                <Div time={second}>
                    <TimerImg
                        className="vibration"
                        time={second}
                        src={timer}
                        alt=""
                    />
                    <p className="ment">????????? ?????? ?????? ????????? ??????<br/>?????? ??? 2-3??? ??????????????????!</p>
                    <span>{second}s</span>
                </Div>
                <Cont_Inp>
                    <Title attr={`point${count.year}`}>??????</Title>
                    <Inp
                        type="text"
                        onKeyPress={onKeyPress}
                        name="singer"
                        value={singer}
                        onChange={handleAnswer}
                    />
                </Cont_Inp>
                {"SS501 SES ses HOT H.O.T ".includes(count.music[level - 1]?.singer.split("/")[0]) && (
                    <MentEng>*(??????)??????/???????????? ???????????????.</MentEng>
                )}
                <Cont_Inp>
                    <Title attr={`point${count.year}`}>??????</Title>
                    <Inp
                        type="text"
                        name="songName"
                        ref={focusRef}
                        value={title}
                        onChange={handleAnswer}
                    />
                </Cont_Inp>
                {" Bad Girl Good Girl ANTIFRAGILE heartbeat 8282 HOT".includes(
                    count.music[level - 1]?.title.split("/")[0]
                ) && <MentEng>*(??????)??????/???????????? ???????????????.</MentEng>}
                <Ment>????????? ????????? ????????? ???????????? ?????????.</Ment>
                <Btn
                    href={level === 10 ? "/loading" : "#"}
                    attr={isActive}
                    onClick={handleBtn}
                    time={second}
                >
                    {level === 10 ? "???!" : "??????"}
                </Btn>
            </Wrap>
        </div>
    );
}
