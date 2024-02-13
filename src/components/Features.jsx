import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import axios from "axios";
import  { useNavigate } from 'react-router-dom'

export default function Features() {
  let navigate = useNavigate(); 
  const [documents, setDocuments] = React.useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const [selectedDocumentImageData, setSelectedDocumentImageData] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}api/documents/`, {
        withCredentials: true 
      })
      .then(response => {
        setDocuments(response.data);
        // console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching documents:", error);
      });
  }, []);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  
    // Fetch document image data from the server
    const documentId = documents[index]._id;
    axios.get(`${process.env.REACT_APP_BASEURL}api/documents/${documentId}`, {
      responseType: 'arraybuffer',
      withCredentials: true 
    })
    .then(response => {
      // Convert the received ArrayBuffer to base64
      const arrayBuffer = response.data;
      const bytes = new Uint8Array(arrayBuffer);
      let binary = '';
      bytes.forEach(byte => binary += String.fromCharCode(byte));
      const imageData = window.btoa(binary);
      // Construct the data URL for the image
      const dataUrl = `data:${response.headers['content-type']};base64,${imageData}`;
      setSelectedDocumentImageData(dataUrl);
    })
    .catch(error => {
      console.error("Error fetching document image data:", error);
    });
  };
  
  

  const handleAddDocClick = () => {
    navigate('adddoc');
  };

  const selectedDocument = documents[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography component="h2" variant="h4" color="text.primary">
              Documents
            </Typography>
            <Button variant="contained" onClick={handleAddDocClick}>
              Add Doc
            </Button>
          </div>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Your documents are securely stored with us, ensuring the utmost
              privacy and confidentiality. Our advanced encryption technology
              and robust security measures guarantee the protection of your
              sensitive information.
            </Typography>
          </div>

          <Grid
            container
            item
            gap={1}
            sx={{ display: { xs: "auto", sm: "none" } }}
          >
            {documents.map(({ type }, index) => (
              <Chip
                key={index}
                label={type}
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
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                color="text.primary"
                variant="body2"
                fontWeight="bold"
              >
                {selectedDocument?.type}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ my: 0.5 }}
              >
                {selectedDocument?.description}
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
                <span>Show Document</span>
                <ChevronRightRoundedIcon
                  fontSize="small"
                  sx={{ mt: "1px", ml: "2px" }}
                />
              </Link>
            </Box>
          </Box>


          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: "100%", display: { xs: "none", sm: "flex" } }}
          >
            {documents.map(({ type, description }, index) => (
              <Card
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: "fit-content",
                  width: "100%",
                  background: "none",
                  backgroundColor:
                    selectedItemIndex === index ? "action.selected" : undefined,
                  borderColor: (theme) => {
                    return selectedItemIndex === index
                      ? "primary.light"
                      : "grey.200";
                  },
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
                      color: (theme) => {
                        return selectedItemIndex === index
                          ? "primary.main"
                          : "grey.300";
                      },
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
                      {type}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ my: 0.5 }}
                    >
                      {description}
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
                      }}
                    >
                      <span>Show Document</span>
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
                backgroundImage: `url(${selectedDocumentImageData})`, // Render fetched image data
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
