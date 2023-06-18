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
        const approvedJobs = response.data.filter((job) => {
          const isLocationMatch =
            !filtersTemp.location || job.location === filtersTemp.location;
          const isIndustryMatch =
            !filtersTemp.industry || job.tech_stack.includes(filtersTemp.industry);
          return isLocationMatch && isIndustryMatch;
        });
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
      <div className="d-flex justify-content-start gap-2"  style={{width: '60vw'}}>
        <select
          name=""
          id=""
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="">Location</option>
          <option value="Almaty">Almaty</option>
          <option value="Astana">Astana</option>
          <option value="Kostanai">Kostanai</option>
          <option value="Kyzylorda">Kyzylorda</option>
          <option value="Taraz">Taraz</option>
          <option value="Shymkent">Shymkent</option>
          <option value="Semei">Semei</option>
          <option value="Pavlodar">Pavlodar</option>
          <option value="Aktobe">Aktobe</option>
          <option value="Kokshetau">Kokshetau</option>
        </select>
        <select
          name=""
          id=""
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
        >
          <option value="">Tech Stack</option>
          <option value="Python">Python</option>
          <option value="JavaScript">Java</option>
          <option value="Ruby">Ruby</option>
          <option value="Java">Java</option>
          <option value="PHP">PHP</option>
          <option value="Go">Go</option>
          <option value="Cpp">C++</option>
          <option value="Csh">C#</option>
          <option value="Swift">Swift</option>
          <option value="Kotlin">Kotlin</option>
          <option value="TypeScript">TypeScript</option>
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