import { useState } from "react";
import {
        Box,
        Button,
        TextField,
        useMediaQuery,
        Typography,
        useTheme
} from '@mui/material';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import FlexBetween from "../../components/flexBetween";
import { useSnackbar } from "@mui/base";
import axios from 'axios';

const registerSchema = yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        email: yup.string().email("Invalid email").required("required"),
        password: yup.string().required("required"),
        confirmPassword: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("required"),
        password: yup.string().required("required")
})

const initialValuesRegister = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
}

const initialValuesLogin = {
        email: "",
        password: ""
}

const Form = () => {
        const [pageType, setPageType] = useState("login");
        const { palette } = useTheme();
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const isNonMobile = useMediaQuery("(min-width: 600px)");
        const isLogin = pageType === "login";
        const isRegister = pageType === "register";

        const register = async (values, onSubmitProps) => {
                // this allows us to send form into with image
                // const formData = new FormData();
                // for (let value in values) {
                //         formData.append(value, values[value])
                // }
                // formData.append('picturePath', values.picture.name);
                // console.log(formData);
                axios.post('/auth/register', {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: values.password,
                        confirmPassword: values.confirmPassword
                }).then((response) => {
                        const savedUser = response.data;
                        onSubmitProps.resetForm();
                        console.log(savedUser);

                        if (savedUser) {
                                setPageType("login");
                        }
                }).catch((error) => {
                        console.log(error);
                })
        }

        const login = async (values, onSubmitProps) => {
                axios.post('/auth/login', {
                        email: values.email,
                        password: values.password
                }).then((response) => {
                        const loggedInResponse = response.data;
                        console.log(loggedInResponse);
                        onSubmitProps.resetForm();
                        if (loggedInResponse) {
                                dispatch(
                                        setLogin({
                                                user: loggedInResponse.user,
                                                token: loggedInResponse.token
                                        })
                                )
                        };
                        navigate("/home");
                }).catch((error) => {
                        console.log(error);
                });
        }

        const handleFormSubmit = async (values, onSubmitProps) => {
                if (isLogin) await login(values, onSubmitProps);
                if (isRegister) await register(values, onSubmitProps);
        };

        return (
                <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
                        validationSchema={isLogin ? loginSchema : registerSchema}
                >
                        {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                setFieldValue,
                                resetForm
                        }) => (
                                <form onSubmit={handleSubmit}>
                                        <Box
                                                display="grid"
                                                gap="30px"
                                                gridTemplateColumns="repeat(4, minxmax(0, 1fr))"
                                                sx={{
                                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                                }}>
                                                {isRegister ? (
                                                        <>
                                                                <TextField label="First Name"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        value={values.firstName}
                                                                        name="firstName"
                                                                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                                                        helperText={touched.firstName && errors.firstName}
                                                                        sx={{ gridColumn: "span 2" }}
                                                                />
                                                                <TextField label="Last Name"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        value={values.lastName}
                                                                        name="lastName"
                                                                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                                                        helperText={touched.lastName && errors.lastName}
                                                                        sx={{ gridColumn: "span 2" }}
                                                                />
                                                                <TextField label="Email"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        value={values.email}
                                                                        name="email"
                                                                        error={Boolean(touched.email) && Boolean(errors.email)}
                                                                        helperText={touched.email && errors.email}
                                                                        sx={{ gridColumn: "span 4" }}
                                                                />
                                                                <TextField label="Password"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        value={values.password}
                                                                        name="password"
                                                                        type="password"
                                                                        error={Boolean(touched.password) && Boolean(errors.password)}
                                                                        helperText={touched.password && errors.password}
                                                                        sx={{ gridColumn: "span 4" }}
                                                                />
                                                                <TextField label="Confirm Password"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        value={values.confirmPassword}
                                                                        name="confirmPassword"
                                                                        type="password"
                                                                        error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                                                                        helperText={touched.confirmPassword && errors.confirmPassword}
                                                                        sx={{ gridColumn: "span 4" }}
                                                                />
                                                        </>
                                                ) : (
                                                        <>
                                                                <TextField
                                                                        label="Email"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        value={values.email}
                                                                        name="email"
                                                                        error={Boolean(touched.email) && Boolean(errors.email)}
                                                                        helperText={touched.email && errors.email}
                                                                        sx={{ gridColumn: "span 4" }}
                                                                />
                                                                <TextField
                                                                        label="Password"
                                                                        type="password"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        value={values.password}
                                                                        name="password"
                                                                        error={Boolean(touched.password) && Boolean(errors.password)}
                                                                        helperText={touched.password && errors.password}
                                                                        sx={{ gridColumn: "span 4" }}
                                                                />
                                                        </>
                                                )}
                                        </Box>

                                        {/* Buttons */}
                                        <Box>
                                                <Button
                                                        fullWidth
                                                        type="submit"
                                                        sx={{
                                                                m: "2rem 0",
                                                                p: "1rem",
                                                                backgroundColor: palette.primary.main,
                                                                color: palette.background.alt,
                                                                "&:hover": { color: palette.primary.main }
                                                        }}
                                                >
                                                        {isLogin ? "LOGIN" : "REGISTER"}
                                                </Button>
                                                <Typography
                                                        onClick={() => {
                                                                setPageType(isLogin ? "register" : "login");
                                                                resetForm();
                                                        }}
                                                        sx={{
                                                                textDecoration: "underline",
                                                                color: palette.primary.main,
                                                                "&:hover": {
                                                                        cursor: "pointer",
                                                                        color: palette.primary.light,
                                                                },
                                                        }}
                                                >
                                                        {isLogin ?
                                                                "Don't have an account? Sign Up" :
                                                                "Already have an account? Login"}
                                                </Typography>
                                        </Box>

                                </form>
                        )}
                </Formik>
        )
}

export default Form;