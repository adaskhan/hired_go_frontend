import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, message, Table,Modal } from "antd";
import { useEffect, useState } from "react";
import {
  changeJobStatusFromAdmin,
  deleteJobById,
  getAllVacancies,
} from "../../apis/jobs";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import PageTitle from "../../components/PageTitle";

function AllJobs({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: "", description: "", location: "", salary: "", vacancy_type: "", skills: "", company_name: "", experience: "" });

  const openModal = (title, description, location, salary, vacancy_type, skills, company_name, experience) => {
    setModalData({ title, description, location, salary, vacancy_type, skills, company_name, experience });
    setShowModal(true);
  };
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllVacancies();
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const deleteJob = async (id) => {
    try {
      dispatch(ShowLoading());
  
      const response = await deleteJobById(id);
      if (response.success) {
        const updatedJobs = data.filter(job => job.id !== id);
        setData(updatedJobs);
        message.success("Vacancy successfully deleted.");
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };  

  const changeStatus = async (jobData, status) => {
    try {
      dispatch(ShowLoading());

      const response = await changeJobStatusFromAdmin({
        ...jobData,
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
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => (
        <span
          className="title-link"
          onClick={() => openModal(record.title, record.description, record.location, record.salary, record.vacancy_type, record.skills, record.company_name, record.experience)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Company",
      dataIndex: "company_name_id",
      render: company => company?.company_name
    },
    {
      title: "Posted On",
      dataIndex: "start_date",
    },
    {
      title: "Last Date to Apply",
      dataIndex: "end_date",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex gap-2 align-items-center">
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteJob(record.id)}
          ></i>
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
        <PageTitle title="All Jobs" />
      </div>

      <Table columns={columns} dataSource={data} />
      {showModal && (
        <Modal
          title={modalData.title}
          open={true} 
          onCancel={() => setShowModal(false)}
          footer={null}
          width={800} // Set the width of the modal as per your design
        >
          <div>{modalData.description}</div>
          <div>{modalData.location}</div>
          <div>{modalData.salary} теңге</div>
          <div>{modalData.skills}</div>
          <div>{modalData.company_name}</div>
          <div>{modalData.experience}</div>
        </Modal>
      )}
    </div>
  );
}

export default AllJobs;