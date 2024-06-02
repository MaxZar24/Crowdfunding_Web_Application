const Donation = require('../models/Donation');
const axios = require('axios');
const User = require('../models/User');

exports.postDonation = async (req, res) => {
    const {donationTitle, category, description, donationUrl, owner} = req.body;

    try {
        const newDonation = new Donation({donationTitle, category, description, donationUrl, owner});
        await newDonation.save();

        res.status(201).json({message: 'Збір створено успішно', donation: newDonation});
    } catch (error) {
        console.error('Помилка при створенні збору:', error);
        res.status(500).json({message: 'Виникла помилка при створенні збору'});
    }
};

exports.getUserDonations = async (req, res) => {
    const {email} = req.query;

    try {
        const donations = await Donation.find({owner: email});
        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching user donations:', error);
        res.status(500).json({message: 'Error fetching user donations'});
    }
};

exports.getFund = async (req, res) => {
    const {id} = req.params;

    try {
        const donation = await Donation.findById(id);
        if (!donation) {
            return res.status(404).json({message: 'Збір не знайдено'});
        }

        res.status(200).json(donation);
    } catch (error) {
        console.error('Error fetching donation details:', error);
        res.status(500).json({message: 'Виникла помилка при отриманні деталей збору'});
    }
};

exports.getCostDetails = async (req, res) => {
    const {clientId, Pc} = req.body;

    try {
        const response = await axios.post('https://send.monobank.ua/api/handler', {
            c: 'hello',
            clientId: clientId,
            Pc: Pc,
        });

        const {jarGoal, jarAmount} = response.data;

        res.status(200).json({jarGoal, jarAmount});
    } catch (error) {
        console.error('Error fetching fund details:', error);
        res.status(500).json({message: 'Error fetching fund details'});
    }
};

exports.getDonationsWithCostDetails = async (req, res) => {
    try {
        const donations = await Donation.find();

        const donationPromises = donations.map(async (donation) => {
            try {
                const clientId = donation.donationUrl.split('/').pop();

                const response = await axios.post('https://send.monobank.ua/api/handler', {
                    c: 'hello',
                    clientId: clientId,
                    Pc: "BBXHINsKar3hFQFbphcyCkpq+qDMPJ5NNgOISwwGKOX2gM+Usx2Pjo5dNKgHdar8L/mjMPE9bvSBqePlHEeVdBc=",
                });

                const {jarGoal, jarAmount} = response.data;

                const author = await User.findOne({email: donation.owner});

                return {
                    ...donation._doc,
                    jarGoal,
                    jarAmount,
                    authorName: author ? `${author.firstName} ${author.lastName}` : 'Unknown Author',
                };
            } catch (error) {
                console.error(`Error fetching cost details for donation ${donation._id}:`, error);
                return {
                    ...donation._doc,
                    jarGoal: 'N/A',
                    jarAmount: 'N/A',
                    authorName: 'Unknown Author',
                };
            }
        });

        const donationsWithDetails = await Promise.all(donationPromises);

        res.status(200).json(donationsWithDetails);
    } catch (error) {
        console.error('Error fetching donations with cost details:', error);
        res.status(500).json({message: 'Error fetching donations with cost details'});
    }
};

exports.deleteDonation = async (req, res) => {
    const {id} = req.params;

    try {
        const donation = await Donation.findByIdAndDelete(id);

        if (!donation) {
            return res.status(404).json({message: 'Збір не знайдено'});
        }

        res.status(200).json({message: 'Збір успішно видалено'});
    } catch (error) {
        console.error('Error deleting donation:', error);
        res.status(500).json({message: 'Виникла помилка при видаленні збору'});
    }
};