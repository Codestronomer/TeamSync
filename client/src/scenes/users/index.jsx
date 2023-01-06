import { useState, useEffect } from 'react';
import {
        Box,
        useTheme,
        Grid,
        Paper,
        styled,
        Typography,
        IconButton,
} from '@mui/material';
import FlexBetween from '../../components/flexBetween';
import axios from 'axios';
import { useSelector } from 'react-redux';
import profileImage2 from '../../components/profile1.jpg';
import profileImage from '../../components/profile2.png';
import { AddCircleOutlineOutlined } from '@mui/icons-material';


// const User
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


const Users = () => {
        const [users, setUsers] = useState(null);
        const theme = useTheme();
        const token = useSelector((state) => state.token);

        const getData = async () => {
                axios({
                        method: 'get',
                        url: '/users',
                        headers: { 'Authorization': `Bearer ${token}` }
                }).then((response) => {
                        const data = response.data;
                        console.log(data[0]);
                        setUsers(response.data);
                }).catch((err) => console.log(err));
        }

        useEffect(() => {
                getData();
        }, [])

        return (
                <>
                        {/* <FlexBetween padding="2rem 15%">
                        </FlexBetween> */}
                        <FlexBetween padding="2rem 20%">
                                <Grid container spacing={2}>
                                        <Grid item xs={3.5}>
                                                <Item>
                                                        <IconButton>
                                                                <AddCircleOutlineOutlined sx={{
                                                                        fontSize: "36px",
                                                                        marginTop: "45px",
                                                                        color: theme.palette.primary.main
                                                                }} />
                                                        </IconButton>
                                                        <Typography variant="h4" fontWeight="bold"
                                                                color={theme.palette.primary.main}>
                                                                Add user
                                                        </Typography>
                                                </Item>
                                        </Grid>
                                        {users.map((user) =>
                                                <Grid item xs={3.5}>
                                                        <Item>
                                                                <Box
                                                                        component="img"
                                                                        alt="profile"
                                                                        src={profileImage}
                                                                        height="80px"
                                                                        width="80px"
                                                                        borderRadius="50%"
                                                                        sx={{ objectFit: "cover" }}
                                                                        margin='10px' />
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