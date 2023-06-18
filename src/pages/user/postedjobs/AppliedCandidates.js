import { List, message, Modal, Table } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeApplicationStatus } from "../../../apis/jobs";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";
import axios from 'axios';

function AppliedCandidates({
  showAppliedCandidates,
  setShowAppliedCandidates,
  appiledCandidates,
  reloadData,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    experiences: "",
    educations: "",
    contacts: "",
    summary: "",
    skills: "",
    languages: "",
    created_date: "",
  });

  const openModal = async (id) => {
    try {
      dispatch(ShowLoading());
      const userr = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(`http://127.0.0.1:8000/api/view_resume/${id}/`, {
        headers: {
          Authorization: `Bearer ${userr.access}`, // Pass the access token in the headers
        },
      });
  
      dispatch(HideLoading());
  
      if (response.status === 200) {
        const data = response.data;
        const experiences = data.experiences.map((experience) => (
          <div key={experience.company}>
            <p>Company: {experience.company}</p>
            <p>Position: {experience.position}</p>
            <p>Period: {experience.period_start} - {experience.period_end}</p>
          </div>
        ));
        const educations = data.educations.map((education) => (
          <div key={education.institution}>
            <p>Institution: {education.institution}</p>
            <p>Degree: {education.degree}</p>
            <p>Period: {education.period_start} - {education.period_end}</p>
          </div>
        ));
  
        setModalData({
          title: data.title,
          experiences,
          educations,
          contacts: data.contacts,
          summary: data.summary,
          skills: data.skills,
          languages: data.languages,
        });
        setShowModal(true);
      } else {
        const errorData = await response.json();
        message.error(errorData.message);
      }
    } catch (error) {
      message.error("Something went wrong");
      dispatch(HideLoading());
    }
  };
  

  const changeStatus = async (applicationData, status) => {
    const userr = JSON.parse(localStorage.getItem("user"));
    try {
      dispatch(ShowLoading());
  
      let response;
      if (status === "Accepted") {
        
        response = await axios.post(
          `http://localhost:8000/api/invite_candidate/${applicationData.id}/`, {
            headers: {
              Authorization: `Bearer ${userr.access}`, // Pass the access token in the headers
            },
          });
      } else if (status === "Rejected") {
        response = await axios.post(
          `http://localhost:8000/api/refuse_candidate/${applicationData.id}/`, {
            headers: {
              Authorization: `Bearer ${userr.access}`, // Pass the access token in the headers
            },
          }
        );
      }
  
      dispatch(HideLoading());
  
      if (response.status === 200) {
        message.success("Application status changed successfully");
        reloadData(applicationData.jobId);
      } else {
        message.error("Failed to change application status");
      }
    } catch (error) {
      message.error("Something went wrong");
      dispatch(HideLoading());
    }
  };
  

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: ["applicant", "full_name"],
      render: (text, record) => (
        <span key={record.id} className="title-link" onClick={() => openModal(record.resume.id)}>
          {text}
        </span>
      ),
      
    },
    {
      title: "Phone",
      dataIndex: ["applicant", "phone"],
    },
    {
      title: "Email",
      dataIndex: ["resume", "contacts"],
    },
    {
      title: "Application Date",
      dataIndex: "application_date",
    },
    {
      title: "Resume Title",
      dataIndex: ["resume", "title"],
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
          return (
            <div>
              <span
                className="underline"
                onClick={() => changeStatus(record, "Accepted")}
              >
                Accept
              </span>
              <span
                className="underline mx-2"
                onClick={() => changeStatus(record, "Rejected")}
              >
                Reject
              </span>
            </div>
          );
        
      },
    },
  ];
  

  const fetchResumeData = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/get_resumes/${id}/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return { success: false, message: "Failed to fetch resume data" };
    }
  };

  return (
    <div>
      <Modal
        title="Applied Candidates"
        open={showAppliedCandidates}
        onCancel={() => setShowAppliedCandidates(false)}
        footer={null}
        width={1000}
      >
        <Table columns={columns} dataSource={appiledCandidates} rowKey="id" />
      </Modal>
      {showModal && (
        <Modal
          title={modalData.title}
          open={true}
          onCancel={() => setShowModal(false)}
          footer={null}
          width={800}
        >
          <List>
            <List.Item>
              <strong>Title:</strong> {modalData.title}
            </List.Item>
            <List.Item>
              <strong>Experiences:</strong> {modalData.experiences}
            </List.Item>
            <List.Item>
              <strong>Educations:</strong> {modalData.educations}
            </List.Item>
            <List.Item>
              <strong>Skills:</strong> {modalData.skills}
            </List.Item>
            <List.Item>
              <strong>Contacts:</strong> {modalData.contacts}
            </List.Item>
            <List.Item>
              <strong>Summary:</strong> {modalData.summary}
            </List.Item>
            <List.Item>
              <strong>Languages:</strong> {modalData.languages}
            </List.Item>
            <List.Item>
              <strong>Created Date:</strong> {modalData.created_date}
            </List.Item>
          </List>
        </Modal>
      )}
    </div>
  );
}

export default AppliedCandidates;
