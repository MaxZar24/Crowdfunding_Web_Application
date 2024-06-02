const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

router.post('/post-donation', donationController.postDonation);
router.get('/user-donations', donationController.getUserDonations);
router.get('/fund/:id', donationController.getFund);
router.post('/get-cost-details', donationController.getCostDetails);
router.get('/donations-with-cost-details', donationController.getDonationsWithCostDetails);
router.delete('/donation/:id', donationController.deleteDonation);

module.exports = router;
