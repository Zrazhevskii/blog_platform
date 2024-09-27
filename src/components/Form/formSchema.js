import * as yup from 'yup';

export const schema = yup.object().shape({
    username: yup
        .string()
        .min(3, 'Username length should be at least 3 characters')
        .max(20, "Username cannot exceed more than 20 characters'")
        .required('email address is required'),
    email: yup.string().email('please provide a valid email address').required('email address is required'),
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
