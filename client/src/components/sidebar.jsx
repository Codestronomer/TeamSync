import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './flexBetween';
import profileImage from './profile2.png';
import {
        Box,
        Divider,
        Drawer,
        IconButton,
        List,
        ListItem,
        ListItemButton,
        ListItemIcon,
        ListItemText,
        Typography,
        useTheme
} from '@mui/material';
import {
        AllInclusive,
        GroupsOutlined,
        TaskOutlined,
        AssignmentOutlined,
        FilePresentOutlined,
        ArticleOutlined,
        Person3Outlined,
        OtherHousesOutlined
} from '@mui/icons-material';


const navItems = [
        {
                text: "Dashboard",
                icon: <OtherHousesOutlined />
        },
        {
                text: "Users",
                icon: <Person3Outlined />
        },
        {
                text: "Teams",
                icon: <GroupsOutlined />
        },
        {
                text: "Project",
                icon: <ArticleOutlined />
        },
        {
                text: "Tasks",
                icon: <TaskOutlined />
        },
        {
                text: "Files",
                icon: <FilePresentOutlined />
        }
]
const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
        const { pathname } = useLocation();
        const [active, setActive] = useState("")
        const navigate = useNavigate();
        const theme = useTheme();

        useEffect(() => {
                setActive(pathname.substring(1));
        }, [pathname]);
        return <Box component="nav">
                {isSidebarOpen && (
                        <Drawer
                                open={isSidebarOpen}
                                onClose={() => setIsSidebarOpen(false)}
                                variant="persistent"
                                anchor="left"
                                sx={{
                                        width: drawerWidth,
                                        "& .MuiDrawer-paper": {
                                                color: theme.palette.primary[200],
                                                backgroundColor: theme.palette.background.alt,
                                                boxSizing: "border-box",
                                                borderWidth: isNonMobile ? 0 : "2px",
                                                width: drawerWidth
                                        }
                                }}>
                                <Box width="100%">
                                        <Box m="1.5rem 2rem 2rem 4rem">
                                                <FlexBetween color={theme.palette.primary.main}>
                                                        <Box display="flex" alignItems="center" gap="0.5rem">
                                                                <Typography variant="h4" fontWeight="bold">
                                                                        TeamSync
                                                                </Typography>
                                                        </Box>
                                                        {!isNonMobile && (
                                                                <IconButton onClick={() => {
                                                                        setIsSidebarOpen(!isSidebarOpen);
                                                                }}>
                                                                        <AllInclusive />
                                                                </IconButton>
                                                        )}
                                                </FlexBetween>
                                        </Box>
                                        <List>
                                                {navItems.map(({ text, icon }) => {
                                                        if (!icon) {
                                                                return (
                                                                        <Typography key={text} sx={{
                                                                                m: "2.25rem 0 1rem 3rem"
                                                                        }}>
                                                                                {text}
                                                                        </Typography>
                                                                )
                                                        }
                                                        const lcText = text.toLowerCase();

                                                        return (
                                                                <ListItem key={text} disablePadding>
                                                                        <ListItemButton onClick={() => {
                                                                                navigate(`/${lcText}`);
                                                                                setActive(lcText);
                                                                        }}
                                                                                sx={{
                                                                                        backgroundColor: active === lcText
                                                                                                ? theme.palette.secondary[300]
                                                                                                : "transparent",
                                                                                        color: active === lcText ? theme.palette.primary[600] :
                                                                                                theme.palette.secondary[100]
                                                                                }}>
                                                                                <ListItemIcon
                                                                                        sx={{
                                                                                                ml: "2rem",
                                                                                                color: active === lcText
                                                                                                        ? theme.palette.primary[600]
                                                                                                        : theme.palette.secondary[200]
                                                                                        }}>
                                                                                        {icon}
                                                                                </ListItemIcon>
                                                                                <ListItemText primary={text} />
                                                                                {active === lcText && (
                                                                                        <AllInclusive sx={{
                                                                                                ml: "auto"
                                                                                        }} />
                                                                                )}
                                                                        </ListItemButton>
                                                                </ListItem>
                                                        )
                                                })}
                                        </List>
                                </Box>
                        </Drawer>
                )}
        </Box>
}

export default Sidebar;