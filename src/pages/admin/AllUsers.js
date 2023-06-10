import React from "react";
import { useDispatch } from "react-redux";
import { message, Table } from "antd";
import { useEffect } from "react";
import { editJobDetails } from "../../apis/jobs";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import PageTitle from "../../components/PageTitle";
import { getAllUsers, updateUserProfile } from "../../apis/users";

function Allusers() {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllUsers();
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      dispatch(ShowLoading());

      const response = await updateUserProfile({ id, status });
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
      dataIndex: "user_email",
    },
    {
      title: "User Id",
      dataIndex: "id",
    },
    {
        title: "Status",
        dataIndex: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex gap-2 align-items-center">
          {(
            <span
              className="underline"
              onClick={() => changeStatus(record.id, "rejected")}
            >
              Delete
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
        <PageTitle title="All Users" />
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Allusers;