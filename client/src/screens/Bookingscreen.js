import React, { useState, useEffect } from "react";
import axios from "axios";

function Bookingscreen({ match }) {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const result = (await axios.post("/api/rooms/getroombyid", {roomid: match.params.roomid})).data;
        setroom(result);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [match.params.roomid]);


  return (
    <div className="m-5">
          {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error...</h1>) : (<div>

            <div className="row justify-content-center mt-5 bs">
              <div className="col-md-6">
                <h1>{room.name}</h1>
                <img src={room.imageurls[0]} alt="room" className="bigimg"/>
              </div>

              <div className='col-md-6' style={{textAlign:"right"}}>
                <h1>Booking Details :</h1>
                <hr />
                <b>
                <p>Name :</p>
                <p>From Date :</p>
                <p>To Date :</p>
                <p>Mac Count : {room.maxcount}</p></b>
              </div>

              <div style={{textAlign:"right"}}>
                <h1>Amount :</h1>
                <hr />
                <b><p>Total Days :</p>
                <p>Rent Per Day : {room.rentperday}</p>
                <p>Total Amount :</p> </b>
                </div>
                <div style={{float:'right'}}>
                  <button className="btn btn-primary">Pay Now</button>
                </div>
            </div>




          </div>)}
    </div>
  );
}

export default Bookingscreen;