import React, { useState, useEffect } from "react";
import axios from "axios";
//import the Room.js component
import Room from "../components/Room";

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

  // useEffect(async () => {
  //   try {
  //     setloading(true);
  //     const data = (await axios.get("/api/rooms/getallrooms")).data;

  //     setrooms(data);
  //     setloading(false);
  //   } catch (error) {
  //     seterror(true);
  //     console.log(error);
  //     setloading(false);
  //   }
  // }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading....</h1>
        ) : error ? (
          <h1>Error....</h1>
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// function Homescreen() {
//   const [rooms, setrooms] = useState([]);
//   const [loading, setloading] = useState();
//   const [error, seterror] = useState();

//   //async useEffect hook to fetch the rooms from the server with axios
//   //and store them in the state
//   useEffect(() => {
//     const fetchData = async () => {
//       setloading(true);
//       try {
//         const result = await (await axios.get("/api/rooms/getallrooms")).data;
//         setrooms(result.data);
//         setloading(false);
//       } catch (error) {
//         seterror(error.message);
//         setloading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   //render the rooms
//   return (
//     <div>
//       <h1>Rooms</h1>
//       <div className="row">
//         {loading ? (
//           <h1>Loading...</h1>
//         ) : error ? (
//           <h1>{error}</h1>
//         ) : (
//           rooms.map((room) => <Room room={room} key={room._id} />)
//         )}
//       </div>
//     </div>
//   );
// }

export default Homescreen;
