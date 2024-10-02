import * as yup from 'yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const schemaSighUp = yup.object().shape({
    username: yup
        .string()
        .min(3, 'Username length should be at least 3 characters')
        .max(20, 'Username cannot exceed more than 20 characters')
        .required('email address is required'),
    email: yup
        .string()
        .email('please provide a valid email address')
        .required('email address is required')
        .matches(emailRegex, 'Invalid email'),
    password: yup
        .string()
        .min(6, 'Password length should be at least 6 characters')
        .max(40, 'Password cannot exceed more than 40 characters')
        .required('email address is required'),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('email address is required'),
    toggle: yup.boolean().oneOf([true], 'Please toggle accept'),
});

export const shemaSignIn = yup.object().shape({
    email: yup
        .string()
        .email('please provide a valid email address')
        .required('email address is required')
        .matches(emailRegex, 'Invalid email'),
    password: yup.string().required('password is required'),
});
