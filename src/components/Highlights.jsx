import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function Highlights() {
  const [userData, setUserData] = React.useState(null);
  const [profilePic, setProfilePic] = React.useState(null);
  const [licenseDetails, setLicenseDetails] = React.useState(null);

  // Fetch user profile data
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}api/profile`, {
        withCredentials: true,
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  // Fetch profile picture separately
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}api/profile/picture`, {
        responseType: "arraybuffer",
        withCredentials: true,
      })
      .then((response) => {
        const imageBlob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const imageUrl = URL.createObjectURL(imageBlob);
        setProfilePic(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching profile picture:", error);
      });
  }, []);

  // Fetch license details
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}api/exam/user-sessions`, {
        withCredentials: true,
      })
      .then((response) => {
        const userExamSessions = response.data || [];
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const passingScore = 7;
        const passedExam = userExamSessions.find(
          (exam) =>
            exam.score >= passingScore && new Date(exam.endTime) > sixMonthsAgo
        );
        if (passedExam) {
          const issueDate = new Date(passedExam.createdAt);
          const validUntil = new Date(issueDate);
          validUntil.setMonth(validUntil.getMonth() + 6);

          const userLicenseDetails = {
            issueDate,
            validUntil,
            LicenseNo: passedExam._id,
          };

          setLicenseDetails(userLicenseDetails);
        }
      })
      .catch((error) => {
        console.error("Error fetching user exams:", error);
      });
  }, []);

  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "#06090a",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4">
            {licenseDetails ? "Your License" : "Give Exam to get License"}
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            {licenseDetails
              ? "Congratulations on earning your license! This license provides you access to our product's exclusive features, ensuring adaptability, durability, user-friendly design, and innovation. Additionally, enjoy reliable customer support and precision in every detail. Make the most out of your license and enhance your experience with our product."
              : "Practice learning the vehicle and apply for a permanent license with our temporary license. Get access to all the features for a limited time and take the exams to get your permanent license."}
          </Typography>
        </Box>
        <Card
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: "left",
            p: 3,
            border: "1px solid",
            borderColor: "grey.800",
            background: "transparent",
            backgroundColor: "grey.900",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {profilePic && (
            <Box sx={{ maxWidth: "30%", marginRight: "2rem" }}>
              <img
                src={profilePic}
                alt="Profile"
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </Box>
          )}
          <Box sx={{ width: "100%" }}>
            {userData && licenseDetails && (
              <Box>
              <Typography variant="body1" sx={{ color: "grey.400" }}>
                <strong>ID : </strong> {licenseDetails.LicenseNo}
              </Typography>
              <Typography variant="body1" sx={{ color: "grey.400" }}>
                <strong>Name:</strong> {userData.name}
              </Typography>
              <Typography variant="body1" sx={{ color: "grey.400", marginTop: '1rem' }}>
                <strong>Contact:</strong> {userData.contact}
              </Typography>
              <Typography variant="body1" sx={{ color: "grey.400" }}>
                <strong>Address:</strong> {userData.address}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: '1.5rem' }}>
                <Typography variant="body1" sx={{ color: "grey.400" }}>
                  <strong>Issued:</strong>{" "}
                  {licenseDetails.issueDate.toLocaleDateString("en-IN")}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "grey.400", mr:"12px" }}
                >
                  <strong>Expired:</strong>{" "}
                  {licenseDetails.validUntil.toLocaleDateString("en-IN")}
                </Typography>
              </Box>
            </Box>
            
            )}
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
