const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
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
};

exports.login = async (req, res) => {
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
};

exports.getUser = async (req, res) => {
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
};

exports.updateUser = async (req, res) => {
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
};

exports.uploadPhoto = async (req, res) => {
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
};

exports.getAuthor = async (req, res) => {
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
};