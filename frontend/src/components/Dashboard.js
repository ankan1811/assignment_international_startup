import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard content based on user's role from your backend API
        setLoading(true);
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("token");

        let connectString;
        if (role === "user") {
          connectString = "http://localhost:4000/userdashboard";
        } else {
          connectString = "http://localhost:4000/admindashboard";
        }
        // const response = await axios.get(connectString, {
        //   headers: {
        //     Authorization: `Bearer ${token}`, // Add token from local storage
        //     role: `${role}`,
        //   },
        // });

        const response = await fetch(connectString, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token from local storage
            role: `${role}`,
          },
        });
        const data = await response.json();
        setContent(data.content);
      } catch (error) {
        console.error("Failed to fetch dashboard content:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Dashboard</h2>
      <p>{content}</p>
    </div>
  );
};

export default Dashboard;
