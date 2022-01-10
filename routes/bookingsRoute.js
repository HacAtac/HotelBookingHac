const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51KGGcjDQw3iOHoMjf3YITBwKINTnXK3bur0cgCPuh60dD993ZmOU4Tqoy33u52gPG3usHBJpeZnvJBHuQtUxRK5O00WkMZpfof"
);
const { v4: uuidv4 } = require("uuid");
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room");
// const { default: Room } = require("../client/src/components/Room");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "USD",
        receipt_email: token.email,
      },
      {
        idepotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newbooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        fromdate: moment(fromdate).format("DD-MM-YYYY"),
        todate: moment(todate).format("DD-MM-YYYY"),
        totalamount,
        totaldays,
        transactionId: "1234",
      });

      const booking = await newbooking.save();

      const roomtemp = await Room.findOne({ _id: room._id });

      roomtemp.currentbookings.push({
        bookingid: booking._id,
        fromdate: moment(fromdate).format("DD-MM-YYYY"),
        todate: moment(todate).format("DD-MM-YYYY"),
        userid: userid,
        status: booking.status,
      });

      await roomtemp.save();
    }

    res.send("Payment Successful");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
