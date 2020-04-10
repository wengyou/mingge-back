import React, {useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import {connect} from 'react-redux';
import {
    Form,
    Input,
    Button,
    Select,
    Modal,
    InputNumber, message
} from 'antd';
import { PlusOutlined, MinusCircleOutlined, ExclamationCircleOutlined  } from '@ant-design/icons';
import * as test from '../../redux/action/test';

const Answer = (props) => {
    const {addAnswer} = props;
    const [answers, pushAnswer] = useState([]);
    const [answerVisible, setAnswerVisible] = useState(false);
    const [answerCount, pushAnswerCount] = useState([0]);
    const [answerFinishFlag, setAnswerFinishFlag] = useState(false);
    const formLayout ={
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
    return(
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
    )
};
export default connect(
    state => ({

    }),
    dispatch => ({
        addAnswer(args) {
            // dispatch(test.addAnswer(args))
        }
    })
)(Answer);
