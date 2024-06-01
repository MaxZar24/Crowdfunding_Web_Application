const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const bcrypt = require('bcrypt');
require('dotenv').config();


const app = express();
const port = process.env.PORT;
const url = process.env.MONGODB_URL;

mongoose.connect(url).then(() => {
    console.log('Connected to DB');
}).catch((error) => {
    console.error('Connection error', error);
});

app.use(cors());
app.use(bodyParser.json({limit: '1mb'}));


const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: ''},
    socialMedia: {type: [String], default: []},
});

const donationSchema = new mongoose.Schema({
    donationTitle: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    donationUrl: {type: String, required: true},
    owner: {type: String, default: ''},
    createdAt: {type: Date, default: Date.now, required: true}
})

const User = mongoose.model('User', userSchema);
const Donation = mongoose.model('Donation', donationSchema);

app.post('/api/register', async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'Користувач з таким email вже існує'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({firstName, lastName, email, password: hashedPassword});
        await newUser.save();

        res.status(201).json({message: 'Користувача зареєстровано успішно'});
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({message: 'Виникла помилка при реєстрації'});
    }
});

app.post('/api/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Неправильний email або пароль'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: 'Неправильний email або пароль'});
        }

        res.status(200).json({
            message: 'Успішний логін',
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({message: 'Виникла помилка при логіні'});
    }
});

app.get('/api/user', async (req, res) => {
    const {email} = req.query;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'Користувача не знайдено'});
        }

        res.status(200).json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            socialMedia: user.socialMedia
        });
    } catch (error) {
        console.error('Помилка при отриманні даних користувача:', error);
        res.status(500).json({message: 'Виникла помилка при отриманні даних користувача'});
    }
});

app.put('/api/user', async (req, res) => {
    const {email, firstName, lastName, socialLinks, avatar} = req.body;

    try {
        const user = await User.findOneAndUpdate(
            {email},
            {firstName, lastName, socialMedia: socialLinks, avatar},
            {new: true}
        );

        if (!user) {
            return res.status(404).json({message: 'Користувача не знайдено'});
        }

        res.status(200).json({
            message: 'Профіль успішно оновлено',
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                socialMedia: user.socialMedia,
            }
        });
    } catch (error) {
        console.error('Помилка при оновленні профілю:', error);
        res.status(500).json({message: 'Виникла помилка при оновленні профілю'});
    }
});

app.put('/api/upload-photo', async (req, res) => {
    const {email, avatar} = req.body;
    try {
        const user = await User.findOneAndUpdate(
            {email},
            {avatar},
            {new: true}
        );
        if (!user) {
            return res.status(404).json({message: 'Користувача не знайдено'});
        }

        res.status(200).json({message: 'Аватар успішно оновлено'});
    } catch (error) {
        console.error('Помилка при оновленні аватару:', error);
        res.status(500).json({message: 'Виникла помилка при оновленні аватару'});
    }
});

app.post('/api/post-donation', async (req, res) => {
    const {donationTitle, category, description, donationUrl, owner} = req.body;

    try {
        const newDonation = new Donation({donationTitle, category, description, donationUrl, owner});
        await newDonation.save();

        res.status(201).json({message: 'Збір створено успішно', donation: newDonation});
    } catch (error) {
        console.error('Помилка при створенні збору:', error);
        res.status(500).json({message: 'Виникла помилка при створенні збору'});
    }
});

app.get('/api/user-donations', async (req, res) => {
    const {email} = req.query;

    try {
        const donations = await Donation.find({owner: email});
        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching user donations:', error);
        res.status(500).json({message: 'Error fetching user donations'});
    }
});

app.get('/api/fund/:id', async (req, res) => {
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
});

app.post('/api/get-cost-details', async (req, res) => {
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
});

app.get('/api/author', async (req, res) => {
    const {email} = req.query;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'Користувача не знайдено'});
        }

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
        });
    } catch (error) {
        console.error('Помилка при отриманні даних користувача:', error);
        res.status(500).json({message: 'Виникла помилка при отриманні даних користувача'});
    }
});

app.get('/api/donations-with-cost-details', async (req, res) => {
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
});

app.delete('/api/donation/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const donation = await Donation.findByIdAndDelete(id);

        if (!donation) {
            return res.status(404).json({message: 'Збір не знайдено'});
        }

        res.status(200).json({message: 'Збір успішно видалено'});
    } catch (error) {
        console.error('Помилка при видаленні збору:', error);
        res.status(500).json({message: 'Виникла помилка при видаленні збору'});
    }
});

app.listen(port, () => {
    console.log(`Сервер запущено на порті ${port}`);
});