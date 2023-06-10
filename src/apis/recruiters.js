import {
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
    getDoc,
    getDocs,
    collection,
    onSnapshot,
    query,
  } from "firebase/firestore";
  import { fireDB } from "../firebeaseConfig";
  import {
    SetReadNotifications,
    SetUnreadNotifications,
  } from "../redux/notifications";
  import store from "../redux/store";

  import moment from "moment";
  import axios from 'axios';

  export const getAllRecruiters = async () => {
    try {
        const userr = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(`http://127.0.0.1:8000/api/all_recruiters/`, {
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
            message: "No such recruiter!",
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
  
  export const getUserNofications = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const q = query(collection(fireDB, "users", user.id, "notifications"));
      onSnapshot(q, (querySnapshot) => {
        const notifications = [];
        querySnapshot.forEach((doc) => {
          notifications.push({ id: doc.id, ...doc.data() });
        });
  
        const readNotifications = notifications.filter(
          (notification) => notification.status === "read"
        );
        const unreadNotifications = notifications.filter(
          (notification) => notification.status === "unread"
        );
        store.dispatch(SetReadNotifications(readNotifications));
        store.dispatch(SetUnreadNotifications(unreadNotifications));
      });
  
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };
  export const deleteRecruiterById = async (id) => {
    const userr = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete_recruiters/${id}/`, {
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
  export const changeRecruiterStatusFromAdmin = async (payload) => {
    try {
      console.log(payload);
      await updateDoc(doc(fireDB, "recruiters", payload.id), {
        ...payload,
        updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
      });

      await addDoc(
        collection(fireDB, "users", payload.postedByUserId, "notifications"),
        {
          title: `Your recruiter post request for ${payload.title} has been ${payload.status}`,
          onClick: `/`,
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
  export const changeNotificationStatus = async (id, status) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      await updateDoc(doc(fireDB, "users", user.id, "notifications", id), {
        status,
      });
      return {
        success: true,
        message: "Notification status changed",
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };