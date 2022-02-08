import { Layout, Menu } from 'antd';
import { Link,Routes,Route } from "react-router-dom"
import React from "react"; 
import TravelMap from './TravelMap';
import HotelsMap from './HotelsMap';
import TableFutureTrip from './TableFutureTrip';
import { useNavigate } from 'react-router-dom'
const { Header, Content, Sider } = Layout;

function SideNav({setCurrentUser, currentUser}){
    const navigate = useNavigate();
    
    const handleLogout = () => {
        fetch('/logout', {
            method: "DELETE"
        })
        navigate("/")
        setCurrentUser(null)
        
    }
    
    return(
        <Layout className="box">
        <Header className="header" >
            <h1 id="metriptitle"></h1>
        </Header>
        <Layout>
            <Sider width={200} id="sidebar">
                <Menu
                mode="inline"
                >
                    {/* <Menu.Item key={0} disabled >Hello </Menu.Item> */}
                    <Menu.Item key={1}>
                        <Link to="/">
                            Home
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={2}>
                        <Link to="/new">
                            New Trip
                        </Link>
                    </Menu.Item>

                    <Menu.Item key={3}>
                        <Link to="/table">
                            Upcoming Trips
                        </Link>
                    </Menu.Item>

                    <Menu.Item key={4} onClick={handleLogout}>Logout</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content id='content'>
                    <Routes>
                        <Route path="/" element={ <TravelMap currentUser={currentUser}/>}></Route>
                        <Route path="/new" element={<HotelsMap/>}></Route>
                        <Route path="/table" element={<TableFutureTrip/>}></Route>
                    </Routes>
                </Content>
            </Layout>
            </Layout>
            </Layout>
       );
}

export default SideNav