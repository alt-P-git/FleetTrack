
const express = require('express');
const generator = require('generate-password');
const Vehicle = require('../models/vehicle');
const checkAuthentication = require('../middleware/checkAuthentication');
const router = express.Router();

router.post('/addVehicle', checkAuthentication, async (req, res) => {
    const data = req.body;
    const password = generator.generateMultiple(3, {
        length: 10,
        uppercase: true,
        numbers: true,
        lowercase: true
    });

    const vehicle = new Vehicle({
        userID: req.user.googleId,
        vehicleID: data.vehicleID,
        max_load: data.max_load,
        info: data.info,
        password: password[0],
        last_location: data.last_location,
        last_location_date_time: new Date().getTime(),
    });

    try {
        await vehicle.save();
        console.log("savedVehicleData");
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.post('/updateVehicle', checkAuthentication, async (req, res) => {
    const data = req.body;

    try {
        const vehicle = await Vehicle.findOneAndUpdate(
            { userID: req.user.googleId, _id: data._id },
            { vehicleID: data.vehicleID, max_load: data.max_load, info: data.info },
            { new: true }
        );

        if (!vehicle) return res.status(404).send('Vehicle not found');
        console.log('Saved!');
        res.send(vehicle);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.post('/deleteVehicle', checkAuthentication, async (req, res) => {
    const data = req.body;

    try {
        await Vehicle.deleteOne({ userID: req.user.googleId, _id: data.vehicleId });
        console.log("Deleted Vehicle Data");
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/vehicleData', checkAuthentication, async (req, res) => {
    console.log("Vehicles requested");

    try {
        const vehicles = await Vehicle.find({ userID: req.user.googleId });
        res.send(vehicles);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('server error');
    }
});

router.post('/updateVehicleLocation', async (req, res) => {
    const data = req.body;
    console.log("Updating vehicle location");

    try {
        const vehiclePing = await VehiclePing.findOne({
            vehicleID: data.vehicleID,
            password: data.password,
        });

        if (!vehiclePing) {
            console.log("Vehicle ping not found");
            return res.status(404).send('Vehicle ping not found');
        }

        const currentTime = new Date().getTime();
        const lastPingTime = vehiclePing.last_ping_date_time;
        const timeDifference = currentTime - lastPingTime;

        if (timeDifference > 20000) {
            console.log("Ping is older than 20 seconds. Location update not allowed.");
            return res.status(400).send('Ping is older than 20 seconds. Location update not allowed.');
        }

        const vehicle = await Vehicle.findOneAndUpdate(
            { userID: data.userID, vehicleID: data.vehicleID, password: data.password },
            { last_location: data.location, last_location_date_time: currentTime },
            { new: true }
        );

        if (!vehicle) {
            console.log("Vehicle not found");
            return res.status(404).send('Vehicle not found');
        }

        console.log("Vehicle location updated successfully");
        res.send(vehicle);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;