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
        Popover
} from '@mui/material';
import FlexBetween from '../../components/flexBetween';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import profileImage2 from '../../components/profile1.jpg';
import profileImage from '../../components/profile2.png';
import { AddCircleOutlineOutlined, MoreHoriz } from '@mui/icons-material';


// styled Item component for users grid
const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '230px',
        width: '200px',
        borderRadius: '8px'
}));

// users react component
const Users = () => {
        const [users, setUsers] = useState(null);
        const theme = useTheme();
        const token = useSelector((state) => state.token);
        const [anchorEl, setAnchorEl] = useState(null);

        // get user data from api
        const getData = async () => {
                axios({
                        method: 'get',
                        url: 'https://teamsync-production.up.railway.app/users',
                        headers: { 'Authorization': `Bearer ${token}` }
                }).then((response) => {

                        setUsers(response.data);
                }).catch((err) => console.log(err));
        }

        // re-render on after api call
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
                        <Typography variant="h3" color={theme.palette.mode === 'dark' ? 'white' : 'dark blue'}>Users</Typography>
                        <FlexBetween padding="2rem 20%">
                                <Grid container spacing={2}>
                                        <Grid item xs={3.5}>
                                                <Item>
                                                        <IconButton sx={{ marginTop: "45px" }} >
                                                                <AddCircleOutlineOutlined sx={{
                                                                        fontSize: "36px",
                                                                        color: theme.palette.primary.main
                                                                }} />
                                                        </IconButton>
                                                        <Typography variant="h4" fontWeight="bold"
                                                                color={theme.palette.primary.main}>
                                                                Add user
                                                        </Typography>
                                                </Item>
                                        </Grid>
                                        {users && users.map((user) =>
                                                <Grid item xs={3.5} key={user._id}>
                                                        <Item>
                                                                <FlexBetween>
                                                                        <Box
                                                                                component="img"
                                                                                alt="profile"
                                                                                src={profileImage}
                                                                                height="80px"
                                                                                width="80px"
                                                                                borderRadius="50%"
                                                                                sx={{ objectFit: "cover" }}
                                                                                margin='10px'
                                                                                marginLeft='50px' />
                                                                        <div>
                                                                                <IconButton sx={{ top: '-30px' }} onClick={handlePopoverClick}>
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
                                                                                {user.firstName} {user.lastName}
                                                                        </Typography>
                                                                </Box>
                                                                <Box>
                                                                        {user.email}
                                                                </Box>
                                                                <Box sx={{
                                                                        color: theme.palette.mode === 'dark' ? '#fff' : 'black',
                                                                        marginTop: '15px',
                                                                        fontWeight: 'bold'
                                                                }}>
                                                                        Software Developer
                                                                </Box>
                                                        </Item>
                                                </Grid>
                                        )}
                                </Grid>
                        </FlexBetween>
                </>

        )

}

export default Users;