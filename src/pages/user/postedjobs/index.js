import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";
import {
  getPostedJobsByUserId,
  deleteJobById,
  getApplicationsByJobId,
} from "../../../apis/jobs";
import { message, Table } from "antd";
import { useEffect } from "react";
import AppliedCandidates from "./AppliedCandidates";

function PostedJobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [showAppliedCandidates, setShowAppliedCandidates] =
    React.useState(false);
  const [appiledCandidates, setAppiledCandidates] = React.useState([]);
  
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getPostedJobsByUserId();
      if (response.success) {
        console.log(response.data);
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

  const getAppliedCandidates = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await getApplicationsByJobId(id);
      if (response.success) {
        setAppiledCandidates(response.data);
        if(!showAppliedCandidates)
        {
          setShowAppliedCandidates(true);
        }
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
      dataIndex: "title",
    },
    {
      title: "Компания",
      dataIndex: "company_name_id",
      render: company => company?.company_name
    },
    {
      title: "Дата объявления",
      dataIndex: "start_date",
    },
    {
      title: "Доступно до",
      dataIndex: "end_date",
    },
    {
      title: "Действие",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex gap-3 align-items-center">
          <span
            className="underline"
            onClick={() => getAppliedCandidates(record.id)}
          >
            кандидаты
          </span>
          <i
            class="ri-delete-bin-line"
            onClick={() => deleteJob(record.id)}
          ></i>
          <i
            class="ri-pencil-line"
            onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Мои вакансии" />
        <button
          className="primary-outlined-btn"
          onClick={() => navigate("/posted-jobs/new")}
        >
          Создать
        </button>
      </div>

      <Table columns={columns} dataSource={data} />

      {showAppliedCandidates && (
        <AppliedCandidates
          showAppliedCandidates={showAppliedCandidates}
          setShowAppliedCandidates={setShowAppliedCandidates}
          appiledCandidates={appiledCandidates}
          reloadData={getAppliedCandidates}
        />
      )}
    </div>
  );
}

export default PostedJobs;