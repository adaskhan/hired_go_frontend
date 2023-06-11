import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { fireDB } from "../firebeaseConfig";


export const addNewResume = async (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    const data = {
      ...payload,
      company_name_id: user.recruiter_id.id
    }
    console.log(data);
  
    try {
      const userr = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post('http://127.0.0.1:8000/api/create_resume_api/', data, {
        headers: {
          'Authorization': `Bearer ${userr.access}`,
          'Content-Type': 'application/json' // Pass the access token in the headers
        },
      });
      if (response.status === 200 || response.status === 201) {
        return {
          success: true,
          message: "Resume posted successfully",
        };
      } else {
        console.log(response.data);
        return {
          success: false,
          message: response.data.error || "Something went wrong",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.message || "Something went wrong",
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
        message: "Resume updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };
  export const getResumeById = async (id) => {
    try {
      const userr = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(`http://127.0.0.1:8000/api/resume_detail_api/${id}/`, {
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
          message: "No such resume!",
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


  