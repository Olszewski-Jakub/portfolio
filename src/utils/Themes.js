export const darkTheme = {
    // GitHub-like dark with modern blue accents
    bg: "#0D1117",
    bgLight: "#161B22",
    primary: "#2F81F7",          // accent blue
    text_primary: "#E6EDF3",
    text_secondary: "#8B949E",
    card: "#161B22",
    card_light: '#1F2733',
    button: "#2F81F7",
    white: "#FFFFFF",
    black: "#000000",
    // Centralized extras
    scrollbar: {
        track: "#161B22",
        thumb: "#30363D",
        thumbHover: "#484F58",
    },
    gradients: {
        // Used in App.Wrapper (values repurposed to cool blues/cyans)
        wrapper: {
            pinkLight: "rgba(47, 129, 247, 0.14)", // blue glow
            pinkZero: "rgba(47, 129, 247, 0)",
            blueZero: "rgba(14, 165, 233, 0)",    // cyan
            blueLight: "rgba(14, 165, 233, 0.14)",
        },
        // Used in Projects.Container
        projects: {
            violetLight: "rgba(47, 129, 247, 0.06)",
            violetZero: "rgba(47, 129, 247, 0)",
        }
    }
}

export const lightTheme = {
    // Clean light with dev-friendly blue accents
    bg: "#FFFFFF",
    bgLight: "#F5F7FB",
    primary: "#2563EB",            // blue-600
    text_primary: "#0F172A",       // slate-900
    text_secondary: "#475569",     // slate-600
    card: "#FFFFFF",
    card_light: "#EFF2F7",         // slightly darker than bgLight for contrast
    button: "#2563EB",
    white: "#FFFFFF",
    black: "#000000",
    // Light theme scrollbar and gradients
    scrollbar: {
        track: "#E5E7EB",
        thumb: "#CBD5E1",
        thumbHover: "#94A3B8",
    },
    gradients: {
        wrapper: {
            // cool blue/cyan accents
            pinkLight: "rgba(37, 99, 235, 0.12)",
            pinkZero: "rgba(37, 99, 235, 0)",
            blueZero: "rgba(14, 165, 233, 0)",
            blueLight: "rgba(14, 165, 233, 0.12)",
        },
        projects: {
            violetLight: "rgba(37, 99, 235, 0.06)",
            violetZero: "rgba(37, 99, 235, 0)",
        }
    }
}
