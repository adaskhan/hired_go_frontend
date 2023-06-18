import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { fireDB } from "../firebeaseConfig";


export const addNewResume = async (payload) => {
  console.log("Form Submitted");
  const user = JSON.parse(localStorage.getItem("user"));

  const data = {
    ...payload,
  }
  console.log("Data: ", data.skills);  

  try {
    const userr = JSON.parse(localStorage.getItem("user"));
    console.log("User: ", userr); 
    const response = await axios.post('http://127.0.0.1:8000/api/create_resume/', data, {
      headers: {
        'Authorization': `Bearer ${userr.access}`,
        'Content-Type': 'application/json' 
      },
    });
    console.log("Response: ", response);  
    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        message: "Резюме успешно добавлено",
      };
    } else {
      console.log(response.data);
      return {
        success: false,
        message: response.data.error || "Произошла ошибка",
      };
    }
  } catch (error) {
    console.error(error);  
    return {
      success: false,
      message: error.message || "Произошла ошибка",
    };
  }
};


  export const editResumeDetails = async (payload) => {
    console.log(payload);
    try {
      await updateDoc(doc(fireDB, "jobs", payload.id), {
        ...payload,
        updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
      });
      return {
        success: true,
        message: "Резюме было обновлено успешно",
      };
    } catch (error) {
      return {
        success: false,
        message: "Произошла ошибка",
      };
    }
  };
  export const getResumeById = async (id) => {
    try {
      const userr = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(`http://127.0.0.1:8000/api/get_resumes/`, {
        headers: {
          Authorization: `Bearer ${userr.access}`, // Pass the access token in the headers
        },
      });
  
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: "Резюме не найдено!",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Произошла ошибка",
      };
    }
  };

  
  export const getResumesById = async (id) => {
    try {
      const userr = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(`http://127.0.0.1:8000/api/resume_detail/${id}/`, {
        headers: {
          Authorization: `Bearer ${userr.access}`, // Pass the access token in the headers
        },
      });
  
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: "No such job!",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };
  

  