import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, message, Table } from "antd";
import { getResumeById } from "../../../apis/resumes";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";
import PageTitle from "../../../components/PageTitle";

function ListOfResume() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getResumeById();
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => (
        <span className="title-link">{text}</span>
      ),
    },
    {
      title: "Contacts",
      dataIndex: "contacts",
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="My Resumes" />
        <button
          className="primary-outlined-btn"
          onClick={() => navigate("/my-resumes/new")}
        >
          New Resume
        </button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default ListOfResume;