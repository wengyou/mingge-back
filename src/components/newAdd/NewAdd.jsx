import React, {forwardRef, useEffect, useRef, useState} from "react";
import {connect} from 'react-redux';
import {
    Form,
    Input,
    Button,
    Select,
    Modal,
    InputNumber, message,
} from 'antd';
import { PlusOutlined, MinusCircleOutlined, ExclamationCircleOutlined  } from '@ant-design/icons';
import * as test from '../../redux/action/test';
import Questions from "../questions/Questions";
import Answer from "../answer/Answer";

const { confirm } = Modal;
const NewAdd = props => {
    const {addNewTest} = props;
    const [testData, setTestData] = useState({});
    const [submitFlag, setSubmitFlag] = useState('');
    //布局
    const buttonItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 4,
            },
        };
    const formLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 14,
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
    };
    //确认框
    function showConfirm() {
        confirm({
            title: '确认上传套题',
            icon: <ExclamationCircleOutlined />,
            content: '套题上传后可保存入数据库中，若要修改在update页面通过输入套题的tid，可以更新套题内容',
            onOk() {
                setSubmitFlag(new Date());
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    //questions部分
    let questions = [];
    let questionAnswers = {
        'test': '',
        'value': '',
        'refer': '',
        'answer': ''
    };
    const [questionsData, pushQuestionData] = useState([]);
    const [questionAnswersData, pushQuestionAnswerData] = useState([]);

    const [questionCount, pushQuestionCount] = useState([0]);
    const [questionAnswerCount, setQuestionAnswerCount] = useState(0);

    const [questionFlag, setQuestionFlag] = useState('');
    const [addQuestionAnswerFlag, setAddQuestionAnswerFlag] = useState('');
    const [nextQuestionFlag, setNextQuestionFlag] = useState('');
    // const [addFlag, setAddFlag] = useState(false);
    const [updateFlag, setUpdateFlag] = useState('');
    const [valueChangeFlag, setValueChangeFlag] = useState(false);
    const [finishFlag, setFinishFlag] = useState(false);

    const [questionVisible, setQuestionVisible] = useState(false);
    useEffect(() => {
        if (questionCount.length > 1) {
            questionFlag !== '' && pushQuestionCount(questionCount.pop());
            setNextQuestionFlag(new Date());
            questionFlag !== '' && pushQuestionCount(questionCount);
            setUpdateFlag(new Date())
        } else {
            questionFlag !== '' && pushQuestionCount([0])
        }
    }, [questionFlag]);
    useEffect(() => {
        nextQuestionFlag !== '' && setAddQuestionAnswerFlag(new Date());
    }, [nextQuestionFlag]);
    useEffect(() => {
        if (questionsData.length !== 0 && addQuestionAnswerFlag !== '') {
            questionsData[questionsData.length-1].answer = questionAnswersData;
            pushQuestionData(questionsData);
            pushQuestionAnswerData([]);
            setQuestionAnswerCount(0);
            finishFlag && setQuestionVisible(false);
            finishFlag && message.success('questions提交成功');
            !finishFlag && message.success('点击下一题后，上一题的answer字段内容修改无效，若需要修改，请在update页面进行');
        }
    }, [addQuestionAnswerFlag]);

    //Answers部分
    const [answers, pushAnswer] = useState([]);
    const [answerVisible, setAnswerVisible] = useState(false);
    const [answerCount, pushAnswerCount] = useState([0]);
    const [answerFinishFlag, setAnswerFinishFlag] = useState(false);

    console.log(testData);
    console.log(questionsData);
    console.log(answers);
    useEffect(() => {
        const data = {"test": testData, "questions": questionsData, "answers": answers};
        submitFlag !== '' && addNewTest(data);
    }, [submitFlag]);

    return(
        <div>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                onFinish={values => {
                    setTestData(values);
                    showConfirm();
                }}
                name={test}
            >
                <Form.Item label="标题" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="类目" name="class_id">
                    <Select>
                        <Select.Option value="1">性格</Select.Option>
                        <Select.Option value="2">能力</Select.Option>
                        <Select.Option value="3">职业</Select.Option>
                        <Select.Option value="4">情感</Select.Option>
                        <Select.Option value="5">趣味</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="介绍" name="introduction">
                    <Input />
                </Form.Item>
                <Form.Item label="背景图片" name="cover_image">
                    <Input />
                </Form.Item>
                <Form.Item label="服务" name="is_free">
                    <Select>
                        <Select.Option value="0">免费</Select.Option>
                        <Select.Option value="1">收费</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="类型" name="type">
                    <Select>
                        <Select.Option value="1">加减分类型</Select.Option>
                        <Select.Option value="2">跳转类型</Select.Option>
                    </Select>
                </Form.Item>
                <div>
                    <Button
                        style={{width: '100%', marginBottom: '1rem'}}
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => {
                            setQuestionVisible(true);
                        }}
                    >
                        添加问题
                    </Button>
                    <Modal
                        visible={questionVisible}
                        title={`添加问题`}
                        onCancel={() => setQuestionVisible(false)}
                        footer={null}
                    >
                        <div key={updateFlag}>
                            {
                                questionCount.map((item,index) => {
                                    return(
                                        <div key={index}>
                                            <Form
                                                {...formLayout}
                                                onFinish={values => {
                                                    if (finishFlag) {
                                                        pushQuestionAnswerData(questionAnswersData.concat(questionAnswers));
                                                        questions.push(values);
                                                        pushQuestionData(questionsData.concat(questions));
                                                        setNextQuestionFlag(new Date());
                                                    } else {
                                                        if (valueChangeFlag){
                                                            setValueChangeFlag(false);
                                                        } else {
                                                            pushQuestionAnswerData(questionAnswersData.concat(questionAnswers));
                                                            questions.push(values);
                                                            pushQuestionData(questionsData.concat(questions));
                                                            pushQuestionCount(questionCount.concat(item+1));
                                                            setNextQuestionFlag(new Date());
                                                        }
                                                    }
                                                }}
                                                onValuesChange={(changedValues, values) => {
                                                    if (questionsData.length >= index + 1){
                                                        Object.entries(changedValues).forEach(item => {
                                                            questions = questionsData;
                                                            questions[index][item[0]] = item[1];
                                                            pushQuestionData(questions);
                                                            setValueChangeFlag(true);
                                                        });
                                                    }
                                                }}
                                            >
                                                <Form.Item name="order" label="order">
                                                    <InputNumber min={1} max={20} defaultValue={1} />
                                                </Form.Item>
                                                <Form.Item label="type" name="type">
                                                    <Select>
                                                        <Select.Option value="1">加减分类型</Select.Option>
                                                        <Select.Option value="2">跳转类型</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item name="content" label="content">
                                                    <Input type="textarea" />
                                                </Form.Item>
                                                <Form.List name="images">
                                                    {(fields, { add, remove }) => {
                                                        return (
                                                            <div>
                                                                {fields.map((field, index) => (
                                                                    <Form.Item
                                                                        {...(index === 0 ? formLayout : formItemLayoutWithOutLabel)}
                                                                        label={index === 0 ? 'Image' : ''}
                                                                        required={false}
                                                                        key={field.key}
                                                                    >
                                                                        <Form.Item
                                                                            {...field}
                                                                            validateTrigger={['onChange', 'onBlur']}
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    whitespace: true,
                                                                                    message: "Please input passenger's name or delete this field.",
                                                                                },
                                                                            ]}
                                                                            noStyle
                                                                        >
                                                                            <Input placeholder="输入视频地址" style={{ width: '16rem', marginRight: 3 }} />
                                                                        </Form.Item>
                                                                        {fields.length > 1 ? (
                                                                            <MinusCircleOutlined
                                                                                className="dynamic-delete-button"
                                                                                onClick={() => {
                                                                                    remove(field.name);
                                                                                }}
                                                                            />
                                                                        ) : null}
                                                                    </Form.Item>
                                                                ))}
                                                                <Form.Item>
                                                                    <Button
                                                                        type="dashed"
                                                                        onClick={() => {
                                                                            add();
                                                                        }}
                                                                        style={{ width: '60%' }}
                                                                    >
                                                                        <PlusOutlined /> 添加图片
                                                                    </Button>
                                                                </Form.Item>
                                                            </div>
                                                        );
                                                    }}
                                                </Form.List>
                                                <Form.List name="video">
                                                    {(fields, { add, remove }) => {
                                                        return (
                                                            <div>
                                                                {fields.map((field, index) => (
                                                                    <Form.Item
                                                                        {...(index === 0 ? formLayout : formItemLayoutWithOutLabel)}
                                                                        label={index === 0 ? 'video' : ''}
                                                                        required={false}
                                                                        key={field.key}
                                                                    >
                                                                        <Form.Item
                                                                            {...field}
                                                                            validateTrigger={['onChange', 'onBlur']}
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    whitespace: true,
                                                                                    message: "Please input passenger's name or delete this field.",
                                                                                },
                                                                            ]}
                                                                            noStyle
                                                                        >
                                                                            <Input placeholder="输入音频地址" style={{ width: '16rem', marginRight: 3 }} />
                                                                        </Form.Item>
                                                                        {fields.length > 1 ? (
                                                                            <MinusCircleOutlined
                                                                                className="dynamic-delete-button"
                                                                                onClick={() => {
                                                                                    remove(field.name);
                                                                                }}
                                                                            />
                                                                        ) : null}
                                                                    </Form.Item>
                                                                ))}
                                                                <Form.Item>
                                                                    <Button
                                                                        type="dashed"
                                                                        onClick={() => {
                                                                            add();
                                                                        }}
                                                                        style={{ width: '60%' }}
                                                                    >
                                                                        <PlusOutlined /> 添加视频
                                                                    </Button>
                                                                </Form.Item>
                                                            </div>
                                                        );
                                                    }}
                                                </Form.List>
                                                <Form.List name="audios">
                                                    {(fields, { add, remove }) => {
                                                        return (
                                                            <div>
                                                                {fields.map((field, index) => (
                                                                    <Form.Item
                                                                        {...(index === 0 ? formLayout : formItemLayoutWithOutLabel)}
                                                                        label={index === 0 ? 'audio' : ''}
                                                                        required={false}
                                                                        key={field.key}
                                                                    >
                                                                        <Form.Item
                                                                            {...field}
                                                                            validateTrigger={['onChange', 'onBlur']}
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    whitespace: true,
                                                                                    message: "Please input passenger's name or delete this field.",
                                                                                },
                                                                            ]}
                                                                            noStyle
                                                                        >
                                                                            <Input placeholder="输入图片地址" style={{ width: '16rem', marginRight: 3 }} />
                                                                        </Form.Item>
                                                                        {fields.length > 1 ? (
                                                                            <MinusCircleOutlined
                                                                                className="dynamic-delete-button"
                                                                                onClick={() => {
                                                                                    remove(field.name);
                                                                                }}
                                                                            />
                                                                        ) : null}
                                                                    </Form.Item>
                                                                ))}
                                                                <Form.Item>
                                                                    <Button
                                                                        type="dashed"
                                                                        onClick={() => {
                                                                            add();
                                                                        }}
                                                                        style={{ width: '60%' }}
                                                                    >
                                                                        <PlusOutlined /> 添加音频
                                                                    </Button>
                                                                </Form.Item>
                                                            </div>
                                                        );
                                                    }}
                                                </Form.List>
                                                <Form.List name="answer">
                                                    {(fields, { add, remove }) => {
                                                        return (
                                                            <div>
                                                                {fields.map((field, index) => {
                                                                    return (
                                                                        <Form.Item
                                                                            {...(index === 0 ? formLayout : formItemLayoutWithOutLabel)}
                                                                            label={index === 0 ? 'answer' : ''}
                                                                            required={true}
                                                                            key={field.key}
                                                                        >
                                                                            <Form.Item label="test">
                                                                                <Input
                                                                                    style={{ width: '60%', marginRight: 8 }}
                                                                                    onChange={
                                                                                        e => {
                                                                                            questionAnswers.test = e.target.value;
                                                                                            if (questionAnswersData.length > index + 1){
                                                                                                questionAnswersData[index].test = e.target.value;
                                                                                                pushQuestionAnswerData(questionAnswersData);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                />
                                                                            </Form.Item>
                                                                            <Form.Item label="value">
                                                                                <Input
                                                                                    style={{ width: '60%', marginRight: 8 }}
                                                                                    onChange={
                                                                                        e => {
                                                                                            questionAnswers.value = e.target.value;
                                                                                            if (questionAnswersData.length > index + 1){
                                                                                                questionAnswersData[index].value = e.target.value;
                                                                                                pushQuestionAnswerData(questionAnswersData);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                />
                                                                            </Form.Item>
                                                                            <Form.Item label="refer">
                                                                                <Input
                                                                                    style={{ width: '60%', marginRight: 8 }}
                                                                                    onChange={
                                                                                        e => {
                                                                                            questionAnswers.refer = e.target.value;
                                                                                            if (questionAnswersData.length > index + 1){
                                                                                                questionAnswersData[index].refer = e.target.value;
                                                                                                pushQuestionAnswerData(questionAnswersData);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                />
                                                                            </Form.Item>
                                                                            <Form.Item label="answer">
                                                                                <Input
                                                                                    style={{ width: '60%', marginRight: 8 }}
                                                                                    onChange={
                                                                                        e => {
                                                                                            questionAnswers.answer = e.target.value;
                                                                                            if (questionAnswersData.length > index + 1){
                                                                                                questionAnswersData[index].answer = e.target.value;
                                                                                                pushQuestionAnswerData(questionAnswersData);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                />
                                                                            </Form.Item>
                                                                            {fields.length > 1 ? (
                                                                                <MinusCircleOutlined
                                                                                    className="dynamic-delete-button"
                                                                                    onClick={() => {
                                                                                        remove(field.name);
                                                                                        setQuestionAnswerCount(questionAnswerCount - 1);
                                                                                        // setAddFlag(true);
                                                                                        if (questionAnswersData.length > index + 1){
                                                                                            questionAnswersData.splice(index, 1);
                                                                                            pushQuestionAnswerData(questionAnswersData);
                                                                                            questionAnswers.test = '';
                                                                                            questionAnswers.value = '';
                                                                                            questionAnswers.refer = '';
                                                                                            questionAnswers.answer = '';
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            ) : null}
                                                                        </Form.Item>
                                                                    )
                                                                })}
                                                                <Form.Item>
                                                                    <Button
                                                                        type="dashed"
                                                                        onClick={() => {
                                                                            questionAnswerCount !== 0 && pushQuestionAnswerData(questionAnswersData.concat(questionAnswers))
                                                                            add();
                                                                            setQuestionAnswerCount(questionAnswerCount + 1);
                                                                        }}
                                                                        style={{ width: '60%' }}
                                                                    >
                                                                        <PlusOutlined /> 添加答案
                                                                    </Button>
                                                                </Form.Item>
                                                            </div>
                                                        );
                                                    }}
                                                </Form.List>
                                                <Form.Item>
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        style={{marginTop: '1rem'}}
                                                    >
                                                        下一题
                                                    </Button>
                                                    <Button
                                                        type="primary"
                                                        onClick={() => {
                                                            setFinishFlag(true);
                                                            message.success('数据已保存，请提交')
                                                        }}
                                                        style={{marginLeft: '1rem'}}
                                                    >
                                                        完成
                                                    </Button>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        style={{marginTop: '1rem'}}
                                                        disabled={!finishFlag}
                                                    >
                                                        提交
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    )
                                })
                            }
                            {/*<Button*/}
                            {/*    type="primary"*/}
                            {/*    onClick={() => {*/}
                            {/*        setQuestionFlag(new Date())*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    删除*/}
                            {/*</Button>*/}

                        </div>
                    </Modal>
                </div>
                <div>
                    <Button
                        style={{width: '100%'}}
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => {
                            setAnswerVisible(true);
                        }}
                    >
                        添加答案
                    </Button>
                    <Modal
                        visible={answerVisible}
                        title={`添加答案`}
                        onCancel={() => {setAnswerVisible(false)}}
                        footer={null}
                    >
                        {
                            answerCount.map((item, index) => {
                                return(
                                    <Form
                                        key={index}
                                        {...formLayout}
                                        onFinish={values => {
                                            if (answerFinishFlag){
                                                pushAnswer(answers.concat(values));
                                                setAnswerVisible(false);
                                                message.success('answers提交成功');
                                            } else {
                                                pushAnswer(answers.concat(values));
                                                pushAnswerCount(answerCount.concat(item + 1));
                                            }
                                        }}
                                        onValuesChange={(changedValues => {
                                            if (answers.length > index) {
                                                Object.entries(changedValues).forEach(item => {
                                                    answers[index][item[0]] = item[1];
                                                    pushAnswer(answers);
                                                })
                                            }
                                        })}
                                    >
                                        <Form.Item
                                            name="answer_order"
                                            label="answer_order"
                                        >
                                            <InputNumber min={1} max={20} defaultValue={1} />
                                        </Form.Item>
                                        <Form.Item label="type" name="type">
                                            <Select>
                                                <Select.Option value="1">加减分类型</Select.Option>
                                                <Select.Option value="2">跳转类型</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item name="refer_title" label="refer_title">
                                            <Input type="textarea" />
                                        </Form.Item>
                                        <Form.Item name="text" label="text">
                                            <Input type="textarea" />
                                        </Form.Item>
                                        <Form.List name="images">
                                            {(fields, { add, remove }) => {
                                                return (
                                                    <div>
                                                        {fields.map((field, index) => (
                                                            <Form.Item
                                                                {...formItemLayoutWithOutLabel}
                                                                label={index === 0 ? 'Image' : ''}
                                                                required={false}
                                                                key={field.key}
                                                            >
                                                                <Form.Item
                                                                    {...field}
                                                                    validateTrigger={['onChange', 'onBlur']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            whitespace: true,
                                                                            message: "Please input passenger's name or delete this field.",
                                                                        },
                                                                    ]}
                                                                    noStyle
                                                                >
                                                                    <Input placeholder="输入视频地址" style={{ width: '16rem', marginRight: 3 }} />
                                                                </Form.Item>
                                                                {fields.length > 1 ? (
                                                                    <MinusCircleOutlined
                                                                        className="dynamic-delete-button"
                                                                        onClick={() => {
                                                                            remove(field.name);
                                                                        }}
                                                                    />
                                                                ) : null}
                                                            </Form.Item>
                                                        ))}
                                                        <Form.Item>
                                                            <Button
                                                                type="dashed"
                                                                onClick={() => {
                                                                    add();
                                                                }}
                                                                style={{ width: '60%' }}
                                                            >
                                                                <PlusOutlined /> 添加图片
                                                            </Button>
                                                        </Form.Item>
                                                    </div>
                                                );
                                            }}
                                        </Form.List>
                                        <Form.List name="video">
                                            {(fields, { add, remove }) => {
                                                return (
                                                    <div>
                                                        {fields.map((field, index) => (
                                                            <Form.Item
                                                                {...formItemLayoutWithOutLabel}
                                                                label={index === 0 ? 'video' : ''}
                                                                required={false}
                                                                key={field.key}
                                                            >
                                                                <Form.Item
                                                                    {...field}
                                                                    validateTrigger={['onChange', 'onBlur']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            whitespace: true,
                                                                            message: "Please input passenger's name or delete this field.",
                                                                        },
                                                                    ]}
                                                                    noStyle
                                                                >
                                                                    <Input placeholder="输入音频地址" style={{ width: '16rem', marginRight: 3 }} />
                                                                </Form.Item>
                                                                {fields.length > 1 ? (
                                                                    <MinusCircleOutlined
                                                                        className="dynamic-delete-button"
                                                                        onClick={() => {
                                                                            remove(field.name);
                                                                        }}
                                                                    />
                                                                ) : null}
                                                            </Form.Item>
                                                        ))}
                                                        <Form.Item>
                                                            <Button
                                                                type="dashed"
                                                                onClick={() => {
                                                                    add();
                                                                }}
                                                                style={{ width: '60%' }}
                                                            >
                                                                <PlusOutlined /> 添加视频
                                                            </Button>
                                                        </Form.Item>
                                                    </div>
                                                );
                                            }}
                                        </Form.List>
                                        <Form.List name="audios">
                                            {(fields, { add, remove }) => {
                                                return (
                                                    <div>
                                                        {fields.map((field, index) => (
                                                            <Form.Item
                                                                {...formItemLayoutWithOutLabel}
                                                                label={index === 0 ? 'audio' : ''}
                                                                required={false}
                                                                key={field.key}
                                                            >
                                                                <Form.Item
                                                                    {...field}
                                                                    validateTrigger={['onChange', 'onBlur']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            whitespace: true,
                                                                            message: "Please input passenger's name or delete this field.",
                                                                        },
                                                                    ]}
                                                                    noStyle
                                                                >
                                                                    <Input placeholder="输入图片地址" style={{ width: '16rem', marginRight: 3 }} />
                                                                </Form.Item>
                                                                {fields.length > 1 ? (
                                                                    <MinusCircleOutlined
                                                                        className="dynamic-delete-button"
                                                                        onClick={() => {
                                                                            remove(field.name);
                                                                        }}
                                                                    />
                                                                ) : null}
                                                            </Form.Item>
                                                        ))}
                                                        <Form.Item>
                                                            <Button
                                                                type="dashed"
                                                                onClick={() => {
                                                                    add();
                                                                }}
                                                                style={{ width: '60%' }}
                                                            >
                                                                <PlusOutlined /> 添加音频
                                                            </Button>
                                                        </Form.Item>
                                                    </div>
                                                );
                                            }}
                                        </Form.List>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                style={{marginTop: '1rem'}}
                                            >
                                                next answer
                                            </Button>
                                            <Button
                                                type="primary"
                                                style={{marginLeft: '1rem'}}
                                                onClick={() => {
                                                    setAnswerFinishFlag(true);
                                                    message.success('数据保存成功，请提交')
                                                }}
                                            >
                                                完成
                                            </Button>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                disabled={!answerFinishFlag}
                                                type="primary"
                                                htmlType="submit"
                                                style={{marginTop: '1rem'}}
                                            >
                                                提交
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                )
                            })
                        }

                    </Modal>
                </div>
                <Form.Item {...buttonItemLayout}>
                    <Button
                        style={{marginTop: '1rem'}}
                        type="primary" htmlType="submit"
                    >
                        完成
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

};
export default connect(
    state => ({

    }),
    dispatch => ({
        addNewTest(args) {
            dispatch(test.addNewTest(args))
        }
    })
)(NewAdd);
