const Role = require('../models/role');
const User = require('../models/user');

const isRoleValidate = async (rol = '') => {
    const existRole = await Role.findOne({ rol });
    if (!existRole) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const isEmailExists = async (email = '') => {
    const existsEmail = await User.findOne({ email });
    if( existsEmail ) {
        throw new Error(`El correo ${email} ya existe en la base de datos`);
    }
}

const isExistUserById = async (id = '') => {
    const existUser = await User.findById(id);
    if( !existUser ) {
        throw new Error(`El usuario con id: ${id} no existe en la base de datos`);
    }
}

module.exports = {
    isRoleValidate,
    isEmailExists,
    isExistUserById
};
