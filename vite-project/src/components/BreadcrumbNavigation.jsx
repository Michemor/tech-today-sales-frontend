import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SalesIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import Box from '@mui/material/Box';

const BreadcrumbNavigation = ({ customPaths = {}, currentTab = null }) => {
  const location = useLocation();
  
  // Define route mappings with custom labels and icons
  const routeLabels = {
    '/': { 
      label: 'Home', 
      icon: <HomeIcon sx={{ fontSize: 16, mr: 0.5 }} /> 
    },
    '/potentialclients': { 
      label: 'Potential Clients', 
      icon: <PeopleIcon sx={{ fontSize: 16, mr: 0.5 }} /> 
    },
    '/buildings': { 
      label: 'Buildings', 
      icon: <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} /> 
    },
    '/sales': { 
      label: 'Sales', 
      icon: <SalesIcon sx={{ fontSize: 16, mr: 0.5 }} /> 
    },
    '/client': { 
      label: 'Client Details', 
      icon: <PersonIcon sx={{ fontSize: 16, mr: 0.5 }} /> 
    },
    '/officedata': { 
      label: 'Office Data', 
      icon: <BusinessIcon sx={{ fontSize: 16, mr: 0.5 }} /> 
    },
    '/clientdata': { 
      label: 'Client Data', 
      icon: <PersonIcon sx={{ fontSize: 16, mr: 0.5 }} /> 
    },
    ...customPaths
   };

  // Tab labels for pages with tabs
  const tabLabels = {
    '/potentialclients': {
      '1': 'Clients List',
      '2': 'Meetings',
      '3': 'Offices',
      '4': 'Internet'
    },
    '/buildings': {
      '1': 'Buildings',
      '2': 'Offices'
    }
  };

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    
    const breadcrumbItems = [
      // Always include Home
      {
        path: '/',
        label: routeLabels['/'].label,
        icon: routeLabels['/'].icon,
        isLast: pathnames.length === 0
      }
    ];

    // Special case for client details page accessed from sales
    if (pathnames.length === 2 && pathnames[0] === 'client' && pathnames[1].match(/^\d+$/)) {
      // Add Sales breadcrumb
      breadcrumbItems.push({
        path: '/sales',
        label: routeLabels['/sales'].label,
        icon: routeLabels['/sales'].icon,
        isLast: false
      });
      
      // Add Client Details as the final breadcrumb
      breadcrumbItems.push({
        path: location.pathname,
        label: 'Client Details',
        icon: routeLabels['/client'].icon,
        isLast: true
      });
      
      return breadcrumbItems;
    }

    // Add intermediate paths
    pathnames.forEach((pathname, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      
      // Handle dynamic routes (like /client/:id)
      let routeKey = routeTo;
      let label = pathname;
      
      // Check if this is a dynamic route
      if (pathname.match(/^\d+$/)) {
        // This is likely an ID, use the parent route for label mapping
        const parentRoute = `/${pathnames.slice(0, index).join('/')}`;
        routeKey = parentRoute;
        label = routeLabels[routeKey]?.label || 'Details';
      } else {
        routeKey = routeTo;
        label = routeLabels[routeKey]?.label || pathname.charAt(0).toUpperCase() + pathname.slice(1);
      }

      breadcrumbItems.push({
        path: routeTo,
        label,
        icon: routeLabels[routeKey]?.icon || null,
        isLast
      });
    });

    // Add tab information if currentTab is provided and we have tab labels for this route
    if (currentTab && tabLabels[location.pathname] && tabLabels[location.pathname][currentTab]) {
      breadcrumbItems.push({
        path: location.pathname,
        label: tabLabels[location.pathname][currentTab],
        icon: null,
        isLast: true
      });
    }

    return breadcrumbItems;
  };

  const breadcrumbItems = generateBreadcrumbs();

  // Don't render breadcrumbs on home page unless there are additional segments
  if (location.pathname === '/' && breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <Box 
      sx={{ 
        mb: 2, 
        mx: 2,
        p: 1.5,
        backgroundColor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 1
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" sx={{ color: 'primary.main' }} />}
        aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-separator': {
            mx: 1,
          },
          '& .MuiBreadcrumbs-ol': {
            flexWrap: 'wrap',
            alignItems: 'center'
          }
        }}
      >
        {breadcrumbItems.map((item) => {
          if (item.isLast) {
            return (
              <Typography
                key={item.path}
                color="text.primary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: 'primary.main'
                }}
              >
                {item.icon}
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={item.path}
              component={RouterLink}
              to={item.path}
              underline="hover"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline',
                  textDecorationColor: 'primary.main'
                }
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbNavigation;
