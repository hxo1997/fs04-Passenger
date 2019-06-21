const {
    User
} = require("../../models/users");
const {
    Trip
} = require("../../models/trip");
const createTrip = (req, res, next) => {

    const {
        locationFrom,
        locationTo,
        startTime,
        availableSeats,
        fee
    } = req.body;
    const driverID = req.user.id;
    User
        .findById(driverID)
        .then(driver => {
            if (!driver) return Promise.reject({
                errors: "Does not have any trips"
            })
            const trip = {
                ...req.body,
                driverID
            }
            console.log(trip);
            const newTrip = new Trip(trip)
            return newTrip.save();
        })
        .then(trip => res.status(200).json(trip))
        .catch(err => res.status(400).json(err));

}
// const bookTrip = async (req,res,next) => {
//     const {tripID} = req.params;
//     const {numberOfBookingSeats} = req.body;
//     const passengerID = req.user.id;
//     console.log(req.user);
//     const passenger = await User.findById(passengerID);
//     const trip = await Trip.findById(tripID);
//     console.log(passenger)
//     console.log(trip)
//     if(!passenger) return res.status(404).json({errors: "Passenger Not found"})
//     if(!trip) return res.status(404).json({errors: "Trip Not found"})
//     if(numberOfBookingSeats > trip.availableSeats) return res.status(400).json({errors:"Your booking is over limitation"});

//     trip.availableSeats = trip.availableSeats - numberOfBookingSeats;

//     trip.passengerIds.push(passengerID);

//     const savedTrip = await trip.save();
//     res.status(200).json(savedTrip);
// }

const bookTrip = (req, res, next) => {
    const {
        tripID
    } = req.params;
    const {
        numberOfBookingSeats
    } = req.body;
    const passengerID = req.user.id;
    console.log(req.user);

    Promise.all([
            User.findById(passengerID),
            Trip.findById(tripID)
        ])
        .then(results => {
            const passenger = results[0];
            const trip = results[1];

            if (!passenger) return Promise.reject({
                errors: "Passenger Not found"
            })
            if (!trip) return Promise.reject({
                errors: "Trip Not found"
            })
            if (numberOfBookingSeats > trip.availableSeats) return Promise.reject({
                errors: "Your booking is over limitation"
            });

            trip.availableSeats = trip.availableSeats - numberOfBookingSeats;

            trip.passengerIds.push(passengerID);
            return trip.save();
        })
        .then(trip =>{
            res.status(200).json(trip);
        })
        .catch(err => res.status(400).json(err));
}

module.exports = {
    createTrip,
    bookTrip
}