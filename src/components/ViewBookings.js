import React, { useState, useEffect } from "react";

function ViewBookings({ currentUser }) {
  const [roomDetails, setRoomDetails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7070/room")
      .then((res) => res.json())
      .then((data) => {
        let result = [];
        data.forEach((room) =>
          room.booking.forEach((roombooking) => {
            if (roombooking.user === currentUser.email)
              result.push({ ...roombooking, name: room.name });
          })
        );
        setRoomDetails(result);
        console.log(result);
      });
  }, []);

  return (
    <div className = "mt-3">
      
      {roomDetails.length === 0 ? (
        <div className="text-center" >U have no bookings</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Room</th>
              <th scope="col">Date</th>
              <th scope="col">Timings</th>
            </tr>
          </thead>
          <tbody>
            {roomDetails.map((e, i) => (
              <tr>
                <th scope="row">{i}</th>
                <td>{e.name}</td>
                <td>{e.date}</td>
                <td>{e.slot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewBookings;
