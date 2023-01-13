import { useState, useEffect } from 'react';
import * as React from 'react';
import {
        Box,
        useTheme,
        Grid,
        Paper,
        styled,
        Typography,
        IconButton,
        Popover,
        Modal,
        Fade,
        Backdrop
} from '@mui/material';
import FlexBetween from '../../components/flexBetween';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import profileImage2 from '../../components/profile1.jpg';
import profileImage from '../../components/profile2.png';
import { AddCircleOutlineOutlined, MoreHoriz, ArticleOutlined } from '@mui/icons-material';
import Form from './form.jsx';


const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '5px',
        boxShadow: 2,
        p: 4,
};

// Item component for grid
const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        height: '230px',
        width: '200px',
        borderRadius: '8px'
}));

// project component
const Projects = () => {
        const [projects, setProjects] = useState(null);
        const [anchorEl, setAnchorEl] = useState(null);
        const [openModal, setModalOpen] = React.useState(false);
        const theme = useTheme();
        const token = useSelector((state) => state.token);
        const user = useSelector((state) => state.user);
        const handleModalOpen = () => setModalOpen(true);
        const handleModalClose = () => setModalOpen(false);

        const getData = async () => {
                axios({
                        method: 'get',
                        url: `https://teamsync-production.up.railway.app/projects/user/${user._id}`,
                        headers: {
                                'Authorization': `Bearer ${token}`
                        }
                }).then((response) => {
                        setProjects(response.data);
                }).catch((err) => console.log(err));
        }

        useEffect(() => {
                getData();
        }, [])


        const handlePopoverClick = (event) => {
                setAnchorEl(event.currentTarget);
        };

        const handlePopoverClose = () => {
                setAnchorEl(null);
        };

        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        return (
                <>
                        <Typography variant="h3" color={theme.palette.mode === 'dark' ? 'white' : 'dark blue'}>Projects</Typography>
                        <FlexBetween padding="2rem 20%">
                                <Grid container spacing={2}>
                                        <Grid item xs={3.5}>
                                                <Item sx={{ textAlign: "center" }}>
                                                        <IconButton sx={{ marginTop: "45px" }} onClick={handleModalOpen} >
                                                                <AddCircleOutlineOutlined sx={{
                                                                        fontSize: "36px",
                                                                        color: theme.palette.primary.main
                                                                }} />
                                                        </IconButton>
                                                        <Modal
                                                                aria-labelledby="transition-modal-title"
                                                                aria-describedby="transition-modal-description"
                                                                open={openModal}
                                                                onClose={handleModalClose}
                                                                closeAfterTransition
                                                                BackdropComponent={Backdrop}
                                                                BackdropProps={{
                                                                        timeout: 500,
                                                                }}
                                                        >
                                                                <Fade in={openModal}>
                                                                        <Box sx={style}>
                                                                                <Typography id="transition-modal-title" variant="h4" component="h2" sx={{ marginBottom: "20px" }}>
                                                                                        Create a new project
                                                                                </Typography>
                                                                                <Form id="transition-modal-description" sx={{ mt: 3, marginTop: "10px" }} openModal={openModal}
                                                                                        setModalOpen={setModalOpen} />
                                                                        </Box>
                                                                </Fade>
                                                        </Modal>
                                                        <Typography variant="h4" fontWeight="bold"
                                                                color={theme.palette.primary.main}>
                                                                Add New Project
                                                        </Typography>
                                                </Item>
                                        </Grid>
                                        {projects && projects.map((project) =>
                                                <Grid item xs={3.5} key={project._id}>
                                                        <Item>
                                                                <FlexBetween>
                                                                        <div color="green" borderradius="50%">
                                                                                <IconButton sx={{ color: "green" }}>
                                                                                        <ArticleOutlined fontSize="15px" />
                                                                                </IconButton>
                                                                        </div>
                                                                        <div>
                                                                                <IconButton sx={{ top: '0px' }} onClick={handlePopoverClick}>
                                                                                        <MoreHoriz sx={{ fontSize: "25px" }} />
                                                                                </IconButton>
                                                                                <Popover
                                                                                        id={id}
                                                                                        open={open}
                                                                                        anchorEl={anchorEl}
                                                                                        onClose={handlePopoverClose}
                                                                                        anchorOrigin={{
                                                                                                vertical: 'bottom',
                                                                                                horizontal: 'left',
                                                                                        }}
                                                                                >
                                                                                        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                                                                                        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                                                                                        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                                                                                </Popover>
                                                                        </div>
                                                                </FlexBetween>
                                                                <Box sx={{
                                                                        color: theme.palette.mode === 'dark' ? '#fff' : 'black'
                                                                }}>
                                                                        <Typography variant="h6" fontWeight="bold">
                                                                                {project.title}
                                                                        </Typography>
                                                                </Box>
                                                                <Box>
                                                                        {project.description}
                                                                </Box>
                                                                <Box sx={{
                                                                        color: theme.palette.mode === 'dark' ? '#fff' : 'black',
                                                                        marginTop: '15px',
                                                                        fontWeight: 'bold'
                                                                }}>
                                                                        Task Done: 2/5
                                                                </Box>
                                                        </Item>
                                                </Grid>
                                        )}
                                </Grid>
                        </FlexBetween>
                </>

        )

}

export default Projects;