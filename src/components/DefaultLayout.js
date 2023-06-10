import { Badge } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserNofications, getUserProfile } from "../apis/users";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { SetReloadNotifications } from "../redux/notifications";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip, message } from 'antd';
import { saveUserHomepageData } from "../redux/userSlise";
import axios from "axios"



function DefaultLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { reloadNotifications, unreadNotifications } = useSelector(
    (state) => state.notifications
  );
  const [collapsed, setCollapsed] = React.useState(false);
  const [menuToRender, setMenuToRender] = React.useState([]);
  const navigate = useNavigate(); // Import the useNavigate function

  const dispatch = useDispatch();
  const userMenu = [
    {
      title: "Home",
      onClick: () => navigate("/"),
      icon: <i className="ri-home-7-line"></i>,
      path: "/",
    },
    {
      title: "Applied Jobs",
      onClick: () => navigate("/applied-jobs"),
      icon: <i className="ri-file-list-3-line"></i>,
      path: "/applied-jobs",
    },
    {
      title: "Profile",
      onClick: () => {
        navigate(`/profile/`);
      },
      icon: <i className="ri-user-2-line"></i>,
      path: "/profile",
    },
    {
      title: "Map",
      onClick: () => navigate("/map"),
      icon: <i className="ri-map-pin-line"></i>,
      path: "/map",
    },
    {
      title: "Logout",
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
      icon: <i className="ri-logout-box-r-line"></i>,
      path: "/login",
    },
  ];


  const unAuthorized=[
    {
      title: "Home",
      onClick: () => navigate("/"),
      icon: <i className="ri-home-7-line"></i>,
      path: "/",
    },
    {
      title: "Map",
      onClick: () => navigate("/map"),
      icon: <i className="ri-map-pin-line"></i>,
      path: "/map",
    },
  ];


  const recruiterMenu=[
    {
      title: "Home",
      onClick: () => navigate("/"),
      icon: <i className="ri-home-7-line"></i>,
      path: "/",
    },
    {
      title: "Profile",
      onClick: () => navigate("/profile"),
      icon: <i className="ri-file-list-3-line"></i>,
      path: "/profile",
    },
    {
      title: "Posted Jobs",
      onClick: () => navigate("/posted-jobs"),
      icon: <i className="ri-file-list-3-line"></i>,
      path: "/posted-jobs",
    },
    {
      title: "Map",
      onClick: () => navigate("/map"),
      icon: <i className="ri-map-pin-line"></i>,
      path: "/map",
    },
    {
      title: "Logout",
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
      icon: <i className="ri-logout-box-r-line"></i>,
      path: "/login",
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      onClick: () => navigate("/"),
      icon: <i className="ri-home-7-line"></i>,
      path: "/",
    },
    {
      title: "Jobs",
      onClick: () => navigate("/admin/jobs"),
      icon: <i className="ri-file-list-2-line"></i>,
      path: "/admin/jobs",
    },
    {
      title: "Users",
      onClick: () => navigate("/admin/users"),
      icon: <i className="ri-user-2-line"></i>,
      path: "/admin/users",
    },
    {
      title: "Map",
      onClick: () => navigate("/map"),
      icon: <i className="ri-map-pin-line"></i>,
      path: "/map",
    },
    {
      title: "Logout",
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
      icon: <i className="ri-logout-box-r-line"></i>,
      path: "/login",
    },
  ];

  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    try {
      if (user) {
        if(user.admin_id && user.admin_id.is_admin){
          setMenuToRender(adminMenu);
        }
        else if (user.recruiter_id && user.recruiter_id.is_recruiter){
          setMenuToRender(recruiterMenu);
        }
        else if (user.user_id && user.user_id.is_user) {
          setMenuToRender(userMenu);
        } 
      } else { 
        setMenuToRender(unAuthorized);
      }
    } catch (error) {
      console.log(error);
    }
  };  


  const loadNotifications = async () => {
    try {
      dispatch(ShowLoading());
      await getUserNofications();
      dispatch(HideLoading());
      dispatch(SetReloadNotifications(false));
    } catch (error) {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (reloadNotifications) {
      loadNotifications();
    }
  }, [reloadNotifications]);

  const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };
  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  const items = [
    {
      label: 'as User',
      key: '1',
      icon: <UserOutlined />,
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/login");
      },
      path: "/login",
    },
    {
      label: 'as Recruiter',
      key: '2',
      icon: <UserOutlined />,
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/recruiter_login");
      },
      path: "/recruiter_login",
    },
    {
      label: 'as Admin',
      key: '3',
      icon: <UserOutlined />,
      danger: true,
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/admin_login");
      },
      path: "/admin_login",
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="layout">
      <div className="sidebar justify-content-between flex">
        <div
          className="menu"
          style={{
            width: collapsed ? "40px" : "150px",
          }}
        >
          {menuToRender.map((item, index) => {
            const isActive = window.location.pathname === item.path;
            return (
              <div
                className={`menu-item ${isActive && "active-menu-item"}`}
                onClick={item.onClick}
                key={index}
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="content">
        <div className="header justify-content-between d-flex">
          <div className="d-flex items-center gap-2">
            {collapsed && (
              <i
                className="ri-menu-2-fill"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
            {!collapsed && (
              <i
                className="ri-close-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
            <span className="logo">hiredGo</span>
          </div>
          <div className="d-flex gap-1 align-items-center">
          {
            user
              ? <Badge
                  count={unreadNotifications?.length || 0}
                  className="mx-5"
                  onClick={() => navigate("/notifications")}
                >
                  <i className="ri-notification-line"></i>
                </Badge>
              : null
          }

            <span>{
            user && (user.user_id || user.admin_id || user.recruiter_id)
            ? (user.user_id ? user.user_id.name 
               : user.admin_id ? user.admin_id.name 
               : user.recruiter_id.name)
            :
            <Space wrap>
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    Sign in
                  <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              </Space>}</span>
          </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
