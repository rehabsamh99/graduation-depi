import React, { useState, useContext } from "react";
import "../CSS/MyProfile.css";
import { ShopContext } from "../Components/ShopContext.jsx";
import img from "../assets/R.png";

const MyProfile = () => {
  const [image, setImage] = useState(null);
  const { user, setUser } = useContext(ShopContext);

  const uploadImage = (e) => setImage(URL.createObjectURL(e.target.files[0]));

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedUser = { ...user, [name]: value };
    setUser(updatedUser);
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <div className="profile-page">
      <aside className="profile-sidebar">
        <h4>Manage My Account</h4>
        <ul>
          <li className="active">My Profile</li>
          <li>Address Book</li>
          <li>My Payment Options</li>
        </ul>
      </aside>

      <div className="profile-content">
        <h2 className="text-danger">My Profile</h2>
        <div className="profile-box">
          <div className="profile-left">
            <div className="image-wrapper">
              <img src={image || img} alt="Profile" />
              <label className="edit-photo">
                Change
                <input type="file" onChange={uploadImage} />
              </label>
            </div>
            <h3 className="username">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : "rehab sameh"}
            </h3>
            <p className="user-email">{user?.email || ""}</p>
          </div>

          <form className="profile-form">
            <h3>Edit Your Profile</h3>
            <div className="input-grid">
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={user?.firstName || "rehab"}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={user?.lastName || "sameh"}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={user?.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={user?.address || ""}
                  placeholder="Cairo, Egypt"
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
