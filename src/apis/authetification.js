import axios from "axios";
import {   message } from "antd";

export const LoginUser = async (payload) => {
  try {
    const response = await axios.post('https://hiredgo.pythonanywhere.com/api/user_login/', {
      username: payload.email,
      password: payload.password
    });
    
    if (response.status === 200) {
      console.log(response.data.is_user);
      if (!response.data.is_user) {
        return {
          success: false,
          message: "Only users can login with this form",
        };
      }
      const { id, access, refresh } = response.data;
      console.log(response.data);
      localStorage.setItem( 
        "user", 
        JSON.stringify({
          user_id: response.data, 
          access: access, 
          refresh: refresh 
        })
      );

      const userr = JSON.parse(localStorage.getItem("user"));

      console.log(userr.access);
      console.log(userr.user_id.is_user);

      return {
        success: true,
        message: "Login successful",
        data: {
          id,
          access,
          refresh,
        },
      };
    }

    return {
      success: false,
      message: "Incorrect email or password",
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error",
    };
  }
};

export const LoginAdmin = async (payload) => {
  try {
    const response = await axios.post('https://hiredgo.pythonanywhere.com/api/admin_login/', {
      username: payload.email,
      password: payload.password
    });

    if (response.status === 200) {
      if (!response.data.is_admin) {
        return {
          success: false,
          message: "Only admins can login with this form",
        };
      }
      const { access, refresh, is_admin } = response.data;
      console.log(response.data);
      localStorage.setItem( 
        "user", 
        JSON.stringify({
          admin_id: response.data, 
          access: access, 
          refresh: refresh 
        })
      );

      const userr = JSON.parse(localStorage.getItem("user"));

      console.log(userr.access);
      console.log(userr.admin_id.is_admin);

      return {
        success: true,
        message: "Login successful",
        data: {
          is_admin,
          access,
          refresh,
        },
      };
    }

    return {
      success: false,
      message: "Incorrect email or password",
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error",
    };
  }
};


export const LoginRecruiter = async (payload) => {
  try {
    const response = await axios.post('https://hiredgo.pythonanywhere.com/api/recruiter_login/', {
      username: payload.email,
      password: payload.password
    });

    if (response.status === 200) {
      if (!response.data.is_recruiter) {
        return {
          success: false,
          message: "Only recruiters can login with this form",
        };
      }
      const { access, refresh, is_recruiter } = response.data;
      console.log(response.data);
      localStorage.setItem( 
        "user", 
        JSON.stringify({
          recruiter_id: response.data, 
          access: access, 
          refresh: refresh 
        })
      );

      const userr = JSON.parse(localStorage.getItem("user"));

      console.log(userr.access);
      console.log(userr.recruiter_id.is_recruiter);

      return {
        success: true,
        message: "Login successful",
        data: {
          is_recruiter,
          access,
          refresh,
        },
      };
    }
    return {
      success: false,
      message: "Incorrect email or password",
    };
  } catch (error) {
        return {
          success: false,
          message: error.response.data || "Server error",
        };
}

};

export const RegisterUser = async (payload) => {
  try {
    const response = await fetch('https://hiredgo.pythonanywhere.com/api/user_signup/', {
      method: 'POST',
      body: payload
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.id) {
      return {
        success: true,
        message: 'User Registered Successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.detail || 'Registration failed',
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const RegisterRecruiter = async (payload) => {
  try {
    const response = await fetch('https://hiredgo.pythonanywhere.com/api/recruiter_signup/', {
      method: 'POST',
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.id) {
      return {
        success: true,
        message: 'User Registered Successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.detail || 'Registration failed',
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};
