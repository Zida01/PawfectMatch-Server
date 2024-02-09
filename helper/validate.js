const joi = require('joi');

// const validator = (schema) => (payload) => {
//     schema.validator(payload, { abortEarly: false })
// }

const signupValidate = joi.object({
    email: joi.string().email().required().messages({
        'string.base': 'Email should be a string',
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
    }),
    password: joi.string().min(6).label('Password').required().messages({
        'string.base': 'Password should be a string',
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password should have at least {#limit} characters',
        'any.required': 'Password is required',
    }),
    password2: joi.string().valid(joi.ref('password')).required().label('Confirm Password').messages({
        'any.only': 'password must  match',
        'string.base': '{{#label}} must be a string',
        'string.empty': '{{#label}} is required',
        'any.required': '{{#label}} is required',
    }),
    userType: joi.string().required().messages({
        'string.base': 'usertype should be a string',
        'string.empty': 'usertype cannot be an empty field',
        'any.required': 'usertype is required',
    }),

})
const loginValidate = joi.object({
    email: joi.string().email().required().messages({
        'string.base': 'Email should be a string',
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
    }),
    password: joi.string().required().messages({
        'string.base': 'Password should be a string',
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password should have at least {#limit} characters',
        'any.required': 'Password is required',
    }),


})

const dogvalidate = joi.object({
    name: joi.string().email().required().messages({
        'string.base': 'Email should be a string',
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
    }),
    location: joi.string().required().messages({
        'string.base': 'Password should be a string',
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password should have at least {#limit} characters',
        'any.required': 'Password is required',
    }),
    breed: joi.string().required().messages({
        'string.base': 'Password should be a string',
        'string.empty': 'Password cannot be an empty field',
        'any.required': 'Password is required',
    }),
    description: joi.string().required().messages({
        'string.base': 'Description should be a string',
        'string.empty': 'Description cannot be an empty field',
        'any.required': 'Password is required',
    }),

})

const associationValidate = joi.object({
    associationName: joi.string().required().messages({
        'string.base': 'Association Name should be a string',
        'string.empty': 'Association Name cannot be an empty field',
        'any.required': 'Association Name is required',
    }),
    country: joi.string().required().messages({
        'string.base': 'Country should be a string',
        'string.empty': 'Country cannot be an empty field',
        'any.required': 'Country is required',
    }),
    state: joi.string().required().messages({
        'string.base': 'State should be a string',
        'string.empty': 'State cannot be an empty field',
        'any.required': 'State is required',
    }),
    city: joi.string().optional().messages({
        'string.base': 'City should be a string',
        'string.empty': 'City cannot be an empty field',
    }),
    contactEmail: joi.string().email().required().messages({
        'string.base': 'Contact Email should be a string',
        'string.empty': 'Contact Email cannot be an empty field',
        'string.email': 'Invalid email format for Contact Email',
        'any.required': 'Contact Email is required',
    }),
    contactPhone: joi.string().pattern(/^\d{10}$/).required().messages({
        'string.base': ' contactPhone should be a phone Number',
        'string.empty': ' contactPhone  cannot be an empty field',
        'string.min': ' contactPhoned should have at least {#limit} characters',
        'any.required': 'contactPhone is required',
    }),
    description: joi.string().required().messages({
        'string.base': 'Description should be a string',
        'string.empty': 'Description cannot be an empty field',
        'any.required': 'Description is required',
    }),
    checkBox: joi.string().optional(),
});



const regularValidate = joi.object({
    nameFirst: joi.string().optional().messages({
        'string.base': 'First Name should be a string',
        // 'string.empty': 'First Name cannot be an empty field',
        // 'any.required': 'First Name is required',
    }),
    nameLast: joi.string().optional().messages({
        'string.base': 'Last Name should be a string',
        // 'string.empty': 'Last Name cannot be an empty field',
        // 'any.required': 'Last Name is required',
    }),
    contactEmail: joi.string().email({
        minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] }
    }).required().messages({
        'string.base': 'Email should be a string',
        // 'string.empty': 'Email cannot be an empty field',
        // 'string.email': 'Invalid email format',
        // 'any.required': 'Email is required',
    }),
    contactPhone: joi.string().optional().messages({
        'string.base': 'Contact Phone should be a string',
        // 'string.empty': 'Contact Phone cannot be an empty field',
        // 'any.required': 'Contact Phone is required',
    }),

    country: joi.string().optional().messages({
        'string.base': 'Country should be a string',
        // 'string.empty': 'Country cannot be an empty field',
        // 'any.required': 'Country is required',
    }),
    state: joi.string().optional().messages({
        'string.base': 'State should be a string',
        // 'string.empty': 'State cannot be an empty field',
        // 'any.required': 'State is required',
    }),
    city: joi.string().optional().messages({
        'string.base': 'City should be a string',
        'string.empty': 'City cannot be an empty field',
    }),
    description: joi.string().required().messages({
        'string.base': 'Description should be a string',
        // 'string.empty': 'Description cannot be an empty field',
        // 'any.required': 'Description is required',
    }),
});












// const regularValidate = joi.object({
//     // associationName: joi.string().required().messages({
//     //     'string.base': 'Email should be a string',
//     //     'string.empty': 'Email cannot be an empty field',
//     //     'string.email': 'Invalid email format',
//     //     'any.required': 'Email is required',
//     // }),
//     nameFirst: joi.string().optional().messages({
//         'string.base': 'Password should be a string',
//         'string.empty': 'Password cannot be an empty field',
//         'string.min': 'Password should have at least {#limit} characters',
//         'any.required': 'Password is required',
//     }),
//     nameLast: joi.string().required().messages({
//         'string.base': 'Password should be a string',
//         'string.empty': 'Password cannot be an empty field',
//         'string.min': 'Password should have at least {#limit} characters',
//         'any.required': 'Password is required',
//     }),
//     contactPhone: joi.string().required().messages({
//         'string.base': 'Password should be a string',
//         'string.empty': 'Password cannot be an empty field',
//         'string.min': 'Password should have at least {#limit} characters',
//         'any.required': 'Password is required',
//     }),
//     contactEmail: joi.string().required().messages({
//         'string.base': 'Password should be a string',
//         'string.empty': 'Password cannot be an empty field',
//         'string.min': 'Password should have at least {#limit} characters',
//         'any.required': 'Password is required',
//     }),
//     country: joi.string().required().messages({
//         'string.base': 'Password should be a string',
//         'string.empty': 'Password cannot be an empty field',
//         'string.min': 'Password should have at least {#limit} characters',
//         'any.required': 'Password is required',
//     }),
//     state: joi.string().required().messages({
//         'string.base': 'Password should be a string',
//         'string.empty': 'Password cannot be an empty field',
//         'string.min': 'Password should have at least {#limit} characters',
//         'any.required': 'Password is required',
//     }),
//     city: joi.string().optional().messages({
//         'string.base': 'Password should be a string',
//         'string.empty': 'Password cannot be an empty field',
//         'string.min': 'Password should have at least {#limit} characters',
//         'any.required': 'Password is required',
//     }),
//     description: joi.string().required().messages({
//         'string.base': 'Description should be a string',
//         'string.empty': 'Description cannot be an empty field',
//         'any.required': 'Password is required',
//     }),

// })


// const associationValidate = joi.object({
//     associationName: joi.string().required().messages({
//         'string.base': 'associationName should be a string',
//         'string.empty': 'nameFirst cannot be an empty field',
//         'string.min': 'nameFirst should have at least {#limit} characters',
//         'any.required': 'nameFirst is required',
//     }),
//     nameFirst: joi.string().required().messages({
//         'string.base': 'nameFirst should be a string',
//         'string.empty': 'nameFirst cannot be an empty field',
//         'string.min': 'nameFirst should have at least {#limit} characters',
//         'any.required': 'nameFirst is required',
//     }),
//     nameLast: joi.string().min(6).required().messages({
//         'string.base': 'nameLast should be a string',
//         'string.empty': 'nameLast cannot be an empty field',
//         'string.min': 'nameLast should have at least {#limit} characters',
//         'any.required': 'nameLast is required',
//     }),
//     contactPhone: joi.string().pattern(/^\d{10}$/).required().messages({
//         'string.base': ' contactPhone should be a phone Number',
//         'string.empty': ' contactPhone  cannot be an empty field',
//         'string.min': ' contactPhoned should have at least {#limit} characters',
//         'any.required': 'contactPhone is required',
//     }),
//     contactEmail: joi.string().email({
//         minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] }
//     }).required().messages({
//         'string.base': 'Email should be a string',
//         'string.empty': 'Email cannot be an empty field',
//         'string.email': 'Invalid email format',
//         'any.required': 'Email is required',
//     }),
//     country: joi.string().required().messages({
//         'string.base': 'country should be a string',
//         'string.empty': 'country cannot be an empty field',
//         'string.min': 'country should have at least {#limit} characters',
//         'any.required': 'country is required',
//     }),
//     state: joi.string().required().messages({
//         'string.base': 'state should be a string',
//         // 'string.empty': 'state cannot be an empty field',
//         // 'string.min': 'state should have at least {#limit} characters',
//         // 'any.required': 'state is required',
//     }),
//     city: joi.string().required().messages({
//         'string.base': 'city should be a string',
//         // 'string.empty': 'city cannot be an empty field',
//         // 'string.min': 'city should have at least {#limit} characters',
//         // 'any.required': 'city is required',
//     }),
//     description: joi.string().min(200).required().messages({
//         'string.base': 'Description should be a string',
//         'string.empty': 'Description cannot be an empty field',
//         'string.min': 'city should have at least {#limit} characters',
//         'any.required': 'description is required',
//     }),
//     checkBox: joi.string().optional()


// })


module.exports = { signupValidate, dogvalidate, loginValidate, associationValidate, regularValidate }



