import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
  } from "firebase/firestore";
  import moment from "moment";
  import { fireDB } from "../firebeaseConfig";
  import axios from 'axios';

export const addNewJobPost = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const data = {
    ...payload,
    company_name_id: user.recruiter_id.id
  }
  console.log(data);

  try {
    const userr = JSON.parse(localStorage.getItem("user"));
    const response = await axios.post('http://127.0.0.1:8000/api/add_vacancies/', data, {
      headers: {
        'Authorization': `Bearer ${userr.access}`,
        'Content-Type': 'application/json' // Pass the access token in the headers
      },
    });
    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        message: "Job posted successfully",
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

  
  export async function getPostedJobsByUserId(userId) {
    const userr = JSON.parse(localStorage.getItem("user"));
    const response = await fetch('http://localhost:8000/api/vacancies_list/', {
      headers: {
        Authorization: `Bearer ${userr.access}`, 
      },
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data };
    }
  }
  

export const getJobById = async (id) => {
  try {
    const userr = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(`http://127.0.0.1:8000/api/vacancies_detail/${id}/`, {
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

  
  export const getAllVacancies = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/all_vacancies/');
      const data = await response.json();
      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          message: data.detail || "Something went wrong",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };  
  
  
  export const editJobDetails = async (payload) => {
    console.log(payload);
    try {
      await updateDoc(doc(fireDB, "jobs", payload.id), {
        ...payload,
        updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
      });
      return {
        success: true,
        message: "Job updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };
  
  export const changeJobStatusFromAdmin = async (payload) => {
    try {
      console.log(payload);
      await updateDoc(doc(fireDB, "jobs", payload.id), {
        ...payload,
        updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
      });

      await addDoc(
        collection(fireDB, "users", payload.postedByUserId, "notifications"),
        {
          title: `Your job post request for ${payload.title} has been ${payload.status}`,
          onClick: `/posted-jobs`,
          createdAt: moment().format("DD-MM-YYYY HH:mm A"),
          status: "unread",
        }
      );
      return {
        success: true,
        message: "Job updated successfully",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };
  
  export const deleteJobById = async (id) => {
    const userr = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete_vacancy/${id}/`, {
        headers: {
          Authorization: `Bearer ${userr.access}`, 
        },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };
  
  export const applyJobPost = async (payload) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const job = payload;
    try {
      await addDoc(collection(fireDB, "applications"), {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        userId: user.id,
        userName: user.name,
        email: user.email,
        phoneNumber: user?.phoneNumber || "",
        appliedOn: moment().format("DD-MM-YYYY HH:mm A"),
        status: "pending",
      });
  
      await addDoc(
        collection(fireDB, "users", job.postedByUserId, "notifications"),
        {
          title: `${user.name} has applied for your job post ${job.title}`,
          onClick: `/posted-jobs`,
          createdAt: moment().format("DD-MM-YYYY HH:mm A"),
          status: "unread",
        }
      );
      return {
        success: true,
        message: "Job applied successfully",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };
  
  export const getApplicationsByUserId = async (userId) => {
    try {
      const applications = [];
      const qry = query(
        collection(fireDB, "applications"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(qry);
      querySnapshot.forEach((doc) => {
        applications.push({ id: doc.id, ...doc.data() });
      });
      return {
        success: true,
        data: applications,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };


export const getApplicationsByJobId = async (jobId) => {
  try {
    const userr = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(`http://localhost:8000/api/all_applicants/${jobId}/`, {
      headers: {
        Authorization: `Bearer ${userr.access}`, // Pass the access token in the headers
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

  
  export const getAllApplications = async () => {
    try {
      const applications = [];
      const qry = query(collection(fireDB, "applications"));
      const querySnapshot = await getDocs(qry);
      querySnapshot.forEach((doc) => {
        applications.push({ id: doc.id, ...doc.data() });
      });
      return {
        success: true,
        data: applications,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };
  
  export const changeApplicationStatus = async (payload) => {
    try {
      await updateDoc(doc(fireDB, "applications", payload.id), {
        status: payload.status,
      });
  
      await addDoc(collection(fireDB, `users/${payload.userId}/notifications`), {
        title: `Your application for ${payload.jobTitle} in ${payload.company} is ${payload.status}`,
        onClick: `/applied-jobs`,
        status: "unread",
        createdAt: moment().format("DD-MM-YYYY HH:mm A"),
      });
      return {
        success: true,
        message: "Application status updated successfully",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };
