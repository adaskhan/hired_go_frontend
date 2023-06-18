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
          <option value="">Локация</option>
          <option value="Almaty">Алматы</option>
          <option value="Astana">Астана</option>
          <option value="Kostanai">Костанай</option>
          <option value="Kyzylorda">Кызылорда</option>
          <option value="Taraz">Тараз</option>
          <option value="Shymkent">Шымкент</option>
          <option value="Semei">Семей</option>
          <option value="Pavlodar">Павлодар</option>
          <option value="Aktobe">Актобе</option>
          <option value="Kokshetau">Кокшетау</option>
        </select>
        <select
          name=""
          id=""
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
        >
          <option value="">Стэк</option>
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
          ОЧИСТИТЬ
        </button>
        <button className="primary-contained-btn" onClick={() => filterData(filters)}>
          ФИЛЬТР
        </button>
      </div>
    </div>
  );
}

export default Filters;