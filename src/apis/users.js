import {
    setDoc,
    updateDoc,
    doc,
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
  import axios from 'axios';
  
  export const updateUserProfile = async (payload) => {
    console.log(payload);
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      await updateDoc(doc(fireDB, "users", user.id), payload);
      return {
        success: true,
        message: "Profile updated successfully",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };

  export const deleteUserProfile = async (id) => {
    const userr = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.delete(`https://hiredgo.pythonanywhere.com/api/delete_applicant/${id}/`, {
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
  
  export const getUserProfile = async (id) => {
    try {
      const docRef = doc(fireDB, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          success: true,
          data: docSnap.data(),
        };
      } else {
        return {
          success: false,
          message: "No such user!",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };
  
  export const getAllUsers = async () => {
    try {
      const userr = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(`https://hiredgo.pythonanywhere.com/api/view_applicants/`, {
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