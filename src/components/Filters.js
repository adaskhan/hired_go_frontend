import { message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { getAllVacancies } from "../apis/jobs";
import { HideLoading, ShowLoading } from "../redux/alertSlice";

function Filters({ filters, setFilters, setData }) {
  const dispatch = useDispatch();

  const filterData = async (filtersTemp) => {
    try {
      dispatch(ShowLoading());
      const response = await getAllVacancies(filtersTemp);
      if (response.success) {
        const approvedJobs = response.data.filter(
          (job) => job.status === "approved"
        );
        setData(approvedJobs);
      }
     
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  
  return (
    <div>
      <div className="d-flex justify-content-start gap-2">
        <select
          name=""
          id=""
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="">Location</option>
          <option value="Almaty">Almaty</option>
          <option value="Astana">Astana</option>
          <option value="Kokshetau">Kokshetau</option>
        </select>
        <select
          name=""
          id=""
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
        >
          <option value="">Tech stack</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="JavaScript">JavaScript</option>
        </select>

        <select
          name=""
          id=""
          value={filters.experience}
          onChange={(e) =>
            setFilters({ ...filters, experience: e.target.value })
          }
        >
          <option value="">Experience</option>
          <option value="0">Fresher</option>
          <option value="1">1 Year</option>
          <option value="2">2 Years</option>
          <option value="3">3</option>
        </select>
        <button className="primary-outlined-btn" onClick={() => {
          filterData({
            location:"",
            industry:"",
            experience:""
        })
         setFilters({
            location:"",
            industry:"",
            experience:""
         })
        }}>
          CLEAR
        </button>
        <button className="primary-contained-btn" onClick={() => filterData(filters)}>
          FILTER
        </button>
      </div>
    </div>
  );
}

export default Filters;