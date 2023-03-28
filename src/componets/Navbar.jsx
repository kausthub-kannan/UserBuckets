import React from "react";
import {Layout, Menu} from "antd";
import Sider from "antd/lib/layout/Sider.js";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";

const NavBar = ({ mode }) => {

    const style = {
        width: 256,
        padding: 10,
        height: "98vh",
    }

    return(
            <Sider>
                <Menu mode="inline"
                      className="menu"
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub1']}
                      items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
                          (icon, index) => ({
                              key: String(index + 1),
                              icon: React.createElement(icon),
                              label: `nav ${index + 1}`,
                          }))} />
            </Sider>
    )
}

export default NavBar