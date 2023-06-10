import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData, updateUserHomepage } from '../../../apis/user_profile';
import { ShowLoading, HideLoading } from "../../../redux/alertSlice";

function UserHomepage() {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({});
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(ShowLoading());
    getData()
      .then(response => {
        if (response) {
          setUserData(response.data);
          setPhone(response.data.phone);
          setGender(response.data.gender);
          setType(response.data.type);
        }
      })
      .finally(() => dispatch(HideLoading()));
  }, [dispatch]);

  const handleUpdateHomepage = () => {
    dispatch(ShowLoading());

    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('gender', gender);
    formData.append('type', type);
    if (image) {
      formData.append('image', image);
    }

    updateUserHomepage(formData)
      .then(response => {
        if (response.success) {
          // Handle successful update
        }
      })
      .finally(() => dispatch(HideLoading()));
  };


  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {userData.username}</p>
      <p>First Name: {userData.first_name}</p>
      <p>Last Name: {userData.last_name}</p>
      <div>
        <label>Phone:</label>
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
      </div>
      <div>
        <label>Gender:</label>
        <input type="text" value={gender} onChange={e => setGender(e.target.value)} />
      </div>
      <div>
        <label>Type:</label>
        <input type="text" value={type} onChange={e => setType(e.target.value)} />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" onChange={e => setImage(e.target.files[0])} />
      </div>
      <button onClick={handleUpdateHomepage}>Update</button>
    </div>
  );
}

export default UserHomepage;
