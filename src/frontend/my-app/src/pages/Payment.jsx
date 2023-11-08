import { useParams } from "react-router-dom";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { Box, Button } from "@mui/material";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Payment = () => {
  const param = useParams();
  const userName = param.username;
  const navigate = useNavigate();

  return (
    <>
      <NavBar></NavBar>
      <div className="payment-container">
        <div className="payment-box">
          <Button
            variant=""
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Back
          </Button>
          <h2>Enter your payment details</h2>
          <Box sx={{ display: "flex", flexWrap: "wrap" }} className="inputBox">
            <div>
              <InputLabel>Cardholder Name</InputLabel>
              <Input id="Name" onChange={(event) => {}} />
            </div>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }} className="inputBox">
            <div sx={{ padding: "50px" }}>
              <InputLabel>Card Number</InputLabel>
              <Input id="Card Number" onChange={(event) => {}} />
            </div>
          </Box>
          <Box className="inputBox2">
            <div>
              <InputLabel>Expiry Date</InputLabel>
              <Input id="Expiry Date" onChange={(event) => {}} />
            </div>
            <div>
              <InputLabel>CVV</InputLabel>
              <Input id="CVV" onChange={(event) => {}} />
            </div>
          </Box>
          <div>
            <Button variant="outlined">Process Payment</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
