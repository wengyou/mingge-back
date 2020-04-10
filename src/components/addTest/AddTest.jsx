import React, { useState, useEffect} from "react";
import { connect } from 'react-redux'
import {Button, Input, Radio, Modal, InputNumber} from 'antd'
import { PlusOutlined, ExclamationCircleOutlined  } from '@ant-design/icons';
import * as test from '../../redux/action/test';
import './addTest.scss'

const { confirm } = Modal;
const AddTest = props => {
    const {addTest, saveTest} = props;
    const [classId, setClassId] = useState(1);
    const [free, setFree] = useState(0);
    const [type, setType] = useState(1);
    const [visible, setVisible] = useState(false);
    const [count, setCount] = useState(1);
    const [imgArr, setImgArr] = useState([0]);
    const [videoArr, setVideoArr] = useState([0]);
    const [audioArr, setAudioArr] = useState([0]);
    const [answerImgArr, setAnswerImgArr] = useState([0]);
    const [answerVideoArr, setAnswerVideoArr] = useState([0]);
    const [answerAudioArr, setAnswerAudioArr] = useState([0]);
    const [answerCount, setAnswerCount] = useState(0);
    const [option, setOption] = useState([0]);
    const [optionAnswers, pushOptionAnswer] = useState([]);
    const [images, pushImage] = useState([]);
    const [videos, pushVideo] = useState([]);
    const [audios, pushAudio] = useState([]);
    const [answerImages, pushAnswerImage] = useState([]);
    const [answerVideos, pushAnswerVideo] = useState([]);
    const [answerAudios, pushAnswerAudio] = useState([]);
    const [questions, pushQuestion] = useState([]);
    const [questionsFlag, setQuestionFlag] = useState('');
    const [answerFlag, setAnswerFlag] = useState('');
    const [submitFlag, setSubmitFlag] = useState('');
    const [saveFlag, setSaveFlag] = useState('');
    const [answers, pushAnswer] = useState([]);
    const [answerObj, setAnswerObj] = useState({"test": '', "value": '', "refer": '', "answer": ''});
    const [form, setValue] = useState({
        "title": '',
        "introduction": '',
        "cover_image": '',
        "content": '',
        "image": '',
        "video": '',
        "audio": '',
        "answer_order": 1,
        "type": '',
        "refer_title": '',
        "title_value": '',
        "text": '',
        "answerImage": '',
        "answerVideo": '',
        "answerAudio": '',
        "footerFlag": ''
    });
    const testData = {
        "test": {
            "title": form.title,
            "class_id": classId,
            "introduction": form.introduction,
            "cover_image": form.cover_image,
            "is_free": free,
            "type": type
        },
        "questions": questions,
        "answers": answers
    };
    let questionItem = {
        "order": count,
        "type": type,
        "content": form.content,
        "image": images,
        "video": videos,
        "audio": audios,
        "answer": optionAnswers
    };
    let answerItem = {
        "answer_order": form.answer_order,
        "type": type,
        "refer_title": form.refer_title,
        "title_value": form.title_value,
        "text": form.text,
        "image": answerImages,
        "video": answerVideos,
        "audio": answerAudios
    };
    useEffect(() => {
        questionsFlag !== '' && pushQuestion(questions.concat(questionItem));
    }, [questionsFlag]);
    useEffect(() => {
        pushImage([]);
        pushAudio([]);
        pushVideo([]);
        pushOptionAnswer([]);
    }, [count]);
    useEffect(() => {
        answerFlag !== '' && pushAnswer(answers.concat(answerItem));
    }, [answerFlag]);
    useEffect(() => {
        submitFlag !== '' && addTest(testData);
    }, [submitFlag]);
    useEffect(() => {
        saveFlag !== '' && saveTest(testData);
    }, [saveFlag]);
    const showConfirm = () => {
        confirm({
            title: '确定提交套题？',
            icon: <ExclamationCircleOutlined />,
            content: '提交后数据将保存到数据库中',
            onOk() {
                setSubmitFlag(new Date());
            },
            onCancel() {

            },
        });
    };
    const showSave = () => {
        confirm({
            title: '确定保存套题？',
            icon: <ExclamationCircleOutlined />,
            content: '提交后数据暂时保存，呈未上线状态，用户不可见',
            onOk() {
                setSaveFlag(new Date());
            },
            onCancel() {

            },
        });
    };
    return(
        <>
            <div style={{display: "flex"}}>
                <Button
                    className='save-btn'
                    onClick={() => {
                        form.answerImage !== '' && pushAnswerImage(answerImages.concat(form.answerImage));
                        form.answerVideo !== '' && pushAnswerVideo(answerVideos.concat(form.answerVideo));
                        form.answerAudio !== '' && pushAnswerAudio(answerAudios.concat(form.answerAudio));
                        setAnswerFlag(new Date());
                        showSave()
                    }}
                >
                    保存
                </Button>
            </div>
            <div className='add-container' >
                <div className='test'>
                    <h2>TEST</h2>
                    <div className='wrapper'>
                        <label className='add-label'>标题:</label>
                        <Input
                            className='add-input'
                            onChange={(e) => setValue({...form, "title": e.target.value})}
                        />
                    </div>
                    <div className='wrapper'>
                        <label className='add-label'>类目:</label>
                        <Radio.Group
                        value={classId}
                        onChange={
                            (e) => {setClassId(e.target.value)}
                        }
                    >
                        <Radio value={1}>性格</Radio>
                        <Radio value={2}>能力</Radio>
                        <Radio value={3}>职业</Radio>
                        <Radio value={4}>情感</Radio>
                        <Radio value={5}>趣味</Radio>
                    </Radio.Group>
                    </div>
                    <div className='wrapper'>
                        <label className='add-label'>介绍:</label>
                        <Input
                            className='add-input'
                            onChange={(e) => {setValue({...form, "introduction": e.target.value})}}
                        />
                    </div>
                    <div className='wrapper'>
                        <label className='add-label'>图片链接:</label>
                        <Input
                            className='add-input'
                            onChange={(e) => {setValue({...form, "cover_image": e.target.value})}}
                        />
                    </div>
                    <div className='wrapper'>
                        <label>费用：</label>
                        <Radio.Group
                            style={{width: '28vw', display: "flex", justifyContent: "space-around"}}
                            value={free}
                            onChange={
                                (e) => {setFree(e.target.value)}
                            }
                        >
                            <Radio value={0}>免费</Radio>
                            <Radio value={1}>收费</Radio>
                        </Radio.Group>
                    </div>
                    <div className='wrapper'>
                        <label>类型：</label>
                        <Radio.Group
                        style={{width: '28vw', display: "flex", justifyContent: "space-around"}}
                        value={type}
                        onChange={
                            (e) => {setType(e.target.value)}
                        }
                    >
                        <Radio value={1}>加减分类型</Radio>
                        <Radio value={2}>跳转类型</Radio>
                    </Radio.Group>
                    </div>
                    <Button onClick={() => {setVisible(true)}}>添加套题问题</Button>
                    <Modal
                        visible={visible}
                        title={`问题${count}`}
                        onOk={() => {setVisible(false)}}
                        onCancel={() => {setVisible(false)}}
                        footer={[
                            <Button
                                key="next"
                                onClick={
                                    () => {
                                        pushImage(images.concat(form.image));
                                        pushVideo(videos.concat(form.video));
                                        pushAudio(audios.concat(form.audio));
                                        pushOptionAnswer(optionAnswers.concat(answerObj));
                                        setQuestionFlag(new Date());
                                        setImgArr([0]);
                                        setVideoArr([0]);
                                        setAudioArr([0]);
                                        setOption([0]);
                                        setCount(count+1);
                                    }
                                }
                            >
                                下一题
                            </Button>,
                            <Button
                                key="submit"
                                type="primary"
                                onClick={
                                    () => {
                                        pushImage(images.concat(form.image));
                                        pushVideo(videos.concat(form.video));
                                        pushAudio(audios.concat(form.audio));
                                        pushOptionAnswer(optionAnswers.concat(answerObj));
                                        setQuestionFlag(new Date());
                                        setImgArr([0]);
                                        setVideoArr([0]);
                                        setAudioArr([0]);
                                        setOption([0]);
                                        setCount(count+1);
                                        setVisible(false);
                                    }
                                }
                            >
                                完成
                            </Button>,
                        ]}
                    >
                        <div key={count}>
                            <div className='modal-wrapper1'>
                                <label className='modal-label'>类型:</label>
                                <Radio.Group
                                    style={{width: '10vw', display: "flex", justifyContent: "space-around"}}
                                    value={type}
                                    onChange={
                                        (e) => {setType(e.target.value)}
                                    }
                                >
                                    <Radio value={1}>加减分类型</Radio>
                                    <Radio value={2}>跳转类型</Radio>
                                </Radio.Group>
                            </div>
                            <div className='modal-wrapper2'>
                                <label className='modal-label'>内容:</label>
                                <Input
                                    className='modal-input'
                                    onChange={(e) => setValue({...form, "content": e.target.value})}
                                />
                            </div>
                            <div className='modal-wrapper3'>
                                <label className='modal-label'>图片链接:</label>
                                <div>
                                    {
                                        imgArr.map((item) => {
                                            return(
                                                <div key={item} className='imgArr-wrapper'>
                                                    <Input
                                                        className='imgArr-input'
                                                        onChange={(e) => {setValue({...form, "image": e.target.value})}}
                                                    />
                                                    <Button
                                                        icon={<PlusOutlined />}
                                                        onClick={
                                                            () => {
                                                                setImgArr(imgArr.concat(item+1));
                                                                pushImage(images.concat(form.image))
                                                            }
                                                        }
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='modal-wrapper3'>
                                <label className='modal-label'>视频链接:</label>
                                <div>
                                    {
                                        videoArr.map((item) => {
                                            return(
                                                <div key={item} className='imgArr-wrapper'>
                                                    <Input
                                                        className='imgArr-input'
                                                        onChange={(e) => {setValue({...form, "video": e.target.value})}}
                                                    />
                                                    <Button
                                                        icon={<PlusOutlined />}
                                                        onClick={
                                                            () => {
                                                                setVideoArr(videoArr.concat(item+1));
                                                                pushVideo(videos.concat(form.video))
                                                            }
                                                        }
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='modal-wrapper3'>
                                <label className='modal-label'>音频链接:</label>
                                <div>
                                    {
                                        audioArr.map((item) => {
                                            return(
                                                <div key={item} className='imgArr-wrapper'>
                                                    <Input
                                                        className='imgArr-input'
                                                        onChange={(e) => setValue({...form, "audio": e.target.value})}
                                                    />
                                                    <Button
                                                        icon={<PlusOutlined />}
                                                        onClick={
                                                            () => {
                                                                setAudioArr(audioArr.concat(item+1));
                                                                pushAudio(audios.concat(form.audio))
                                                            }
                                                        }
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='question-answer'>
                                <h3>答案：</h3>
                                {
                                    option.map(item => {
                                        return(
                                            <div key={item} style={{marginTop: '1rem'}}>
                                                <div className='modal-wrapper4'>
                                                    <label className='modal-label'>test{item+1}:</label>
                                                    <Input
                                                        className='modal-input'
                                                        onChange={(e) => setAnswerObj({...answerObj, "test": e.target.value})}
                                                    />
                                                </div>
                                                <div style={{marginTop: '1rem'}}>
                                                    <label>value:</label>
                                                    <InputNumber
                                                        min={-10}
                                                        max={20}
                                                        defaultValue={0}
                                                        onChange={(e) => setAnswerObj({...answerObj, "value": e})}
                                                    />
                                                    <label style={{marginLeft: '1.5rem'}}>refer:</label>
                                                    <InputNumber
                                                        min={-10}
                                                        max={20}
                                                        defaultValue={0}
                                                        onChange={(e) => setAnswerObj({...answerObj, "refer": e})}
                                                    />
                                                    <label style={{marginLeft: '1.5rem'}}>answer:</label>
                                                    <InputNumber
                                                        min={-10}
                                                        max={20}
                                                        defaultValue={0}
                                                        onChange={(e) => setAnswerObj({...answerObj, "answer": e})}
                                                    />
                                                    <Button
                                                        icon={<PlusOutlined />}
                                                        style={{width: '100%', marginTop: '1rem'}}
                                                        onClick={
                                                            () => {
                                                                setOption(option.concat(item+1));
                                                                pushOptionAnswer(optionAnswers.concat(answerObj));
                                                            }
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )

                                    })
                                }
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className='answer' key={answerCount}>
                    <h2>answers</h2>
                    <div className='wrapper'>
                        <label>answer_order:</label>
                        <InputNumber
                            min={-10}
                            max={20}
                            defaultValue={1}
                            onChange={(e) => setValue({...form, "answer_order": e}) }
                        />
                        <label style={{marginLeft: '3rem'}}>type:</label>
                        <InputNumber
                            key={type}
                            min={0}
                            max={4}
                            defaultValue={type}
                            onChange={(e) => setType(e) }
                        />
                    </div>
                    <div className='wrapper'>
                        <label className='answer-label'>refer_title:</label>
                        <Input onChange={(e) => setValue({...form, "refer_title": e.target.value})} />
                    </div>
                    <div className='wrapper'>
                        <label className='answer-label'>title_value:</label>
                        <Input onChange={(e) => setValue({...form, "title_value": e.target.value})} />
                    </div>
                    <div className='wrapper'>
                        <label className='answer-label'>text:</label>
                        <Input onChange={(e) => setValue({...form, "text": e.target.value})} />
                    </div>
                    <div className='wrapper'>
                        <label className='answer-label'>图片链接:</label>
                        <div>
                            {
                                answerImgArr.map((item) => {
                                    return(
                                        <div key={item} className='answerImgArr-wrapper'>
                                            <Input
                                                className='answerImgArr-input'
                                                onChange={(e) => setValue({...form, "answerImages": e.target.value})}
                                            />
                                            <Button
                                                icon={<PlusOutlined />}
                                                onClick={
                                                    () => {
                                                        setAnswerImgArr(answerImgArr.concat(item+1));
                                                        pushAnswerImage(answerImages.concat(form.answerImage))
                                                    }
                                                }
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='wrapper'>
                        <label className='answer-label'>视频链接:</label>
                        <div>
                            {
                                answerVideoArr.map((item) => {
                                    return(
                                        <div key={item} className='answerImgArr-wrapper'>
                                            <Input
                                                className='answerImgArr-input'
                                                onChange={
                                                    (e) => setValue({...form, "answerVideo": e.target.value})
                                                }
                                            />
                                            <Button
                                                icon={<PlusOutlined />}
                                                onClick={
                                                    () => {
                                                        setAnswerVideoArr(answerVideoArr.concat(item+1));
                                                        pushAnswerVideo(answerVideos.concat(form.answerVideo))
                                                    }
                                                }
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='wrapper'>
                        <label className='answer-label'>音频链接:</label>
                        <div>
                            {
                                answerAudioArr.map((item) => {
                                    return(
                                        <div key={item} className='answerImgArr-wrapper'>
                                            <Input className='answerImgArr-input' />
                                            <Button
                                                icon={<PlusOutlined />}
                                                onClick={
                                                    () => {
                                                        setAnswerAudioArr(answerAudioArr.concat(item+1));
                                                        pushAnswerAudio(answerAudios.concat(form.answerAudio))
                                                    }
                                                }
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Button
                        onClick={
                            () => {
                                form.answerImage !== '' && pushAnswerImage(answerImages.concat(form.answerImage));
                                form.answerVideo !== '' && pushAnswerVideo(answerVideos.concat(form.answerVideo));
                                form.answerAudio !== '' && pushAnswerAudio(answerAudios.concat(form.answerAudio));
                                setAnswerAudioArr([0]);
                                setAnswerVideoArr([0]);
                                setAnswerImgArr([0]);
                                setAnswerFlag(new Date());
                                setAnswerCount(answerCount+1);
                            }
                        }
                    >
                        下一题答案
                    </Button>
                    <Button
                        style={{marginLeft: '2rem'}}
                        onClick={
                            () => {
                                form.answerImage !== '' && pushAnswerImage(answerImages.concat(form.answerImage));
                                form.answerVideo !== '' && pushAnswerVideo(answerVideos.concat(form.answerVideo));
                                form.answerAudio !== '' && pushAnswerAudio(answerAudios.concat(form.answerAudio));
                                setAnswerFlag(new Date());
                                showConfirm()
                            }
                        }
                    >
                        完成
                    </Button>
                </div>
            </div>
        </>
    )
};
export default connect(
    state => ({

    }),
    dispatch => ({
        addTest(args) {
            dispatch(test.addTest(args))
        },
        saveTest(args) {
            dispatch(test.saveTest(args))
        },
    })
)(AddTest);
