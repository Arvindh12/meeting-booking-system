import React, { useState, useEffect } from "react";

function Bookroom({ currentUser }) {
  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var temp = JSON.parse(JSON.stringify(data));
    temp[name] = value;
    setData(temp);
    console.log(data);
  };
  const handleSubmit = async (event) => {
    if (data.room === "") {
      setMessage(["text-danger", "Select a room"]);
      return;
    }
    if (data.slot === "") {
      setMessage(["text-danger", "Select a time slot"]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:7070/room/${data.room}`);
      const room = await res.json();
      let result = room.booking.filter(
        (e) => e.date === data.date && e.slot === data.slot
      );
      if (result.length !== 0) {
        console.log("Already booked");
        setMessage(["text-danger", "Entered Time slot is already booked"]);
        return;
      }
      room.booking.push({
        date: data.date,
        slot: data.slot,
        user: currentUser.email,
      });

      const res1 = await fetch(`http://localhost:7070/room/${data.room}`, {
        method: "PUT",
        body: JSON.stringify(room),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const returndata = await res1.json();
      setMessage(["text-success", "Room booked successfully"]);
      event.reset();

      console.log(returndata);
    } catch (err) {
      console.log(err);
      setMessage(["text-danger", "Something went wrong"]);
    }
  };

  const [data, setData] = useState({ room: "", date: "", slot: "" });

  const [roomDetails, setRoomDetails] = useState([]);

  const [message, setMessage] = useState(["", ""]);

  useEffect(() => {
    fetch("http://localhost:7070/room")
      .then((res) => res.json())
      .then((data) => {
        setRoomDetails(data);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3"> </div>
        <div className="col-md-6">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(event.target);
            }}
          >
            <div className="form-group">
              <label htmlFor="room-select">Select A room :</label>
              <select
                className="form-control"
                id="room-select"
                value={data.room}
                name="room"
                onChange={handleChange}
              >
                <option>Default select</option>
                {roomDetails.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={data.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time Slot</label>
              <select
                name="slot"
                className="form-control"
                onChange={handleChange}
                value={data.slot}
                required
              >
                <option>Default select</option>
                <option value="07:00-08:00">07.00 AM - 08.00 AM</option>
                <option value="09:00-10:00">09.00 AM - 10.00 AM</option>
                <option value="11:00-12:00">11.00 AM - 12.00 PM</option>
                <option value="13:00-14:00">01.00 PM - 02.00 PM</option>
                <option value="15:00-16:00">03.00 PM - 04.00 PM</option>
                <option value="17:00-18:00">05.00 PM - 06.00 PM</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Book
            </button>
          </form>
          <div className="mt-3 text-center">
            <p className={message[0]}>{message[1]}</p>
          </div>
        </div>
        <div className="col-md-3"> </div>
      </div>
    </div>
  );
}

export default Bookroom;
