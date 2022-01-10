const { response, request } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const userGet = async (req = request,res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };
    const [ totalRows, users] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
        .limit(limit)
        .skip(from)
    ])
    res.status(500).json({
        totalRows,
        users
    });
}

const userPost = async (req = request,res = response) => {
    const { name, email, password, role} = req.body;
    const user = new User( {
        name,
        email,
        password,
        role
    });
    // Encript the password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );
    // Save in DB
    await user.save();
    res.status(201).json(user);
}

const userPut = async (req = request,res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...body } = req.body;
    if( password ) {
        const salt = bcrypt.genSaltSync();
        body.password = bcrypt.hashSync( password, salt );
    }
    const user = await User.findByIdAndUpdate(id, body);
    res.status(400).json(user);
}

const userDelete = async (req = request,res = response) => {
    const { id } = req.params;

    // Fisicamente borrarlo
    // const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id, { state: false });
    res.json({
        user
    });
}

const userPatch = (req = request,res = response) => {
    const { id } = req.params;
    res.json({
        id
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
};