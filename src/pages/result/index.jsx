import React, { useEffect, useState } from "react";
import {
    Wrap,
    ContYear,
    Share,
    ContAnswer,
    Answer,
    AnswerTitle,
    ImageFeed,
    SpanFeed,
    SpanFeedB,
    ContBtn,
} from "../../styles/resultStyle";
import { useSelector } from "react-redux";
import { BtnResult, BtnContYear } from "../../components/Button";
import kakao from "../../assets/images/kakao.png";
import link from "../../assets/images/link.png";
import download from "../../assets/images/download.png";
import facebook from "../../assets/images/facebook.png";
import feedback from "../../assets/images/review.png";
import image from "../../assets/images/main.png";
import GoogleAd from "../../hooks/GoogleAd";
import Image from "next/image";
import useCopyClipBoard from "../../hooks/useCopyClipBoard";
import Card from "../../components/Card";
import { useRef } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";

export default function Index() {
    const url = "https://whatisthissong.swygbro.com";
    const count = useSelector((state) => state.user.value);
    const inputRef = useRef(null);
    const arrMusic = [];
    const [isCopy, onCopy] = useCopyClipBoard();
    const { query } = useRouter();
    const text = `${url}/result?name=${query.name}&year=${query.year}&score=${query.score}`;
    let [resultImg, setResultImg] = useState();
    let [levelResult, setLevelResult] = useState([]);

    useEffect(() => {
        if (query.score > 9) {
            setResultImg("result1");
            setLevelResult([
                `갓 오브 뮤직`,
                `당신의 삶의 유일한 보약은 music..?\/어떻게 이걸 다 맞히죠
            일반인의 권한으로 한문제도 빠짐 없이
            모두 맞혀버린 당신에게는
            갓 오브 뮤직 상을 드리고 싶습니다.`,
            ]);
        } else if (query.score > 6) {
            setResultImg("result2");
            setLevelResult([
                `음악은 나의 삶`,
                `이 정도는 껌이지\/내 삶에서 음악은 빼놓을 수 없다.
                외출할 때 이어폰 챙기는건 필수잖아~
                음악과 항상 함께하는 life를 즐기는 당신!
                가요계의 마스터로 임명합니다.`,
            ]);
        } else if (query.score > 3) {
            setResultImg("result3");
            setLevelResult(
                `유행곡은 아는 정도`,
                `아 분명히 아는 노랜데...\/아무리 생각해도 모르겠다...
                그래도 시대에 뒤쳐지지 않게
                나름 이 당시 유행곡은 알고있지!
                그런 당신은 유행에 뒤쳐지지 않는 타입!`
            );
        } else if (query.score > 0) {
            setResultImg("result4");
            setLevelResult([
                `나 이런거 잘몰라...`,
                `내 인생에 가요는\/그렇게 중요하지 않다구^_^;
                난. 나만의 길을 간다.
                다 각자 취향의 노래가 있는거지^^
                (혹은 미디어와 거리를 두는 타입일수도...)`,
            ]);
        } else {
            setResultImg("result5");
            setLevelResult([
                `속세를 벗어남`,
                `미디어로부터 멀리 떠나\/속세를 벗어난 삶을 사셨나요?
                혹은 외국인일 가능성도 있겠네요!
                도파민 중독으로부터 벗어나
                건강한...삶을 살고 있는 당신, 응원합니다!`,
            ]);
        }
    }, [query]);

    useEffect(() => {
        if (!kakao.isInitialized()) {
            kakao.init("a5eeb8ae193084c262275b9c23960ce8");
        }
    }, []);
    const onClicFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${url}/result?name=${query.name}&year=${query.year}&score=${query.score}/`
        );
    };
    const shareKakao = () => {
        kakao.Link.sendDefault({
            objectType: "feed",
            content: {
                title: levelResult[0],
                description: levelResult[1],
                imageUrl: `${url}/${resultImg}.png`,
                link: {
                    mobileWebUrl: url,
                    webUrl: url,
                },
            },
            buttons: [
                {
                    title: "친구 결과 확인하기",
                    link: {
                        mobileWebUrl: text,
                        webUrl: text,
                    },
                },
                {
                    title: "문제 맞추러 가기",
                    link: {
                        mobileWebUrl: url,
                        webUrl: url,
                    },
                },
            ],
        });
    };

    const handleCopyClipBoard = () => {
        onCopy(text);
    };
    const onDownloadBtn = () => {
        alert("이미지 저장이 안될 시 브라우저를 크롬으로 변경해주세요");
        const card = inputRef.current;
        domtoimage.toBlob(card).then((blob) => {
            saveAs(blob, `${query.score}'s_card.png`);
        });
    };

    const btnShare = [
        {
            image: download,
            title: "이미지저장",
            handle: onDownloadBtn,
        },
        { image: link, title: "링크복사", handle: handleCopyClipBoard },
        { image: kakao, title: "카카오톡", handle: shareKakao },
        { image: facebook, title: "페이스북", handle: onClicFacebook },
    ];
    return (
        <div className={`color${query.year}`}>
            <ImageFeed src={image} style={{ display: "none" }} />
            <Wrap>
                <Card ref={inputRef} year={`color${count.year}`} data={query} />

                <p>공유하기</p>
                <ContYear attr="cont_share">
                    {btnShare.map((a) => (
                        <ContYear attr="share">
                            <Image
                                src={a.image}
                                onClick={a.handle}
                                style={{ cursor: "pointer" }}
                            />
                            <Share>{a.title}</Share>
                        </ContYear>
                    ))}
                </ContYear>
                {count.year !== "" && (
                    <ContAnswer>
                        <AnswerTitle>정답/출처</AnswerTitle>
                        {count.music.map((x) => (
                            <Answer>
                                {x.singer.split("/")[0]}-{x.title.split("/")[0]}
                                (https://youtu.be/{x.url})
                            </Answer>
                        ))}
                    </ContAnswer>
                )}

                <BtnResult type="button" href="/">
                    처음으로 돌아가기
                </BtnResult>
                <BtnContYear attr="feedback" href="/feedback" legacyBehavior>
                    <a target="_blank">
                        <ContBtn>
                            <ImageFeed src={feedback} />
                            <SpanFeedB>
                                리뷰 작성하기
                                <br />
                                /보러가기
                            </SpanFeedB>
                            <SpanFeed>
                                리뷰 작성하기
                                <br />
                                /보러가기
                            </SpanFeed>
                        </ContBtn>
                    </a>
                </BtnContYear>
                <GoogleAd />
            </Wrap>
        </div>
    );
}
