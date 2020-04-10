import React, {useState, useEffect} from "react";
import {connect} from 'react-redux'
import {Layout, Menu, Modal, Button, Input, Form, Checkbox} from 'antd';
import {
    FileOutlined,
    SnippetsOutlined,
    UserOutlined,
} from '@ant-design/icons';
import AddTest from "../components/addTest/AddTest";
import AllTest from "../components/allTest/AllTest";
import TestDetail from "../components/testDetail/TestDetail";
import Update from "../components/update/Update";
import NewAdd from "../components/newAdd/NewAdd";
import * as user from '../redux/action/user'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Index = (props) => {
    const {login, loginFlag, username } = props;
    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;
    const [collapsed, setCollapsed ] = useState(false);
    const [key, setKey] = useState('1');
    const [loginVisible, setLoginVisible] = useState(false);
    const onFinish = values => {
       login({userId: values.userId, password: values.password});
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        loginFlag && setLoginVisible(false);
    }, [loginFlag]);
    return(
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
                <div style={collapsed?{visibility:'hidden'}:{width: '10rem', height: '2.5rem', background: '#fff', margin: '1rem auto', fontSize: '14px', textAlign: 'center', lineHeight: '2.5rem'}}>
                    命格-后台管理系统
                </div>
                <div className="logo" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    onClick={
                        (e) => {setKey(e.key)}
                    }
                >
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                              <UserOutlined />
                              <span>User</span>
                            </span>
                        }
                    >
                        <Menu.Item key="1">管理员</Menu.Item>
                        {/*<Menu.Item key="2">Bill</Menu.Item>*/}
                        {/*<Menu.Item key="3">Alex</Menu.Item>*/}
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                              <SnippetsOutlined />
                              <span>Test</span>
                            </span>
                        }
                    >
                        <Menu.Item key="4">add</Menu.Item>
                        <Menu.Item key="5">all</Menu.Item>
                        <Menu.Item key="6">detail</Menu.Item>
                        <Menu.Item key="7">update</Menu.Item>
                    </SubMenu>
                    {/*<Menu.Item key="8">*/}
                    {/*    <FileOutlined />*/}
                    {/*</Menu.Item>*/}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0, background: '#fff', display: "flex", justifyContent: "space-between" }}>
                    {
                        key === '1' && loginFlag === false && <div style={{fontSize: '18px', marginLeft: '2.2rem'}}>游客</div>
                    }
                    {
                        key === '4' && <div style={{fontSize: '18px', marginLeft: '2.2rem'}}>添加套题</div>
                    }
                    {
                        key === '5' && <div style={{fontSize: '18px', marginLeft: '2.2rem'}}>所有套题</div>
                    }
                    {
                        key === '6' && <div style={{fontSize: '18px', marginLeft: '2.2rem'}}>套题详情</div>
                    }
                    {
                        key === '7' && <div style={{fontSize: '18px', marginLeft: '2.2rem'}}>更新套题</div>
                    }
                    {
                        loginFlag ? <h3 style={{marginRight: '3rem'}}>管理员：{username}</h3> :
                            <Button
                                style={{margin: '1rem 2.2rem 0 0'}}
                                onClick={
                                    () => {
                                        setLoginVisible(true)
                                    }
                                }
                            >
                                登录
                            </Button>
                    }
                    <Modal
                        title="登录"
                        visible={loginVisible}
                        onCancel={() => setLoginVisible(false)}
                        footer={null}
                    >
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="UserId"
                                name="userId"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your userId!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {
                            key === '4' && <NewAdd/>
                        }
                        {
                            key === '5' && <AllTest/>
                        }
                        {
                            key === '6' && <TestDetail/>
                        }
                        {
                            key === '7' && <Update/>
                        }
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
};
export default connect(
    state => ({
        loginFlag: state.getIn(['user', 'loginFlag']),
        username: state.getIn(['user', 'username']),
    }),
    dispatch => ({
        login(args) {
            dispatch(user.login(args))
        }
    })
)(Index)
