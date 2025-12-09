import React, { useState } from "react";
import "./Rooms.css";
import { useRooms } from "../../context/RoomsContext";
import { Navbar } from "../../nav/Navbar";
import Loader from "../Loader/Loader";
import roomPlaceholder from "../Assets/room-placeholder.png";
import SearchBar from "../SearchBar/SearchBar";

const Rooms = () => {
  const { rooms, enrolledRooms, handleEnroll, loading, error } = useRooms();
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) return <Loader />;


  if (error) return <p>{error}</p>;

  const notEnrolledRooms = rooms.filter((r) => !enrolledRooms.includes(r._id));

  const filteredRooms = notEnrolledRooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rooms-page">
      <Navbar role="Student" />
      {/* Main content */}
      <main className="rooms-container">
        <h1 className="rooms-title">Rooms</h1>
        <p className="rooms-subtitle">
          Explore available rooms and join a study session.
        </p>

        {/* Search */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search for rooms"
        />

        {/* Rooms Grid */}
        <div className="rooms-grid">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <div className="room-card" key={room._id}>
                <img src={roomPlaceholder} alt="Room" className="room-image" />
                <div className="room-info">
                  <h2 className="room-title">{room.name}</h2>
                  <p className="room-description">{room.topic}</p>
                  <button className="join-button" onClick={() => handleEnroll(room._id)}>Join</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No rooms found matching "{searchQuery}"</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Rooms;
