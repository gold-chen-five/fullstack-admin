import React from 'react'
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
    useTheme,
    Collapse
} from "@mui/material"
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutline,
    ExpandLess,
    ExpandMore
} from "@mui/icons-material"
import { useEffect,useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import FlexBetween from './FlexBetween'
import profileImage from 'assets/profile.jpeg'

const naviItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Client Facing",
        icon: null,
        topic: "clientFacing"
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />,
        topic: "clientFacing"
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />,
        topic: "clientFacing"
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />,
        topic: "clientFacing"
    },
    {
        text: "Geography",
        icon: <PublicOutlined />,
        topic: "clientFacing"
    },
    {
        text: "Sales",
        icon: null,
        topic: "sales"
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />,
        topic: "sales"
    },
    {
        text: "Daily",
        icon: <TodayOutlined />,
        topic: "sales"
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />,
        topic: "sales"
    },
    {
        text: "Breakdown",
        icon: <PieChartOutline />,
        topic: "sales"
    },
    {
        text: "Management",
        icon: null,
        topic: "management"
    },
    {
        text: "Admins",
        icon: <AdminPanelSettingsOutlined />,
        topic: "management"
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />,
        topic: "management"
    }
]

function Sidebar({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) {
    const { pathname } = useLocation()
    const [active,setActive] = useState('')
    const navigate = useNavigate()
    const theme = useTheme()
    const [clientfacingOpen,setClientFacingOpen] = useState(false)
    const [salesOpen,setSalesOpen] = useState(false)
    const [managementOpen,setManagementOpen] = useState(false)

    const handleClick = (topic) => {
        switch(topic){
            case "clientFacing": {
                setClientFacingOpen(!clientfacingOpen)
                break
            }
            case "sales": {
                setSalesOpen(!salesOpen)
                break
            }
            default: {
                setManagementOpen(!managementOpen)
            }
        }
    }

    useEffect(() => {
        setActive(pathname.substring(1))
    },[pathname])

    return (
        <Box component="nav">
            {
                isSidebarOpen && (
                    <Drawer 
                        open={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                        variant="persistent"
                        anchor="left"
                        sx={{
                            width: drawerWidth,
                            "& .MuiDrawer-paper": {
                                color: theme.palette.secondary[200],
                                backgroundColor: theme.palette.background.alt,
                                boxSizing: "border-box",
                                borderWidth: isNonMobile ? 0 : "2px",
                                width: drawerWidth
                            }
                        }}
                    >
                        <Box width="100%">
                            <Box m="1.5rem 2rem 2rem 3rem">
                                <FlexBetween color={theme.palette.secondary.main}>
                                    <Typography variant="h4" fontWeight="bold">
                                        ECOMVISION
                                    </Typography>
                                    {!isNonMobile && (
                                        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                            <ChevronLeft />
                                        </IconButton>
                                    )}
                                </FlexBetween>
                            </Box>
                            <List>
                                {naviItems.map(({text,icon,topic}) => {
                                    let topicIn = null
                                    switch(topic){
                                        case "clientFacing":{
                                            topicIn = clientfacingOpen
                                            break
                                        }
                                        case "sales": {
                                            topicIn = salesOpen
                                            break
                                        }
                                        default: {
                                            topicIn = managementOpen
                                        } 
                                    }

                                    if(!icon){
                                        return (
                                            <ListItemButton onClick={() => handleClick(topic)} key={text}
                                                sx={{
                                                    p: "1rem 2rem 0.5rem 1.75rem"
                                                }}
                                            >
                                                <ListItemText primary={text}/>
                                                {topicIn ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>
                                        )
                                    }
                                    const lcText = text.toLowerCase()
                                    
                                    if(lcText === "dashboard"){
                                        return (
                                            <ListItem component="div"  disablePadding key={text}>
                                                <ListItemButton
                                                    onClick={() => {
                                                        navigate(`/${lcText}`)
                                                        setActive(lcText)
                                                    }}
                                                    sx={{
                                                        backgroundColor: 
                                                            active === lcText 
                                                                ? theme.palette.secondary[300] 
                                                                : "transparent",
                                                        color: 
                                                            active === lcText 
                                                                ? theme.palette.secondary[600] 
                                                                : theme.palette.secondary[100]
                                                    }}
                                                >
                                                    <ListItemIcon
                                                        sx={{
                                                            ml: "2rem",
                                                            color: 
                                                                active === lcText
                                                                    ? theme.palette.primary[600]
                                                                    : theme.palette.secondary[200]
                                                        }}
                                                    >
                                                        {icon}
                                                    </ListItemIcon>
                                                    <ListItemText  primary={text} />
                                                    {
                                                        active === lcText && (
                                                            <ChevronRightOutlined  sx={{ml: "auto"}}/>
                                                        )
                                                    }
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    }
                                       
                                    if(topicIn === null) return (null)
                                    return (
                                        <Collapse key={text} in={topicIn} timeout="auto" unmountOnExit>
                                            <List component="div"  disablePadding>
                                                <ListItemButton
                                                    onClick={() => {
                                                        navigate(`/${lcText}`)
                                                        setActive(lcText)
                                                    }}
                                                    sx={{
                                                        backgroundColor: 
                                                            active === lcText 
                                                                ? theme.palette.secondary[300] 
                                                                : "transparent",
                                                        color: 
                                                            active === lcText 
                                                                ? theme.palette.secondary[600] 
                                                                : theme.palette.secondary[100]
                                                    }}
                                                >
                                                    <ListItemIcon
                                                        sx={{
                                                            ml: "2rem",
                                                            color: 
                                                                active === lcText
                                                                    ? theme.palette.primary[600]
                                                                    : theme.palette.secondary[200]
                                                        }}
                                                    >
                                                        {icon}
                                                    </ListItemIcon>
                                                    <ListItemText  primary={text} />
                                                    {
                                                        active === lcText && (
                                                            <ChevronRightOutlined sx={{ml: "auto"}} />
                                                        )
                                                    }
                                                </ListItemButton>
                                            </List>
                                        </Collapse>
                                        
                                    )
                                })}
                            </List>
                        </Box>
                        <Box position="absolute" bottom="2rem" width="100%">
                            <Divider />
                            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                                <Box
                                    component="img"
                                    alt="profile"
                                    src={profileImage}
                                    height="40px"
                                    width="40px"
                                    borderRadius="50%"
                                    sx={{ objectFit: "cover"}}
                                />
                                <Box textAlign="left">
                                    <Typography
                                        fontWeight="bold"
                                        fontSize="0.9rem"
                                        sx={{ color: theme.palette.secondary[100]}}
                                    >
                                        {user.name}
                                    </Typography>
                                    <Typography
                                        fontWeight="bold"
                                        fontSize="0.8rem"
                                        sx={{ color: theme.palette.secondary[200]}}
                                    >
                                        {user.occupation}
                                    </Typography>
                                </Box>
                                <SettingsOutlined sx={{color: theme.palette.secondary[300],fontSize: "25px"}}/>
                                
                            </FlexBetween>
                        </Box>
                    </Drawer>
                )
            }
        </Box>
    )
}

export default Sidebar