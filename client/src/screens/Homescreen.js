import React, { useState, useEffect } from "react";
import axios from "axios";
//import the Room.js component
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();

  // async useEffect hook to fetch the rooms from the server with axios
  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const result = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(result);
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
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : rooms.length>1 ? (
          rooms.map((room) => {
            return <div className="col-md-9 mt-2">
              <Room room={room} />
            </div>;
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
 );
}

export default Homescreen;
