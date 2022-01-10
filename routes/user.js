const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userDelete, userPatch } = require('../controllers/user');
const { isRoleValidate, isEmailExists, isExistUserById } = require('../helpers/db_validators');
const { validateFields } = require('../middlewares/validate_fields');

const router = Router();

router.get('/', userGet);

router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio de ser de mas 6 letras').isLength( {min: 6}),
    // check('role','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('email','El email no es valido').isEmail(),
    check('role').custom( isRoleValidate ), 
    check('email').custom( isEmailExists ),
    validateFields
] ,userPost);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(isExistUserById),
    check('role').custom( isRoleValidate ), 
    validateFields
],userPut);

router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(isExistUserById),
    validateFields
] , userDelete);

router.patch('/', userPatch);

module.exports = router;