import { message, Modal, Table } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeApplicationStatus } from "../../../apis/jobs";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";

function AppliedCandidates({
  showAppliedCandidates,
  setShowAppliedCandidates,
  appiledCandidates,
  reloadData,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: "", experiences: "", educations: "", contacts: "", summary: "", skills: "", languages: "", created_date: "" });

  const openModal = (title, experiences, educations, contacts, summary, skills, languages, created_date) => {
    setModalData({ title, experiences, educations, contacts, summary, skills, languages, created_date });
    setShowModal(true);
  };

  const changeStatus = async (applicationData ,  status) => {
    try {
      dispatch(ShowLoading());
      const response = await changeApplicationStatus({
        ...applicationData,
        status,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        reloadData(applicationData.jobId);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Something went wrong");
      dispatch(HideLoading());
    }
  };

  // const columns = [
  //   {
  //     title: "Id",
  //     dataIndex: "id",
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "userName",
  //     render: (text, record) => {
  //       return (
  //         <span
  //           className="underline"
  //           onClick={() => navigate(`/profile/${record.userId}`)}
  //         >
  //           {text}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     title: "Email",
  //     dataIndex: "email",
  //   },
  //   {
  //     title: "Phone",
  //     dataIndex: "phoneNumber",
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //   },
  //   {
  //     title: "Action",
  //     dataIndex: "action",
  //     render: (text, record) => {
  //       return (
  //         <div>
  //           {record.status === "pending" && (
  //             <>
  //               <span
  //                 className="underline"
  //                 onClick={() =>
  //                   changeStatus(record, "approved")
  //                 }
  //               >
  //                 Approve
  //               </span>
  //               <span
  //                 className="underline mx-2"
  //                 onClick={() =>
  //                   changeStatus(record , "rejected")
  //                 }
  //               >
  //                 Reject
  //               </span>
  //             </>
  //           )}
  //         </div>
  //       );
  //     },
  //   },
  // ];
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: ["applicant", "full_name"], // Accessing nested data
      render: (text, record) => (
        <span
          className="title-link"
          onClick={() => openModal(record.title, record.experiences, record.educations, record.contacts, record.summary, record.skills, record.languages, record.created_date)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: ["applicant", "phone"], // Accessing nested data
    },
    {
      title: "Email",
      dataIndex: ["resume", "contacts"], // Accessing nested data
    },
    {
      title: "Application Date",
      dataIndex: "application_date",
    },
    {
      title: "Resume Title",
      dataIndex: ["resume", "title"], // Accessing nested data
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            {record.status === "pending" && (
              <>
                <span
                  className="underline"
                  onClick={() =>
                    changeStatus(record, "approved")
                  }
                >
                  Approve
                </span>
                <span
                  className="underline mx-2"
                  onClick={() =>
                    changeStatus(record , "rejected")
                  }
                >
                  Reject
                </span>
              </>
            )}
          </div>
        );
      },
    },
  ];
  

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
          width={800} // Set the width of the modal as per your design
        >
          <div>{modalData.title}</div>
          <div>{modalData.experiences}</div>
          <div>{modalData.educations}</div>
          <div>{modalData.skills}</div>
          <div>{modalData.contacts}</div>
          <div>{modalData.summary}</div>
          <div>{modalData.languages}</div>
          <div>{modalData.created_date}</div>
        </Modal>
      )}
    </div>
  );
}

export default AppliedCandidates;