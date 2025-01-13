import { useState } from "react";
import logo from "../../assets/images/Logo.svg";
import SearchBox from "./SearchBox";
import { Button, Col, Menu, Row, Drawer, Dropdown, message } from "antd";
import {
  MenuOutlined,
  MoonOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { auth, logout } = useAuth(); // Ensure useAuth is properly set up
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const items = [
    { label: "Home", key: "/" },
    { label: "product", key: "/product" },
    { label: "Category", key: "/category" },
    { label: "brand", key: "/brand" },
    { label: "Marketplace", key: "/market" },
    { label: "About", key: "/about" },
    { label: "ContactUs", key: "/contactus" },
  ];

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
    message.success("Logged out successfully!");
  };
  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const handleCartClick = () => {
    if (!auth?.isAuthenticated) {
      message.warning("You need to log in first to access the cart.", 3); // Show warning message
      navigate("/login"); // Redirect to login page
    } else {
      navigate("/cart"); // Allow access to cart if authenticated
    }
  };

  return (
    <div className="bg-white shadow-sm">
      <Row align="middle" justify="space-between" className="py-2 px-4 sm:px-6">
        {/* Left - Logo */}
        <Col xs={6} sm={4} md={3} className="flex items-center">
          <img src={logo} alt="Logo" className="h-5 cursor-pointer" onClick={() => navigate("/")} />
        </Col>

        {/* Center - Menu Items */}
        <Col xs={0} sm={16} md={14} className="hidden sm:flex justify-center">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items.map((item) => ({
              ...item,
              label: (
                <Link to={item.key} className="text-sm text-main">
                  {item.label}
                </Link>
              ),
            }))}
            className="border-none w-full justify-center"
          />
        </Col>

        {/* Right - Icons and Profile/Login */}
        <Col xs={6} sm={4} md={3} className="flex items-center justify-end space-x-4">
          <MoonOutlined className="text-gray-500 text-lg hidden sm:block" />
          <ShoppingCartOutlined
            className="text-gray-500 text-lg hidden sm:block hover:text-black duration-300"
            onClick={handleCartClick}
          />
          {auth?.isAuthenticated ? (
            <Dropdown overlay={profileMenu} placement="bottomRight" arrow>
              <Button type="text" icon={<UserOutlined />} className="text-lg" />
            </Dropdown>
          ) : (
            <NavLink to="/login" className="text-red-600 text-sm hidden sm:block">
              Log in
            </NavLink>
          )}

          {/* Mobile Menu Icon */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            className="block sm:hidden text-lg"
            onClick={showDrawer}
          />
        </Col>
      </Row>

      {/* Drawer for Mobile Menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={250}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          items={items.map((item) => ({
            ...item,
            label: <Link to={item.key}>{item.label}</Link>,
          }))}
        />
      </Drawer>

      {/* Search Box below Navbar */}
      <SearchBox />
    </div>
  );
}
