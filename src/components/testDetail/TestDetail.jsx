import React, {useState, useEffect} from "react";
import { connect } from 'react-redux'
import { Input, Table} from 'antd';
import * as test from '../../redux/action/test'
import './testDetail.scss'

const { Search } = Input;
const TestDetail = props => {
    const { fetchTestDetail, testDetailData } = props;
    const [questionAnswerData, pushQuestionAnswerData] = useState([]);
    useEffect(() => {
        testDetailData.size !== 0 && testDetailData.questionInfos.map(item => {
            item.answer && item.answer.map((item, index) => {
                return item.key = index
            });
            return(
                item.answer &&  pushQuestionAnswerData(item.answer)
            )
        })
    }, [testDetailData]);
    const expandedRowRender = (record) => {
        const columns = [
            { title: 'text', dataIndex: 'text', key: 'text' },
            { title: 'value', dataIndex: 'value', key: 'value' },
            { title: 'refer', dataIndex: 'refer', key: 'refer' },
            { title: 'answer', dataIndex: 'answer', key: 'answer' },
        ];
        return <div>
            <p style={{ margin: 0 }}>{`imageUrl: ${record.image}`}</p>
            <p style={{ margin: 0 }}>{`audioUrl: ${record.audio}`}</p>
            <p style={{ margin: 0 }}>{`videoUrl: ${record.video}`}</p>
            <Table columns={columns} dataSource={questionAnswerData} pagination={false} />
        </div>;
    };
    const columns = [
        {
            title: 'tid',
            dataIndex: 'tid',
        },
        {
            title: 'class_id',
            dataIndex: 'class_id',
        },
        {
            title: 'type',
            dataIndex: 'type',
        },
        {
            title: 'num',
            dataIndex: 'num',
        },
        {
            title: 'price',
            dataIndex: 'price',
        },
        {
            title: 'test_level',
            dataIndex: 'test_level',
        },
        {
            title: 'is_free',
            dataIndex: 'is_free',
        },
        {
            title: 'clicks',
            dataIndex: 'clicks',
        },
        {
            title: 'favorites',
            dataIndex: 'favorites',
        },
        {
            title: 'test_volume',
            dataIndex: 'test_volume',
        },
        {
            title: 'like_num',
            dataIndex: 'like_num',
        },
        {
            title: 'comment',
            dataIndex: 'comment',
        },
        {
            title: 'purchased_num',
            dataIndex: 'purchased_num',
        },
        {
            title: 'release_time',
            dataIndex: 'release_time',
        },
    ];
    const data = [
        {
            key: 1,
            tid: testDetailData.tid,
            class_id: testDetailData.class_id,
            title: testDetailData.title,
            introduction: testDetailData.introduction,
            type: testDetailData.type,
            num: testDetailData.num,
            price: testDetailData.price,
            test_level: testDetailData.test_level,
            is_free: testDetailData.is_free,
            clicks: testDetailData.clicks,
            favorites: testDetailData.favorites,
            test_volume: testDetailData.test_volume,
            like_num: testDetailData.like_num,
            comment: testDetailData.comment,
            purchased_num: testDetailData.purchased_num,
            release_time: new Date(testDetailData.release_time).toLocaleString()
        }
    ];
    const questionColumns = [
        { title: 'qid', dataIndex: 'qid', key: 'qid' },
        { title: 'order', dataIndex: 'order', key: 'order' },
        { title: 'type', dataIndex: 'type', key: 'type' },
    ];
    const [questionData, pushQuestionData] = useState([]);
    const answerColumns = [
        { title: 'aid', dataIndex: 'aid', key: 'aid' },
        { title: 'answer_order', dataIndex: 'answer_order', key: 'answer_order' },
        { title: 'type', dataIndex: 'type', key: 'type' },
        { title: 'lower_bound', dataIndex: 'lower_bound', key: 'lower_bound' },
        { title: 'upper_bound', dataIndex: 'upper_bound', key: 'upper_bound' },
        { title: 'title_value', dataIndex: 'title_value', key: 'title_value' },
    ];
    const [answerData, pushAnswerData] = useState([]);
    useEffect(() => {
        testDetailData.size !==0 && testDetailData.questionInfos.map((item, index) => {
            pushQuestionData([]);
            item.key = index;
            return (
                pushQuestionData(testDetailData.questionInfos)
            )
        });
        testDetailData.size !==0 && testDetailData.answerInfos.map((item, index) => {
            pushAnswerData([]);
            item.key = index;
            return pushAnswerData(testDetailData.answerInfos)
        })
    }, [testDetailData]);
    return(
        <div>
            <Search
                placeholder="input tid"
                onSearch={value => fetchTestDetail({tid: value})}
                enterButton
            />
            <div>
                {
                    testDetailData.size !== 0 && (
                        <div>
                            <h3>套题详情</h3>
                            <Table
                                style={{marginTop: '1rem'}}
                                columns={columns}
                                expandable={{
                                    expandedRowRender: record => <p style={{ margin: 0 }}>{`${record.title}————${record.introduction}`}</p>,
                                    rowExpandable: record => record.name !== 'Not Expandable',
                                }}
                                dataSource={data}
                                pagination={false}
                            />
                            <h3>问题详情</h3>
                            <Table
                                className="components-table-demo-nested"
                                columns={testDetailData.size !==0 && questionColumns}
                                expandable={{expandedRowRender}}
                                dataSource={testDetailData.size !==0 && questionData}
                                pagination={false}
                            />
                            <h3>答案详情</h3>
                            <Table
                                style={{marginTop: '1rem'}}
                                columns={answerColumns}
                                expandable={{
                                    expandedRowRender: record => <div>
                                        <p style={{ margin: 0 }}>{`title: ${record.refer_title}`}</p>
                                        <p style={{ margin: 0 }}>{`text: ${record.text}`}</p>
                                        <p style={{ margin: 0 }}>{`image: ${record.image}`}</p>
                                        <p style={{ margin: 0 }}>{`audio: ${record.audio}`}</p>
                                        <p style={{ margin: 0 }}>{`video: ${record.video}`}</p>
                                    </div>,
                                    rowExpandable: record => record.name !== 'Not Expandable',
                                }}
                                dataSource={answerData}
                                pagination={false}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
};
export default connect(
    state => ({
        testDetailData: state.getIn(['test', 'testDetailData']),
    }),
    dispatch => ({
        fetchTestDetail(args) {
            dispatch(test.fetchTestDetail(args))
        }
    })
)(TestDetail)
