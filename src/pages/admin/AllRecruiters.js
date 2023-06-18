import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Option } from "antd/lib/mentions";
import { message, Select, Table } from "antd";
import { useEffect } from "react";
import {
  changeRecruiterStatusFromAdmin,
  deleteRecruiterById,
  getAllRecruiters,
} from "../../apis/recruiters";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import PageTitle from "../../components/PageTitle";
import axios from 'axios';

function AllRecruiters() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllRecruiters();
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const deleteRecruiter = async (id) => {
    try {
      dispatch(ShowLoading());
  
      const response = await deleteRecruiterById(id);
      if (response.success) {
        const updatedUsers = data.filter(user => user.user.id !== id);
        setData(updatedUsers);
        message.success("Рекрутер был успешно удален.");
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  

  const changeStatus = async (recruiterData, newStatus) => {
    try {
      dispatch(ShowLoading());
  
      const statusMap = {
        "approved": "Accepted",
        "rejected": "Rejected",
      };
  
      const apiStatus = statusMap[newStatus];
  
      const response = await changeRecruiterStatusFromAdmin({
        ...recruiterData,
        status: apiStatus, // Update the status to the new value
      });
      if (response.success) {
        const updatedRecruiter = response.data;
        console.log('recruiterData:', recruiterData); // Added this line
        console.log('updatedRecruiter:', updatedRecruiter); // Added this line
        console.log('recruiterData.user:', recruiterData.user); // Added this line
        console.log('updatedRecruiter.user:', updatedRecruiter.user); // Added this line

        const updatedData = data.map(recruiter => 
          recruiter.user.id === recruiterData.user.id ? {...recruiter, status: updatedRecruiter.status} : recruiter
        );

  
        setData(updatedData);
  
        message.success(`Статус рекрутера была успешно обновлен на ${newStatus}.`);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  

  const getPendingRecruiters = async () => {
    try {
      const userr = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(`https://hiredgo.pythonanywhere.com/api/pending_recruiters/`, {
        headers: {
          Authorization: `Bearer ${userr.access}`, // Pass the access token in the headers
        },
      });
  
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: "No such recruiter!",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };

  const getAcceptedRecruiters = async () => {
    try {
      const userr = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(`https://hiredgo.pythonanywhere.com/api/accepted_recruiters/`, {
        headers: {
          Authorization: `Bearer ${userr.access}`, // Pass the access token in the headers
        },
      });
  
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: "No such recruiter!",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };

  const getRejectedRecruiters = async () => {
    try {
      const userr = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(`https://hiredgo.pythonanywhere.com/api/rejected_recruiters/`, {
        headers: {
          Authorization: `Bearer ${userr.access}`, // Pass the access token in the headers
        },
      });
  
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: "No such recruiter!",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };

  const statusApiMap = {
    "pending": getPendingRecruiters,
    "Accepted": getAcceptedRecruiters,
    "Rejected": getRejectedRecruiters,
  };

  // Adjust handleStatusChange to use the map and make a GET request
const handleStatusChange = async (value, recruiterData) => {
  // Get the function for the selected status
  const statusFunction = statusApiMap[value];

  // If the function exists, call it
  if (statusFunction) {
    try {
      const response = await statusFunction();

      // If the response is successful, update the displayed data
      if (response.success) {
        setData(response.data);
        message.success(`Successfully fetched ${value} recruiters.`);
      }
    } catch (error) {
      message.error(error.message);
    }
  }
};


  
  const columns = [
    {
      title: "ФИО",
      dataIndex: "user_first_name",
    },
    {
        title: "Почта",
        dataIndex: "email",
      },
    {
      title: "Компания",
      dataIndex: "company_name",
    },
    {
        title:   (text, record) => (
            <Select
              defaultValue={text}
              style={{ width: 120 }}
              onChange={(value) => handleStatusChange(value, record)}
            >
              <Option value="Accepted">Подтвержден</Option>
              <Option value="Rejected">Отклонен</Option>
              <Option value="pending">На рассмотрении</Option>
            </Select>
          ),
        dataIndex: "status",
        
      },
    {
      title: "Действие",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex gap-2 align-items-center">
            {record.status === 'pending' && (
              <>
                <i className="ri-check-line"
                  onClick={() => changeStatus(record, "approved")}></i>
                <i className="ri-close-line"
                  onClick={() => changeStatus(record, "rejected")}></i>
              </>
            )}
            <i className="ri-delete-bin-line" 
            onClick={() => deleteRecruiter(record.user.id)}></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="All Recruiters" />
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AllRecruiters;