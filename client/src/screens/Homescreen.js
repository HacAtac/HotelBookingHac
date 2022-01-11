import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.css";
//import the Room.js component
import Room from "../components/Room";
//import the booking.js model

import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  //Going to use state for duplicate rooms so that we can remove them from the list if they are already booked
  const [duplicaterooms, setduplicaterooms] = useState([]);

  const [searchkey, setsearchkey] = useState("");
  const [type, settype] = useState("all");

  // async useEffect hook to fetch the rooms from the server with axios
  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const result = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(result);
        setduplicaterooms(result);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function filterByDate(dates) {
    // console.log(moment(dates[0]).format("DD-MM-YYYY"));
    // console.log(moment(dates[1]).format("DD-MM-YYYY"));
    setfromdate(moment(dates[0]).format("DD-MM-YYYY"));
    settodate(moment(dates[1]).format("DD-MM-YYYY"));

    let temprooms = [];
    let availability = false;
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability === true || room.currentbookings.length === 0) {
        temprooms.push(room);
      }
      setrooms(temprooms);
    }
  }
  function filterBySearch() {
    const temprooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );

    setrooms(temprooms);
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search Rooms"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select className="form-control">
            <option value="all">All</option>
            <option value="deluxe">Deluxe</option>
            <option value="non-delux">Standard</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
