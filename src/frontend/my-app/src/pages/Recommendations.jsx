import { useParams } from "react-router-dom";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { Box, Button } from "@mui/material";
import "./Recommendations.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Recommendations = () => {
  const param = useParams();
  const userName = param.username;
  const navigate = useNavigate();

  return (
    <>
      <NavBar></NavBar>
      <div className="recommendation-container">
        <div className="recommendation-box">
          <Button
            variant=""
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Back
          </Button>
          <h3>K - 12 Grade</h3>
          <a href="https://www.educationstandards.nsw.edu.au/wps/portal/nesa/home">
            NESA
          </a>
          <a href=" https://www.education.vic.gov.au/school/teachers/teachingresources/discipline/science/Pages/learnteach.aspx">
            VIC department of education
          </a>

          <a href="https://www.khanacademy.org/">Khan Academy</a>
          <h3>Mathematics</h3>
          <a href="https://www.3blue1brown.com/">3 Blue 1 Brown</a>
          <a href="https://www.mathsisfun.com/">Math Is Fun</a>
          <h3>English</h3>
          <a href="https://www.matrix.edu.au/">Matrix</a>
          <h3>Various</h3>
          <a href="https://www.khanacademy.org/">Khan Academy</a>
          <a href="https://www.udemy.com/">Udemy</a>

          <h3>Youtube Channels</h3>
          <a href="https://www.youtube.com/@misterwootube">Eddie Woo</a>
          <a href="https://www.youtube.com/@TheOrganicChemistryTutor">
            The Organic Chemistry Tutor
          </a>
        </div>
      </div>
    </>
  );
  // return <div>
  //
  // </div>
};

export default Recommendations;
