import { useState } from "react";
import {
        Box,
        Button,
        TextField,
        useMediaQuery,
        Typography,
        useTheme
} from '@mui/material';
import { Formik } from "formik";
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from '../../state';
import axios from 'axios';

const projectSchema = yup.object().shape({
        title: yup.string().required('required'),
        description: yup.string().required("required"),
})

const initialValuesProject = {
        title: "",
        description: ""
}


const Form = ({ children, openModal, setModalOpen }) => {
        const { palette } = useTheme();
        const user = useSelector((state) => state.user);
        const token = useSelector((state) => state.token);

        const project = async (values, onSubmitProps) => {
                // this allows us to send form data with image
                axios.post('https://teamsync-production.up.railway.app/projects',
                        {
                                'title': values.title,
                                'description': values.description,
                                'creator': user._id
                        }, { headers: { 'Authorization': `Bearer ${token}` } }
                ).then((response) => {
                        const savedProject = response.data;
                        onSubmitProps.resetForm();
                }).catch((err) => {
                        console.log(err);
                })
        }

        const handleFormSubmit = async (values, onSubmitProps) => {
                // await project(values, onSubmitProps);
        };

        return (
                <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValuesProject}
                        validationSchema={projectSchema}
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
                                        >
                                                <>
                                                        <TextField label="Project Title"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.title}
                                                                name="title"
                                                                error={Boolean(touched.title) && Boolean(errors.title)}
                                                                helperText={touched.title && errors.title}
                                                                sx={{ gridColumn: "span 4" }}
                                                        />
                                                        <TextField label="Project Description"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.description}
                                                                name="description"
                                                                error={Boolean(touched.description) && Boolean(errors.description)}
                                                                helperText={touched.description && errors.description}
                                                                sx={{ gridColumn: "span 4" }} />
                                                </>
                                        </Box>

                                        {/* Submit Button */}
                                        <Box>
                                                <Button fullWidth
                                                        type="submit"
                                                        sx={{
                                                                m: "2rem 0",
                                                                p: "1rem",
                                                                backgroundColor: palette.primary.main,
                                                                color: palette.background.alt,
                                                                "&:hover": { color: palette.primary.main }
                                                        }}
                                                        onClick={() => { setModalOpen(!(openModal)); }}
                                                >
                                                        Create Project
                                                </Button>
                                        </Box>
                                </form>
                        )}
                </Formik>
        )
}

export default Form;