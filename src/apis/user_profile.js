import axios from 'axios';

export const getData = async () => {
  const userr = JSON.parse(localStorage.getItem("user"));
  try {
    const response = await axios.get('http://localhost:8000/api/user_homepage/', {
      headers: {
        Authorization: `Bearer ${userr.access}`, // Pass the access token in the headers
      },
    });
    return response;
  } catch (error) {
      console.log(error);
    }
  };

export const updateUserHomepage = async (formData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/user_homepage/', formData);
    return {
      success: true,
      message: 'User homepage updated successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message || 'Failed to update user homepage.',
    };
  }
};
