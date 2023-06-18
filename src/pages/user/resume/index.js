import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Form, Tabs, message } from "antd";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/alertSlice";
import { getResumeById } from "../../../apis/resumes";
import { useNavigate, useParams } from "react-router-dom";
import NewEditResume from "./NewEditResume";
import ListOfResume from "./ListOfResume";
const { TabPane } = Tabs;

function Resumes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [resumeData, setResumeData] = useState();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getResumeById();
      dispatch(HideLoading());
      if (response.success) {
        console.log(response.data);
        setResumeData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title="Мои резюме" />
      {resumeData && Object.keys(resumeData).length >= 0 && (
        <Form layout="vertical" initialValues={resumeData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Список резюме" key="1">
              <ListOfResume />
            </TabPane>
          </Tabs>
        </Form>
      )}
    </div>
  );
}

export default Resumes;

