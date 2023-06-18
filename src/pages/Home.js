import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllVacancies } from "../apis/jobs";
import Filters from "../components/Filters";
import PageTitle from "../components/PageTitle";
import { HideLoading, ShowLoading } from "../redux/alertSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [filters, setFilters] = React.useState({
    location: "",
    industry: "",
    experience: "",
  });

  

  const getData = async () => {
    try {
        dispatch(ShowLoading());
        const response = await getAllVacancies();
        if (response.success) {
            setData(response.data); // directly setting data from response
        }
        dispatch(HideLoading());
    } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
    }
  };

  const[value,setValue]=useState("");


  const searchVacancies = data.filter(vacancy => {
    return vacancy.title && vacancy.title.toLowerCase().includes(value.toLowerCase());
  });
  

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
        <div className="Searchform" style={{width:'30vw'}}>
            <form className="search">
                <input
                    type="text"
                    placeholder="Search"
                    className="search_input"
                    onChange={(event)=>setValue(event.target.value)}
                ></input>
            </form>
        </div>
        <br></br>
      <Filters filters={filters} setFilters={setFilters} setData={setData} />
      <Row gutter={[15, 15]} className="mt-3">
      {searchVacancies.map((vacancy) => (
            <Col span={8} key={vacancy.id}>
                <div className="job-card">
                    <h3 className="uppercase">{vacancy.title}</h3>
                    <div className="light-divider"></div>

                    <div className="d-flex flex-column gap-1">
                        <div className="d-flex justify-content-between mt-1">
                            <span>Company</span>
                            <span>{vacancy.company_name_id.company_name}</span> 
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Location</span>
                            <span>{vacancy.location}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Salary</span>
                            <span>{vacancy.salary}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Created On</span>
                            <span>{vacancy.creation_date}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Last Date To Apply</span>
                            <span>{vacancy.end_date}</span>
                        </div>
                    </div>

                    <button
                        className="primary-outlined-btn w-100 mt-2"
                        onClick={() => navigate(`/job-description/${vacancy.id}`)}
                    >
                        Apply Now
                    </button>
                </div>
            </Col>
        ))}

      </Row>
    </div>
  );
}

export default Home;