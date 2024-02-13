import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Hero() {
    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = -30; // Adjust this value to your liking
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset ; // Add 10 pixels to the offset
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
        }
    };
    

    return (
        <Box
            id="hero"
            sx={(theme) => ({
                width: "100%",
                backgroundImage:
                theme.palette.mode === "light"
                    ? "linear-gradient(180deg, #CEE5FD, #FFF)"
                    : "linear-gradient(#02294F, #090E10)",
                backgroundSize: "100% 20%",
                backgroundRepeat: "no-repeat",
            })}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "90%" } }}>
                    <Typography
                        component="h1"
                        variant="h1"
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            alignSelf: "center",
                            textAlign: "center",
                        }}
                    >
                        Get your&nbsp;
                        <Typography
                            component="span"
                            variant="h1"
                            sx={{
                                color: (theme) =>
                                theme.palette.mode === "light"
                                    ? "primary.main"
                                    : "primary.light",
                            }}
                        >
                            License&nbsp;
                        </Typography>
                        now!
                    </Typography>
                    <Typography variant="body1" textAlign="center" color="text.secondary">
                        Welcome to our platform! We offer a streamlined assessment process
                        designed to efficiently evaluate your skills and knowledge. Our
                        platform provides comprehensive assessments tailored to your needs,
                        ensuring a thorough understanding of your capabilities.
                        <br />
                        Rest assured, we prioritize the security and confidentiality of your
                        information. Your data is kept secure and encrypted, maintaining
                        privacy and integrity throughout the assessment and licensing
                        process.
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        alignSelf="center"
                        spacing={1}
                        useFlexGap
                        sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
                    >
                        <Button variant="contained" color="primary" onClick={() => scrollToSection('features')}>
                            Start now
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
