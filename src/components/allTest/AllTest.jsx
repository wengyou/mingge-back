import React, { useState, useEffect} from "react";
import { connect } from 'react-redux'
import {Table, Input, Select, Button, Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './allTest.scss'
import * as test from '../../redux/action/test'

const { Option } = Select;
const { Search } = Input;
const { confirm } = Modal;
const AllTest = props => {
    const {fetchAllTest, allTestData, dataKey, deleteTest, allTestDataFlag, releaseTest} = props;
    const [deleteArr, setDeleteArr] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };
    const [option, setOption] = useState('keyword');
    const [selectionType, setSelectionType] = useState('checkbox');
    const columns = [
        {
            title: 'tid',
            dataIndex: 'tid',
            width: 100,
            fixed: 'left'
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
            title: 'collection',
            dataIndex: 'collection',
        },
        {
            title: 'like',
            dataIndex: 'like',
        },
        {
            title: 'status',
            dataIndex: 'status',
            fixed: 'right',
            width: 100,
            render: (text, record) =>
                text === 0 ?
                    <a
                        onClick={() => {releaseTest({tids: record.tid});return false}}
                    >
                        发布
                    </a>:
                    <div>已发布</div>
        }
    ];
    useEffect(() => {
        fetchAllTest({"page": 1, "rows": 10});
    }, [allTestDataFlag]);
    const  showPropsConfirm = () => {
        confirm({
            title: `确定删除您选择的套题吗`,
            icon: <ExclamationCircleOutlined />,
            content: '删除后将从数据库中删除所有数据',
            okText: 'Yes',
            okType: 'danger',
            okButtonProps: {
                disabled: false,
            },
            cancelText: 'No',
            onOk() {
                deleteTest({"tids": deleteArr});
                setDeleteArr([]);
            },
            onCancel() {
                setDeleteArr([]);
            },
        });
    };
    return(
        <div>
            <div className='header-wrapper'>
                <Input.Group compact style={{margin: 0}}>
                    <Select
                        defaultValue="keyword"
                        onChange={
                            value => setOption(value)
                        }
                    >
                        <Option value="keyword">keyword</Option>
                        <Option value="tid">tid</Option>
                    </Select>
                    <Search
                        style={{width: '14rem'}}
                        onSearch={
                            (value) => {
                                option === 'keyword' ? fetchAllTest({"page": 1, "rows": 10, "keyword": value}):
                                    fetchAllTest({"page": 1, "rows": 10, "tid": value})
                            }
                        }
                        enterButton
                    />
                </Input.Group>
                <Button onClick={() => {fetchAllTest({"page": 1, "rows": 10, "cid": 0})}}>性格1</Button>
                <Button onClick={() => {fetchAllTest({"page": 1, "rows": 10, "cid": 1})}}>能力</Button>
                <Button onClick={() => {fetchAllTest({"page": 1, "rows": 10, "cid": 2})}}>职业</Button>
                <Button onClick={() => {fetchAllTest({"page": 1, "rows": 10, "cid": 3})}}>情感</Button>
                <Button onClick={() => {fetchAllTest({"page": 1, "rows": 10, "cid": 4})}}>趣味</Button>
                <Button onClick={() => {fetchAllTest({"page": 1, "rows": 10, "is_free": 0})}}>免费</Button>
                <Button onClick={() => {fetchAllTest({"page": 1, "rows": 10, "is_free": 1})}}>收费</Button>
                <Button onClick={() => {fetchAllTest({"page": 1, "rows": 10, "status": 0})}}>未发布</Button>
                <Button onClick={() => {fetchAllTest({"page": 1, "rows": 10, "status": 1})}}>已发布</Button>
                <Button
                    onClick={() => {
                        for (let i = 0; i < selectedRows.length; i++) {
                            setDeleteArr(deleteArr.push(selectedRows[i].tid));
                            setDeleteArr(deleteArr);
                        }
                        showPropsConfirm();
                    }}
                >
                    删除
                </Button>
            </div>
            <Table
                scroll={{ x: 1500, y: 300 }}
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataKey.length !== 0 ? dataKey : []}
                pagination={{
                    showQuickJumper: true,
                    defaultCurrent: 1,
                    current: allTestData.page,
                    total: allTestData.total,
                    onChange: pageNum => {
                        fetchAllTest({"page": pageNum, "row": 10})
                    }
                }}
                expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{`${record.title}————${record.introduction}`}</p>,
                    rowExpandable: record => record.name !== 'Not Expandable',
                }}
            />
        </div>
    )
};

export default connect(
    state => ({
        allTestData: state.getIn(['test', 'allTestData']),
        dataKey: state.getIn(['test', 'dataKey']),
        allTestDataFlag: state.getIn(['test', 'allTestDataFlag'])
    }),
    dispatch => ({
        fetchAllTest(args) {
            dispatch(test.fetchAllTest(args))
        },
        deleteTest(args) {
            dispatch(test.deleteTest(args))
        },
        releaseTest(args) {
            dispatch(test.releaseTest(args))
        }
    })
)(AllTest)
