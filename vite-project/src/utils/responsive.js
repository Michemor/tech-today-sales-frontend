// Responsive utility functions and breakpoints

// Export the theme breakpoints for use in components
export const breakpoints = {
    xs: 0,     // Extra small devices (phones)
    sm: 600,   // Small devices (tablets)
    md: 900,   // Medium devices (small laptops)
    lg: 1200,  // Large devices (desktops)
    xl: 1536,  // Extra large devices (large desktops)
};

// Responsive container widths
export const containerSizes = {
    xs: '100%',
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
};

// Common responsive styles
export const responsiveStyles = {
    // Flexible container
    flexContainer: {
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 3 },
        alignItems: { xs: 'stretch', md: 'center' },
    },

    // Responsive grid
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
        },
        gap: { xs: 2, sm: 3, md: 4 },
    },

    // Responsive padding
    responsivePadding: {
        padding: { xs: 2, sm: 3, md: 4 },
    },

    // Responsive margin
    responsiveMargin: {
        margin: { xs: 1, sm: 2, md: 3 },
    },

    // Responsive text alignment
    centerTextOnMobile: {
        textAlign: { xs: 'center', md: 'left' },
    },

    // Full width on mobile
    fullWidthOnMobile: {
        width: { xs: '100%', md: 'auto' },
    },

    // Hide on mobile
    hideOnMobile: {
        display: { xs: 'none', md: 'block' },
    },

    // Show only on mobile
    showOnMobile: {
        display: { xs: 'block', md: 'none' },
    },

    // Responsive font sizes
    responsiveText: {
        h1: {
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        },
        h2: {
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
        },
        h3: {
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
        },
        body: {
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
        },
    },
};

// Media query helper function
export const mediaQuery = (breakpoint) => `@media (min-width: ${breakpoints[breakpoint]}px)`;

// Responsive spacing helper
export const getResponsiveSpacing = (xs, sm = xs, md = sm, lg = md, xl = lg) => ({
    xs,
    sm,
    md,
    lg,
    xl,
});

// Common responsive component configurations
export const responsiveConfigs = {
    // Card configuration
    card: {
        sx: {
            width: { xs: '100%', sm: '300px', md: '350px' },
            margin: { xs: 1, sm: 2 },
            padding: { xs: 2, sm: 3 },
        },
    },

    // Form configuration
    form: {
        sx: {
            width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' },
            maxWidth: '600px',
            margin: '0 auto',
            padding: { xs: 2, sm: 3, md: 4 },
        },
    },

    // Button configuration
    button: {
        sx: {
            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
            padding: { xs: '8px 16px', sm: '10px 20px', md: '12px 24px' },
            minWidth: { xs: '120px', sm: '140px', md: '160px' },
        },
    },

    // Dialog configuration
    dialog: {
        PaperProps: {
            sx: {
                width: { xs: '95%', sm: '80%', md: '60%', lg: '50%' },
                maxWidth: '800px',
                margin: { xs: 1, sm: 2 },
            },
        },
    },
};

export default responsiveStyles;
