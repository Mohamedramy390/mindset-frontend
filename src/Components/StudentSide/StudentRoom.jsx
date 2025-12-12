import React, { useEffect, useState } from "react";
import "./StudentRoom.css";
import { useParams } from "react-router-dom";
import { getRoomById } from "../../api/apis";
import Chatbot from "./Chatbot";
import PdfViewer from "./PdfViewer";

export default function StudentRoom() {
  const { id: roomId } = useParams();
  const [roomPdfUrl, setRoomPdfUrl] = useState("");
  const [error, setError] = useState("");

  // Fetch room details to automatically load PDF
  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId) return;
      try {
        const res = await getRoomById(roomId);
        // Assuming res is the room object or contains data
        const room = res.data || res;
        if (room && room.room.documents) {
          let fileLink = room.room.documents;
          setRoomPdfUrl(fileLink);
        }
      } catch (err) {
        setError("Failed to fetch room document");
        console.error("Error fetching room details:", err);
      }
    };
    fetchRoom();
  }, [roomId]);

  return (
    <>
      <div className="room-page">
        <div className="room-container">
          {/* PDF Visual Section */}
          <PdfViewer initialPdfUrl={roomPdfUrl} error={error} />

          {/* Chatbot Section */}
          <Chatbot roomId={roomId} />
        </div>
      </div>
    </>
  );
}

// ResourceCard function is no longer needed
// function ResourceCard({ icon, title }) { ... }

