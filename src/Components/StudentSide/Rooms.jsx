import React from "react";
import "./Rooms.css";
import { useRooms } from "../../context/RoomsContext";
import { Navbar } from "../../nav/Navbar";
import Loader from "../Loader/Loader";
import roomPlaceholder from "../Assets/room-placeholder.png";

const Rooms = () => {
  const { rooms, enrolledRooms, handleEnroll, loading, error } = useRooms();

  if (loading) return <Loader />;


  if (error) return <p>{error}</p>;

  const notEnrolledRooms = rooms.filter((r) => !enrolledRooms.includes(r._id));

  return (
    <div className="rooms-page">
      <Navbar />
      {/* Main content */}
      <main className="rooms-container">
        <h1 className="rooms-title">Rooms</h1>
        <p className="rooms-subtitle">
          Explore available rooms and join a study session.
        </p>

        {/* Search */}
        <div className="search-bar">
          <input type="text" placeholder="Search for rooms" />
        </div>

        {/* Rooms Grid */}
        <div className="rooms-grid">
          {notEnrolledRooms.map((room) => (
            <div className="room-card" key={room._id}>
              <img src={roomPlaceholder} alt="Room" className="room-image" />
              <div className="room-info">
                <h2 className="room-title">{room.name}</h2>
                <p className="room-description">{room.topic}</p>
                <button className="join-button" onClick={() => handleEnroll(room._id)}>Join</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Rooms;
