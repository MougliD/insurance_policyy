import React, { useEffect, useState } from "react";
import "../component_css/UserProfile.css"; // Create this CSS file for styling
// import { useParams } from "react-router-dom"; // Assuming you use params to get the logged-in user ID

const UserProfile = ({ userId }) => {
  // const { userId } = useParams(); // Get the logged-in user ID from the URL params
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Add this line
        const loggedInUser = data.find((user) => user.id === userId);
        setUser(loggedInUser);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-image">
          <img src="/default-profile-icon.png" alt="Profile" />{" "}
          {/* Default profile image */}
        </div>
        <div className="profile-details">
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
          <p className="email">{user.email}</p>
        </div>
      </div>
      <div className="profile-stats">
        <div className="stats-container">
          <span>{`Policies Sold: ${user.policiesSold}`}</span>
          <span>|</span>
          <span>{`Credit Points: ${user.creditPoints}`}</span>
        </div>
        <div className="medal-container">
          <img
            src={`/${user.medal?.toLowerCase()}.png`} // Use optional chaining to safely access the medal property
            alt={`${user.medal} Medal`}
            className="medal-icon"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
