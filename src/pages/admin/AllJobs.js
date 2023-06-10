import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { message, Table } from "antd";
import { useEffect } from "react";
import {
  changeJobStatusFromAdmin,
  deleteJobById,
  editJobDetails,
  getAllVacancies,
} from "../../apis/jobs";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import PageTitle from "../../components/PageTitle";

function AllJobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
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
        setData(response.data);
        getData();
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
          {record.status === "approved" && (
            <span
              className="underline"
              onClick={() => changeStatus(record, "rejected")}
            >
              Reject
            </span>
          )}

          {(record.status === "pending" || record.status === "rejected") && (
            <span
              className="underline"
              onClick={() => changeStatus(record, "approved")}
            >
              Approve
            </span>
          )}
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
        <button
          className="primary-outlined-btn"
          onClick={() => navigate("/posted-jobs/new")}
        >
          New Job
        </button>
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AllJobs;