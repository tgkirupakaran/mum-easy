// src/Home.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Dropdown, Avatar, FloatButton } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { FaHistory, FaSun, FaMoon, FaChartLine } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { BsJournalBookmark } from "react-icons/bs";
import { isMobile } from 'react-device-detect';
import Graphs from './Graphs';
import History from './History';
import Log from './Log';
import Summary from './Summary';


const { Header, Content, Sider, Footer } = Layout;


const Home = (user) => {

  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [selectedContent, setSelectedContent] = useState('brokers');
  const [collapsed, setCollapsed] = useState(false);
  const [openFloatMenu, setOpenFloatMenu] = useState(true);



  useEffect(() => {
  }, []);


  const handleMenuClick = async ({ key }) => {
    if (key === 'signout') {
      // handle sign-out logic
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
      } else {
        setSession(null);
        navigate('/');
      }
    }
  };

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">
        <UserOutlined /> Profile Details
      </Menu.Item>
      <Menu.Item key="signout">
        <LogoutOutlined /> Sign Out
      </Menu.Item>
    </Menu>
  );

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const renderContent = () => {
    switch (selectedContent) {
      case 'log':
        return <Log />;
      case 'summary':
        return <Summary />;
      case 'graphs':
        return <Graphs />;
      case 'history':
        return <History/>;
      case 'settings':
        return <div>Settings Page</div>;
      default:
        return <Summary />;
    }
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', background: darkMode ? '#001529' : '#fff' }}>
        {darkMode ? <SettingOutlined style={{ fontSize: '20px', margin: '0 20px', cursor: 'pointer', color: 'white' }} onClick={() => setSelectedContent('settings')} />
          : <SettingOutlined style={{ fontSize: '20px', margin: '0 20px', cursor: 'pointer' }} onClick={() => setSelectedContent('settings')} />}

        {darkMode ? <FaMoon style={{ fontSize: '20px', margin: '0 20px', cursor: 'pointer', color: 'white' }} onClick={toggleTheme} />
          : <FaSun style={{ fontSize: '20px', margin: '0 20px', cursor: 'pointer' }} onClick={toggleTheme} />
        }
        <Dropdown overlay={userMenu} placement="bottomRight">
          {
            user.user.user_metadata?.avatar_url ? <Avatar src={user.user.user_metadata?.avatar_url} />
              : <Avatar style={{ backgroundColor: '#87d068' }} > {user.user.email.substring(0, 1).toUpperCase()} {user.user.email.substring(user.user.email.indexOf('@') - 1, user.user.email.indexOf('@')).toUpperCase()} </Avatar>
          }
        </Dropdown>
      </Header>
      <Layout>
        {isMobile ? null : <>
          <Sider theme={darkMode ? 'dark' : 'light'} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu theme={darkMode ? 'dark' : 'light'} mode="inline" defaultSelectedKeys={['log']} onClick={(e) => setSelectedContent(e.key)}>
              <Menu.Item key="log" icon={<BsJournalBookmark />}>
                Log
              </Menu.Item>
              <Menu.Item key="summary" icon={<TbReportAnalytics />}>
                Summary
              </Menu.Item>
              <Menu.Item key="graphs" icon={<FaChartLine />}>
                Graphs
              </Menu.Item>
              <Menu.Item key="history" icon={<FaHistory />}>
                History
              </Menu.Item>
            </Menu>
          </Sider>
        </>}

        <Layout className={darkMode ? 'dark-theme' : 'light-theme'}>
          <Content style={darkMode ? { margin: '16px', color: '#fff' } : { margin: '16px' }}>
            {isMobile ? 'Accessed from Mobile' : 'Not accessed from Mobile'}
            {renderContent()}
          </Content>
          
            <>
              <FloatButton.Group
                open={openFloatMenu}
                trigger="click"
                placement="bottomLeft"
                onClick={null}
              >
                {/* <Menu.Item key="log" /> */}
                  {/* <FloatButton icon={<BsJournalBookmark />} tooltip={<div>Log</div>} onClick={setSelectedContent('log')} />  */}
                {/* </Menu.Item> */} 
                {/* <Menu.Item key="summary"> */}
                  {/* <FloatButton icon={<TbReportAnalytics />} tooltip={<div>Summary</div>} onClick={setSelectedContent('summary')} /> */}
                {/* </Menu.Item> */}
                {/* <Menu.Item key="graphs"> */}
                  {/* <FloatButton icon={<FaChartLine />} tooltip={<div>Graphs</div>} /> */}
                {/* </Menu.Item> */}
                {/* <Menu.Item key="history"> */}
                  {/* <FloatButton icon={<FaHistory />} tooltip={<div>History</div>} /> */}
                {/* </Menu.Item> */}
                <Menu theme={darkMode ? 'dark' : 'light'} mode="inline" defaultSelectedKeys={['log']} onClick={(e) => setSelectedContent(e.key)}>
              <Menu.Item key="log" icon={<BsJournalBookmark />}>
                Log
              </Menu.Item>
              <Menu.Item key="summary" icon={<TbReportAnalytics />}>
                Summary
              </Menu.Item>
              <Menu.Item key="graphs" icon={<FaChartLine />}>
                Graphs
              </Menu.Item>
              <Menu.Item key="history" icon={<FaHistory />}>
                History
              </Menu.Item>
            </Menu>
              </FloatButton.Group>
            </>

        </Layout>

      </Layout>
    </Layout>
  );
};

export default Home;
