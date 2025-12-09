import React, { useState } from "react";
import { useRooms } from "../../context/RoomsContext";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../nav/Navbar";
import "./Rooms.css";
import Loader from "../Loader/Loader";
import roomPlaceholder from "../Assets/room-placeholder.png";
import SearchBar from "../SearchBar/SearchBar";

export default function EnrolledRooms() {
  const { rooms, enrolledRooms, loading, error } = useRooms();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) return (<Loader />);

  if (error) return <p>{error}</p>;

  const myRooms = rooms.filter((r) => enrolledRooms.includes(r._id));

  const filteredRooms = myRooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (myRooms.length === 0) {
    return (
      <div className="rooms-page">
        <Navbar role="Student" />
        <main className="rooms-container">
          <h1 className="rooms-title">My Rooms</h1>

          <div className="empty-state">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
              alt="No Rooms"
              className="empty-icon"
            />
            <p className="empty-text">You are not enrolled in any rooms yet.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="rooms-page">
      <Navbar role="Student" />
      <main className="rooms-container">
        <h1 className="rooms-title">My Rooms</h1>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search my rooms..."
        />

        <div className="rooms-grid">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <div className="room-card" key={room._id}>
                <img src={roomPlaceholder} alt="Room" className="room-image" />
                <div className="room-info">
                  <h2 className="room-title">{room.name}</h2>
                  <p className="room-description">{room.topic}</p>
                  <button className="join-button" onClick={() => navigate(`/rooms/${room._id}/student`)}>
                    Open Room
                  </button>
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
}
