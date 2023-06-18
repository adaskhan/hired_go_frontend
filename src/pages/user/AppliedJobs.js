import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import {
  getPostedJobsByUserId,
  deleteJobById,
  getApplicationsByUserId,
} from "../../apis/jobs";
import { message, Table } from "antd";
import { useEffect } from "react";
import axios from 'axios';

function AppliedJobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(`http://127.0.0.1:8000/api/get_applications/`, {
        headers: {
          Authorization: `Bearer ${user.access}`,
        }
      }); 
      console.log(response.data);
      if (response) {
        setData(response.data);
        console.log(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Вакансия",
      dataIndex: "vacancy_title",
    },
    {
      title: "Компания",
      dataIndex: "company_name",
    },
    {
      title: "Дата подачи заявок",
      dataIndex: "application_date",
    },
    {
      title: "Статус",
      dataIndex: "application_status",
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Мои отклики" />
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AppliedJobs;