import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const menuItems = [
        { label: "What's my car worth?", href: '#' },
        { label: 'Search used car prices', href: '#' },
        { label: 'More', href: '#' },
    ];

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                borderBottom: '1px solid #ddd',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: { xs: 2, sm: 4, md: 6 },
                    py: 2,
                }}
            >
                {/* Brand name on the left */}
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                        color: '#222',
                        fontSize: { xs: '1.2rem', sm: '1.5rem' },
                    }}
                >
                    PricesPeoplePay
                </Typography>

                {/* Middle menu (large screen display) */}
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' }, // Hide the small screen and display it on the large screen
                        alignItems: 'center',
                        gap: 4,
                    }}
                >
                    {menuItems.map((item, index) => (
                        <Button
                            key={index}
                            sx={{
                                color: '#444',
                                fontWeight: '500',
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                textTransform: 'none',
                                '&:hover': { color: '#000' },
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>

                {/* right icon */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* Small screen menu */}
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <IconButton
                            onClick={toggleDrawer(true)}
                            sx={{ color: '#444' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                        >
                            <Box
                                sx={{
                                    width: 250,
                                    py: 2,
                                    px: 2,
                                }}
                                role="presentation"
                                onClick={toggleDrawer(false)}
                                onKeyDown={toggleDrawer(false)}
                            >
                                <List>
                                    {menuItems.map((item, index) => (
                                        <ListItem button key={index}>
                                            <ListItemText
                                                primary={item.label}
                                                sx={{
                                                    textAlign: 'left',
                                                    fontSize: '1rem',
                                                    fontWeight: 500,
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Drawer>
                    </Box>
                    {/* User avatar */}
                    <IconButton sx={{ color: '#444' }}>
                        <AccountCircleIcon
                            sx={{
                                fontSize: { xs: 40, sm: 50 },
                            }}
                        />
                    </IconButton>

                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
