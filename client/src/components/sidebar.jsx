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
        GroupsOutlined,
        TasksOutlined,
        AssignmentOutlined,
        FilePresentOutlined,
        ArticleOutlined,
        Person3Outlined,
        OtherHousesOutlined
} from '@mui/icons-material';

const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
        return (
                <div>Sidebar</div>
        )
}

export default Sidebar;