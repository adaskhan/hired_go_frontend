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
        setData(response.data);
        getData();
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const changeStatus = async (recruiterData, status) => {
    try {
      dispatch(ShowLoading());

      const response = await changeRecruiterStatusFromAdmin({
        ...recruiterData,
        status,
      });
      if (response.success) {
        setData(response.data);
        getData();
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const handleStatusChange = async (value, recruiterData) => {
    await changeStatus(recruiterData, value);
  };
  
  const columns = [
    {
      title: "Name",
      dataIndex: "user_first_name",
    },
    {
        title: "Email",
        dataIndex: "email",
      },
    {
      title: "Company",
      dataIndex: "company_name",
    },{
        title:   (text, record) => (
            <Select
              defaultValue={text}
              style={{ width: 120 }}
              onChange={(value) => handleStatusChange(value, record)}
            >
              <Option value="Accepted">Accepted</Option>
              <Option value="Rejected">Rejected</Option>
              <Option value="pending">Pending</Option>
            </Select>
          ),
        dataIndex: "status",
        
      },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex gap-2 align-items-center">
            <i className="ri-check-line"
              onClick={() => changeStatus(record, "approved")}></i>
            <i className="ri-close-line"
              onClick={() => changeStatus(record, "rejected")}></i>
            <i className="ri-delete-bin-line" 
            onClick={() => deleteRecruiter(record.id)}></i>
          
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