import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { applyJobPost, getApplicationsByJobId, getJobById } from "../apis/jobs";
import PageTitle from "../components/PageTitle";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import axios from 'axios';

function JobDescription() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [jobData, setJobData] = React.useState(null);
  const [showApplyButton, setShowApplyButton] = React.useState(true);
  const [alreadyApplied, setAlreadyApplied] = React.useState(false);
  const userr = JSON.parse(localStorage.getItem("user"));

  
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getJobById(params.id);
  
      if (response && response.data) {
        setShowApplyButton(true);
        setJobData(response.data);
      } else {
        message.error("Error loading job data");
      }
  
      const applicationsResponse = await getApplicationsByJobId(params.id);
  
      if (applicationsResponse && applicationsResponse.data) {
        if (
          applicationsResponse.data.filter((item) => item.userId === userr.user_id)
            .length > 0
        ) {
          setShowApplyButton(true);
          setAlreadyApplied(false);
        }
      } else {
        console.log("Error loading application data");
      }
      
      await checkHasApplied();

      dispatch(HideLoading());
  
    } catch (error) {
      message.error(error.message);
    }
  };
  
  console.log(userr.user_id);

  const checkHasApplied = async () => {
    try {
      const response = await axios.get(`https://hiredgo.pythonanywhere.com/api/has_applied/${params.id}/${userr.user_id.user_id}/`, {
        headers: {
          Authorization: `Bearer ${userr.access}`,
        },
      });
      if (response && response.data) {
        setAlreadyApplied(response.data.hasApplied);
      }
    } catch (error) {
      message.error("Error checking application status");
    }
  };

  const applyNow = async () => {
    try {
      dispatch(ShowLoading());
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user.user_id.resume_id);
      const response = await axios.post(`https://hiredgo.pythonanywhere.com/api/vacancies_apply/${jobData.id}/`, 
      {
        resume_id: user.user_id.resume_id  // Replace `user.resume_id` with the actual resume_id you want to use.
      },
      {
        headers: {
          'Authorization': `Bearer ${user.access}`,  // Assuming the `access` token is stored in local storage under `user`
          'Content-Type': 'application/json'
        }
      });
      console.log('after applying');
      dispatch(HideLoading());
      if (response.status === 201) {
        message.success("Ваш отклик отправлен работодателю.");
        navigate("/");
      } else {
        message.error("Something went wrong with your application.");
      }
    } catch (error) {
      dispatch(HideLoading());
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        message.error(error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        message.error("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        message.error("An error occurred while setting up the request.");
      }
    }
  };
  

  useEffect(() => {
    getData();
  }, []);

  return (
    jobData && (
      <div>
        <PageTitle title={jobData.title} />

        <Row>
          <Col span={18}>
            <div className="d-flex flex-column gap-1">
              <div className="d-flex justify-content-between mt-1">
                <span>Компания</span>
                <span>{jobData.company_name_id.company_name}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Локация</span>
                <span>{jobData.location?.toUpperCase()}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Зарплата</span>
                <span>{jobData.salary}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Навыки</span>
                <span>{jobData.skills}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Опыт работы</span>
                <span>{jobData.experience}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Тип работы</span>
                <span>{jobData.vacancy_type}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Дата объявления</span>
                <span>{jobData.start_date}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Доступна до</span>
                <span>{jobData.end_date}</span>
              </div>
              {/* <div className="d-flex justify-content-between">
                <span>Posted By</span>
                <span>{jobData.user}</span>
              </div> */}
            </div>

            <h5 className="underline uppercase my-3">Описание</h5>
            <span className="pt-2">{jobData.description}</span>

            {alreadyApplied && (
              <div className="already-applied">
                <span>
                Вы уже подали заявку на эту работу. Вы можете просмотреть статус своей заявки в разделе "Мои отклики".
                </span>
              </div>
            )}

            <div className="d-flex gap-2 mt-3 justify-content-end">
              <button
                className="primary-outlined-btn"
                onClick={() => navigate("/")}
              >
                Отмена
              </button>
              {!alreadyApplied && (
                <button className="primary-contained-btn" onClick={applyNow}>
                  Откликнуться
                </button>
              )}
            </div>
          </Col>
        </Row>
      </div>
    )
  );
}

export default JobDescription;