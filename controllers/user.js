const { response, request } = require('express');

const userGet = (req = request,res = response) => {
    const {q,nombre = 'No Name',apikey,page = 1, limit} = req.query;
    res.status(500).json({
        msg: 'get API - Controller',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const userPost = (req = request,res = response) => {
    const { nombre, edad } = req.body;
    res.status(201).json({
        msg: 'post API - Controller',
        nombre,
        edad
    });
}

const userPut = (req = request,res = response) => {
    const id = req.params.id;
    res.status(400).json({
        msg: 'put API - Controller',
        id
    });
}

const userDelete = (req = request,res = response) => {
    res.json({
        msg: 'delete API - Controller'
    });
}

const userPatch = (req = request,res = response) => {
    res.json({
        msg: 'patch API - Controller'
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
};