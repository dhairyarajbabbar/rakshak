import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Exams() {
  let navigate = useNavigate();
  const [exams, setExams] = React.useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}api/exam/user-sessions`, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data);
        setExams(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exams:", error);
      });
  }, []);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const handleAddDocClick = () => {
    navigate("exam");
  };

    // const handleShowDetailsClick = () => {
    //   // Handle showing exam details, you can implement this based on your requirements
    // };

  const selectedExam = exams[selectedItemIndex];

  return (
    // <Box sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
    <Container id="exams" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography component="h2" variant="h4" color="text.primary">
                Exams
              </Typography>
              <Button variant="contained" onClick={handleAddDocClick}>
                Give Exam
              </Button>
            </div>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              View and participate in your exams here.
            </Typography>
          </div>

          <Grid
            container
            item
            gap={1}
            sx={{ display: { xs: "auto", sm: "none" } }}
          >
            {exams.map(({ startTime, endTime, score, result }, index) => (
              <Chip
                key={index}
                label={`Start: ${startTime} | End: ${endTime} | Score: ${score} | Result: ${result}`}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: (theme) => {
                    return selectedItemIndex === index ? "primary.light" : "";
                  },
                  backgroundColor:
                    selectedItemIndex === index ? "primary.main" : "",
                  "& .MuiChip-label": {
                    color: selectedItemIndex === index ? "#fff" : "",
                  },
                }}
              />
            ))}
          </Grid>

          <Box
            component={Card}
            variant="outlined"
            sx={{
              display: { xs: "auto", sm: "none" },
              mt: 4,
            }}
          >
            <Box
              sx={{
                minHeight: 280,
              }}
            />
            <Box sx={{ px: 2, pb: 2, }}>
              <Typography
                color="text.primary"
                variant="body2"
                fontWeight="bold"
              >
                {selectedExam?.type}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ my: 0.5 }}
              >
                {selectedExam?.description}
              </Typography>
              <Link
                color="primary"
                variant="body2"
                fontWeight="bold"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  "& > svg": { transition: "0.2s" },
                  "&:hover > svg": { transform: "translateX(2px)" },
                }}
              >
                <span>Get Exam Details</span>
                <ChevronRightRoundedIcon
                  fontSize="small"
                  sx={{ mt: "1px", ml: "2px" }}
                />
              </Link>
            </Box>
          </Box>

          <Stack
            direction="column"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: "100%", display: { xs: "none", sm: "flex" }, maxHeight: "400px", overflowY: "auto" }}
          >
            {exams.map((exam, index) => (
              <Card
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: "fit-content",
                  minHeight: 120,
                  width: "100%",
                  background: "none",
                  backgroundColor:
                    selectedItemIndex === index ? "action.selected" : undefined,
                  borderColor: (theme) =>
                    selectedItemIndex === index ? "primary.light" : "grey.200",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    textAlign: "left",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { md: "center" },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color:
                        selectedItemIndex === index
                          ? "primary.main"
                          : "grey.300",
                    }}
                  >
                    {<DocumentScannerIcon />}
                  </Box>
                  <div>
                    <Typography
                      color="text.primary"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {`Score: ${exam.score}`}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ my: 0.5 }}
                    >
                      {`Start Time: ${exam.startTime}`}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        "& > svg": { transition: "0.2s" },
                        "&:hover > svg": { transform: "translateX(2px)" },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        // Handle link click if needed
                      }}
                    >
                      <span>Show Exam Details</span>
                      <ChevronRightRoundedIcon
                        fontSize="small"
                        sx={{ mt: "1px", ml: "2px" }}
                      />
                    </Link>
                  </div>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "none", sm: "flex" },
              pointerEvents: "none",
            }}
          >
            <Box
              sx={{
                m: "auto",
                width: 420,
                height: 500,
                backgroundSize: "contain",
                backgroundImage: (theme) =>
                  theme.palette.mode === "light"
                    ? exams[selectedItemIndex]?.imageLight
                    : exams[selectedItemIndex]?.imageDark,
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
    // </Box>

  );
}
