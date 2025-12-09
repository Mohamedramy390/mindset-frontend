import React, { useEffect, useState } from "react";
import "./TeacherDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { getUserRooms } from "../../api/apis";
import Loader from "../Loader/Loader";
import roomPlaceholder from "../Assets/room-placeholder.png";
import { Navbar } from "../../nav/Navbar";
import SearchBar from "../SearchBar/SearchBar";


function TeacherDashboard() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

  const fetchRooms = async () => {
    try {
      setLoading(true)
      const roomsData = await getUserRooms()
      console.log(roomsData)
      setRooms(roomsData);
    } catch (err) {
      console.error("Failed to load rooms", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchRooms();
    };
    fetchData();
  }, []);

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );


  if (loading) return <Loader />;

  if (!loading && rooms.length === 0) {
    return (
      <div className="teacher-dashboard">
        <Navbar role="Teacher" />
        <div className="teacher-content">
          <div className="teacher-header">
            <h3>My Rooms</h3>
            <button
              onClick={() => navigate("/createRoom")}
              className="teacher-create-btn"
            >
              + Create New Room
            </button>
          </div>

          <div className="empty-state">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              className="empty-icon"
              alt="No rooms"
            />
            <p className="empty-text">You haven't created any rooms yet.</p>
            <button
              onClick={() => navigate("/createRoom")}
              className="empty-create-btn"
            >
              Create First Room
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="teacher-dashboard">
      {/* Sticky Navbar */}
      <Navbar role="Teacher" />

      {/* Content */}
      <div className="teacher-content">
        <div className="teacher-header">
          <h3>My Rooms</h3>
          <button onClick={() => navigate('/createRoom')} className="teacher-create-btn">+ Create New Room</button>
        </div>

        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search my rooms..."
        />

        <div className="teacher-rooms">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room, index) => (
              <div className="teacher-room-card" key={index}>
                <img src={roomPlaceholder} alt="Room" className="teacher-room-image" />
                <div className="teacher-room-info">
                  <h4>{room.name}</h4>
                  <p className="teacher-code">{room.topic}</p>
                  <button onClick={() => navigate(`/rooms/${room._id}/teacher`)} className="teacher-analytics-btn">View Analytics</button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: '#555', fontSize: '1.1rem' }}>No rooms found matching "{searchQuery}"</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
