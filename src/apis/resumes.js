import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { fireDB } from "../firebeaseConfig";


export const addNewResume = async (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    const data = {
      ...payload,
      company_name_id: user.user_id.id
    }
    console.log(data);
  
    try {
      const userr = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post('http://127.0.0.1:8000/api/create_resume/', data, {
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


  export const getResumeById = async () => {
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

  


  