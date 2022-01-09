import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
function Bookingscreen({ match }) {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();

  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, "DD-MM-YYYY");
  const todate = moment(match.params.todate, "DD-MM-YYYY");
  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const result = (
          await axios.post("/api/rooms/getroombyid", {
            roomid: match.params.roomid,
          })
        ).data;
        setroom(result);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} alt="room" className="bigimg" />
            </div>

            <div className="col-md-6" style={{ textAlign: "right" }}>
              <h1>Booking Details :</h1>
              <hr />
              <b>
                <p>Name :</p>
                <p>From Date : {match.params.fromdate}</p>
                <p>To Date : {match.params.todate}</p>
                <p>Mac Count : {room.maxcount}</p>
              </b>
            </div>

            <div style={{ textAlign: "right" }}>
              <h1>Amount :</h1>
              <hr />
              <b>
                <p>Total Days : {totaldays}</p>
                <p>Rent Per Day : {room.rentperday}</p>
                <p>Total Amount :</p>{" "}
              </b>
            </div>
            <div style={{ float: "right" }}>
              <button className="btn btn-primary">Pay Now</button>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
