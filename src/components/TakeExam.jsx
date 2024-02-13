import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

export default function TakeExamPage() {
  const [examSessionId, setExamSessionId] = React.useState(null);
  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [timeRemaining, setTimeRemaining] = React.useState(0);

  const navigate = useNavigate();
  const handleSubmit = React.useCallback(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}api/exam/submit`,{
          examSessionId,
          answers,
        },{
          withCredentials: true,
        }
      )
      .then((response) => {
        // console.log("Exam answers submitted successfully:", response.data);
        navigate('/'); 
      })
      .catch((error) => {
        console.error("Error submitting exam answers:", error);
      });
  }, [answers, examSessionId, navigate]);

  React.useEffect(() => {
    // Fetch exam questions and start a new exam session
    axios
      .post(`${process.env.REACT_APP_BASEURL}api/exam/start`, null, {
        withCredentials: true, // Enable sending cookies
      })
      .then((response) => {
        setExamSessionId(response.data.examSessionId);
        setQuestions(response.data.questions);
        setAnswers(new Array(response.data.questions.length).fill("none"));
        setTimeRemaining(response.data.questions.length * 120); 
      })
      .catch((error) => {
        console.error("Error starting exam:", error);
      });
  }, []);


  // Countdown timer function
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handleSubmit(); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleSubmit]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    const newQuestions = questions.map((question, qIndex) => {
      if (qIndex === index) {
        return {
          ...question,
          selectedOption: value,
        };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  // Format time remaining into minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Take Exam
        </Typography>
        <Typography variant="h6" align="right" mr={2}>
          Time Remaining: {formatTime(timeRemaining)}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ my: 2 }}>
        <Box sx={{ mt: 2 }}>
          {questions.map((question, index) => (
            <div key={index}>
              <Typography variant="h6" gutterBottom>
                {index + 1}. {question.question}
              </Typography>
              <div
                style={{
                  marginLeft: "1.5em",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {question.options.map((option, optionIndex) => (
                  <Button
                    key={optionIndex}
                    variant="outlined"
                    onClick={() => handleAnswerChange(index, option)}
                    sx={{
                      flex: 1,
                      mr: 2,
                      mb: 2,
                      width: "100%",
                      backgroundColor:
                        question.selectedOption === option
                          ? "#007bff"
                          : "inherit",
                      color:
                        question.selectedOption === option
                          ? "#FFFFFF"
                          : "inherit",
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
