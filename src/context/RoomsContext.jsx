import { createContext, useContext, useEffect, useState } from "react";
import { getAllRooms, getUserRooms, enrollRoom } from "../api/apis";
import { useAuth } from "./AuthContext";

const RoomsContext = createContext();
export const useRooms = () => useContext(RoomsContext);

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [enrolledRooms, setEnrolledRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const [error, setError] = useState("");

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const [roomsData, userData] = await Promise.all([
        getAllRooms(),
        getUserRooms(),
      ]);
      setRooms(roomsData.data.rooms);
      setEnrolledRooms(userData.map((r) => r._id));
      setError("");
    } catch (err) {
      console.error("Failed to load rooms", err);
      setError("Failed to load rooms.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return; 
    if (!user) {
        setRooms([]);
        setEnrolledRooms([]);
        return; 
    }
    fetchRooms();

  }, [user]);

  // When the user joins a room
  const handleEnroll = async (roomId) => {
    try {
      await enrollRoom(roomId);
      setEnrolledRooms((prev) => [...prev, roomId]);
      alert("Enrolled successfully, Navigate to my rooms to join");
    } catch (err) {
      console.error("Enroll failed", err);
    }
  };

  const value = {
    rooms,
    enrolledRooms,
    loading,
    error,
    handleEnroll,
    refreshRooms: fetchRooms,
  };

  return <RoomsContext.Provider value={value}>{children}</RoomsContext.Provider>;
};
