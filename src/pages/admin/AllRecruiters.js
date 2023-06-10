import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { message, Table } from "antd";
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
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex gap-2 align-items-center">
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteRecruiter(record.id)}
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
        <PageTitle title="All Recruiters" />
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AllRecruiters;