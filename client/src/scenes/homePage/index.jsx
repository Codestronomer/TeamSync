import { Box } from '@mui/material';
import { useState } from 'react';
import NavBar from '../navbar';
import NavBar2 from '../../components/navbar';
import SideBar from '../../components/sidebar';
import { useMediaQuery } from '@mui/material';
import Users from '../users';

const HomePage = () => {


        const isNonMobile = useMediaQuery('(min-width: 6s00px)');
        const [isSidebarOpen, setIsSidebarOpen] = useState(true);
        return <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
                <SideBar
                        isNonMobile={isNonMobile}
                        drawerWidth="250px"
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                />
                <Box flexGrow={1}>
                        <NavBar2 isSidebarOpen={isSidebarOpen}
                                setIsSidebarOpen={setIsSidebarOpen} />
                </Box>
                <Users />

        </Box>
};

export default HomePage;