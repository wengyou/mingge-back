import React, { useState, useEffect} from "react";
import { connect } from 'react-redux'
import {Button, Input, Modal, InputNumber, Form, Select} from 'antd'
import { PlusOutlined, ExclamationCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import * as test from '../../redux/action/test';
import './update.scss'

const { Search } = Input;
const { confirm } = Modal;
const Update = props => {
    const {fetchTestDetail, testDetailData, modifyTest, modifyQuestion, updateFlag, update} = props;
    const [count, setCount] = useState(0);
    const [tid, setTid] = useState('');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionAnswerIndex, setQuestionAnswerIndex] = useState(0);
    const [questionAnswerValues, setQuestionAnswerValues] = useState({});
    const [questionAnswerFlag, setQuestionAnswerFlag] = useState('');
    const [questionAnswerVisible, setQuestionAnswerVisible] = useState(false);
    const [questionVisible, setQuestionVisible] = useState(false);
    const [addQuestionAnswerVisible, setAddQuestionAnswerVisible] = useState(false);
    const [questionAnswerCount, setQuestionAnswerCount] = useState(1);
    const [questionCount, setQuestionCount] = useState(1);
    const [addQuestionAnswer, pushAddQuestionAnswer] = useState([]);
    const [addAnswerVisible, setAddAnswerVisible] = useState(false);
    const [changeQuestionVisible, setChangeQuestionVisible] = useState(false);
    const [index1, setIndex1] = useState(0);
    const [index2, setIndex2] = useState(0);
    const [loadingFlag, setLoadingFlag] = useState(updateFlag);
    const [form] = Form.useForm();
    useEffect(() => {
        tid !== '' && fetchTestDetail({tid: tid})
    }, [update]);
    useEffect(() => {
        setLoadingFlag(updateFlag)
    }, [updateFlag]);
    const formLayout =
        {
            labelCol: {
                span: 4,
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
    let test = {
        "tid": testDetailData.tid,
        "title": testDetailData.title,
        "class_id": testDetailData.class_id,
        "introduction": testDetailData.introduction,
        "is_free": testDetailData.is_free,
        "type": testDetailData.type,
        "num": testDetailData.num
    };
    let questions = testDetailData.questionInfos;
    let answers = testDetailData.answerInfos;
    function showTestConfirm() {
        confirm({
            title: '确认修改套题属性?',
            icon: <ExclamationCircleOutlined />,
            content: '修改套题属性后，修改后的数据将覆盖之前的数据，并且不能自动恢复',
            onOk() {
                modifyTest({test, questions, answers});
                setLoadingFlag(true)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    function showQuestionConfirm() {
        confirm({
            title: '确认修改问题属性?',
            icon: <ExclamationCircleOutlined />,
            content: '修改问题属性后，修改后的数据将覆盖之前的数据，并且不能自动恢复',
            onOk() {
                modifyQuestion({test, questions, answers});
                setLoadingFlag(true)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    function showQuestionAnswerConfirm() {
        confirm({
            title: '确认修改问题答案?',
            icon: <ExclamationCircleOutlined />,
            content: '修改问题答案后，修改后的数据将覆盖之前的数据，并且不能自动恢复',
            onOk() {
                modifyQuestion({test, questions, answers});
                setLoadingFlag(true)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    function showAnswerConfirm() {
        confirm({
            title: '确认修改套题答案?',
            icon: <ExclamationCircleOutlined />,
            content: '修改套题答案后，修改后的数据将覆盖之前的数据，并且不能自动恢复',
            onOk() {
                modifyTest({test, questions, answers});
                setLoadingFlag(true)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    useEffect(() => {
        testDetailData !== '' && setCount(count+1);
    }, [testDetailData]);
    const layout = {
        labelCol: {
            span: 3,
        },
        wrapperCol: {
            span: 20,
        },
    };
    const modalLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const onTestChange = (changeValues, allValues) => {
        Object.keys(allValues).forEach(key => {
            test[key] = allValues[key]
        });
    };
    const onTestFinish = values => {
        showTestConfirm()
    };
    const onQuestionChange = (changeValues, allValues ) => {
        Object.keys(allValues).forEach(key => {
            questions[questionIndex][key] = allValues[key];
        });
    };
    const onQuestionAnswerChange = (changeValues, allValues) => {
        setQuestionAnswerValues(allValues);
        setQuestionAnswerFlag(new Date());
    };
    useEffect(() => {
        questionAnswerFlag !== '' && Object.keys(questionAnswerValues).forEach(key => {
            questions[questionIndex].answer[questionAnswerIndex][key] = questionAnswerValues[key];
        })
    }, [questionAnswerFlag]);
    const onQuestionFinish = () => {
        showQuestionConfirm()
    };
    const onQuestionAnswerFinish = () => {
        showQuestionAnswerConfirm()
    };
    return(
        <>
            <div key={count}>
                <Search
                    placeholder="请输入要更新套题的tid"
                    onSearch={value => {fetchTestDetail({tid: value});setTid(value)}}
                    enterButton
                />
                {
                    testDetailData.size !== 0 &&
                    <Form
                        {...layout}
                        labelAlign='left'
                        style={{marginTop: '1rem'}}
                        onValuesChange={onTestChange}
                        onFinish={onTestFinish}
                    >
                        <Form.Item name="title" label='title'>
                            <Input defaultValue={testDetailData.title}/>
                        </Form.Item>
                        <Form.Item name="cover_image" label='cover_image'>
                            <Input defaultValue={testDetailData.cover_image}/>
                        </Form.Item>
                        <Form.Item name="introduction" label='introduction'>
                            <Input defaultValue={testDetailData.introduction}/>
                        </Form.Item>
                        <Form.Item name="class_id" label='class_id'>
                            <Input defaultValue={testDetailData.class_id} />
                        </Form.Item>
                        <Form.Item name="type" label='type'>
                            <Input defaultValue={testDetailData.type} />
                        </Form.Item>
                        <Form.Item name="num" label='num'>
                            <Input defaultValue={testDetailData.num} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{width: '100%', marginLeft: '5rem'}}>修改套题属性</Button>
                        </Form.Item>
                    </Form>
                }
                <Form.Provider
                    onFormChange={(name) => {
                        setQuestionIndex(name);
                    }}
                >
                    {testDetailData.size !== 0 && <h3>questions:</h3>}
                    {
                        testDetailData.size !== 0 && testDetailData.questionInfos.map((item, index) => {
                            return(
                                <Form
                                    name={index}
                                    {...layout}
                                    labelAlign='left'
                                    style={{marginTop: '1rem'}}
                                    onValuesChange={onQuestionChange}
                                    onFinish={onQuestionFinish}
                                >
                                    <Form.Item className='wrapper' name="order" label="order">
                                        <Input defaultValue={item.order} />
                                    </Form.Item>
                                    <Form.Item name='type' label='type'>
                                        <Input defaultValue={item.type} />
                                    </Form.Item>
                                    <Form.Item className='wrapper' name='content' label='content'>
                                        <Input defaultValue={item.content} />
                                    </Form.Item>
                                    <Form.Provider
                                        onFormChange={name => {
                                            setQuestionAnswerIndex(name);
                                            setQuestionIndex(index);
                                        }}
                                    >
                                        <label>answer:</label>
                                        {
                                            item.answer && item.answer.map((item, index) => {
                                                return(
                                                    <Form {...layout}
                                                          name={index}
                                                          labelAlign='left'
                                                          key={index}
                                                          style={{marginBottom: '1rem', borderBottom: '1px solid #CDCDCD'}}
                                                          onValuesChange={onQuestionAnswerChange}
                                                          onFinish={onQuestionAnswerFinish}
                                                    >
                                                        <Form.Item name='text' label='text' key={item.text}>
                                                            <Input defaultValue={item.text} />
                                                        </Form.Item>
                                                        <Form.Item name='value' label='value' key={item.value}>
                                                            <Input defaultValue={item.value} />
                                                        </Form.Item>
                                                        <Form.Item name='refer' label='refer' >
                                                            <Input defaultValue={item.refer} />
                                                        </Form.Item>
                                                        <Form.Item name='answer' label='answer' >
                                                            <Input defaultValue={item.answer} />
                                                        </Form.Item>
                                                        <Button type="primary" htmlType="submit">修改答案{index+1}</Button>
                                                    </Form>
                                                )
                                            })
                                        }
                                        <Button
                                            icon={<PlusOutlined  />}
                                            onClick={() => {
                                                setQuestionAnswerVisible(true);
                                                setQuestionIndex(index)
                                            }}
                                        >
                                            添加问题{index+1}答案
                                        </Button>
                                    </Form.Provider>
                                    <Form.Item style={{marginTop: '1rem'}}>
                                        <Button type="primary" htmlType="submit" style={{width: '100%', marginLeft: '5rem'}}>
                                            修改问题{index+1}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            )
                        })
                    }
                    {testDetailData.size !== 0 &&
                        <div>
                            <Button
                                style={{width: '48%'}}
                                type="primary"
                                onClick={() => {
                                    setQuestionVisible(true)
                                }}
                            >
                                添加问题
                            </Button>
                            <Button
                                style={{width: '48%', marginLeft:'1rem'}}
                                type="primary"
                                onClick={() => {
                                    setChangeQuestionVisible(true)
                                }}
                            >
                                交换问题顺序
                            </Button>
                            <Modal
                                title="Basic Modal"
                                visible={changeQuestionVisible}
                                onOk={() => {
                                    [questions[index1 - 1], questions[index2 - 1]] = [questions[index2 - 1], questions[index1 - 1]];
                                    modifyQuestion({test, questions, answers});
                                    setChangeQuestionVisible(false)
                                }}
                                onCancel={() => setChangeQuestionVisible(false)}
                            >
                                <div>
                                    问题：<InputNumber min={0} max={20} onChange={value => setIndex1(value)}/>
                                    和
                                    问题：<InputNumber min={0} max={20} onChange={value => setIndex2(value)}/>
                                    交换
                                </div>
                            </Modal>
                        </div>

                    }
                </Form.Provider>
                <Modal
                    visible={questionAnswerVisible}
                    title="添加问题答案"
                    footer={null}
                    onCancel={() => setQuestionAnswerVisible(false)}
                    confirmLoading={loadingFlag}
                >
                    <Form
                        {...layout}
                        labelAlign='left'
                        onFinish={
                            values => {
                                console.log(questionIndex);
                                questions[questionIndex].answer.push(values);
                                modifyTest({test, questions, answers})
                            }
                        }
                    >
                        <Form.Item name='text' label='text' >
                            <Input  />
                        </Form.Item>
                        <Form.Item name='value' label='value'>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name='refer' label='refer' >
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item name='answer' label='answer' >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                添加
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={questionVisible}
                    title={`添加问题${questionCount}`}
                    onCancel={() => setQuestionVisible(false)}
                    footer={null}
                >
                    <Form
                        key={questionCount}
                        form={form}
                        layout={formLayout}
                        {...formLayout}
                        name="form_in_modal"
                        onFinish={values => {
                            console.log(addQuestionAnswer);
                            questions.push(values);
                            questions[questions.length-1].answer = addQuestionAnswer;
                            modifyTest({test, questions, answers})
                        }}
                    >
                        <Form.Item
                            name="order"
                            label="order"
                        >
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
                        <Button
                            type="dashed"
                            onClick={() => {
                                setAddQuestionAnswerVisible(true)
                            }}
                            style={{ width: '40%' }}
                        >
                            <PlusOutlined /> 添加问题答案
                        </Button>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{marginTop: '1rem'}}>
                                添加
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    visible={addQuestionAnswerVisible}
                    title={`添加问题答案${questionAnswerCount}`}
                    okText="添加"
                    cancelText="Cancel"
                    onCancel={() => {setAddQuestionAnswerVisible(false); pushAddQuestionAnswer({})}}
                    onOk={() => {
                        form
                            .validateFields()
                            .then(values => {
                                form.resetFields();
                                pushAddQuestionAnswer(addQuestionAnswer.concat(values));
                                setAddQuestionAnswerVisible(false);
                            })
                            .catch(info => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                >
                    <Form
                        {...modalLayout}
                        key={questionAnswerCount}
                        form={form}
                        name="form_in_modal"
                        onFinish={values => {
                            pushAddQuestionAnswer(addQuestionAnswer.concat(values));
                        }}
                    >
                        <Form.Item
                            name="test"
                            label="test"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the title of collection!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="value" label="value">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name="refer" label="refer">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name="answer" label="answer">
                            <InputNumber />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => setQuestionAnswerCount(questionAnswerCount+1)}
                            >
                                next
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <div>
                    {testDetailData.size !== 0 && <h3>answers:</h3>}
                    {
                        testDetailData.size !== 0 && testDetailData.answerInfos.map((item, index) => {
                            return(
                                <Form
                                    {...layout}
                                    labelAlign='left'
                                    key={item.aid}
                                    className='answer-container'
                                    onValuesChange={(changedValues, values) => {
                                        Object.keys(values).forEach(key => {
                                            answers[index][key] = values[key];
                                        })
                                    }}
                                    onFinish={() => showAnswerConfirm()}
                                >
                                    <Form.Item name='answer_order' label='answer_order'>
                                        <Input defaultValue={item.answer_order} />
                                    </Form.Item>
                                    <Form.Item name='type' label='type'>
                                        <Input defaultValue={item.type} />
                                    </Form.Item>
                                    <Form.Item name='refer_title' label='refer_title'>
                                        <Input defaultValue={item.refer_title} />
                                    </Form.Item>
                                    <Form.Item name='text' label='text'>
                                        <Input defaultValue={item.title_value} />
                                    </Form.Item>
                                    <Form.Item name='text' label='text'>
                                        <Input defaultValue={item.text} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            修改答案{index+1}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            )
                        })
                    }
                    {testDetailData.size !== 0 &&
                    <Button
                        style={{width: '100%'}}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setAddAnswerVisible(true);
                        }}
                    >
                        添加答案
                    </Button>}
                    <Modal
                        visible={addAnswerVisible}
                        title="添加答案"
                        okText="添加"
                        cancelText="Cancel"
                        onCancel={() => {setAddAnswerVisible(false)}}
                        footer={null}
                    >
                        <Form
                            key={questionAnswerCount}
                            form={form}
                            name="form_in_modal"
                            onFinish={values => {
                                answers.push(values);
                                modifyTest({test, questions, answers})
                            }}
                        >
                            <Form.Item name="answer_order" label="answer_order">
                                <Input />
                            </Form.Item>
                            <Form.Item name="type" label="type">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item name="refer_title" label="refer_title">
                                <Input />
                            </Form.Item>
                            <Form.Item name="title_value" label="title_value">
                                <Input />
                            </Form.Item>
                            <Form.Item name="text" label="text">
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    完成
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        </>
    )
};

export default connect(
    state => ({
        testDetailData: state.getIn(['test', 'testDetailData']),
        updateFlag: state.getIn(['test', 'updateFlag']),
        update$2: state.getIn(['test', 'update'])
    }),
    dispatch => ({
        fetchTestDetail(args){
            dispatch(test.fetchTestDetail(args))
        },
        modifyTest(args) {
            dispatch(test.modifyTest(args))
        },
        modifyQuestion(args) {
            dispatch(test.modifyQuestion(args))
        }
    })
)(Update);
