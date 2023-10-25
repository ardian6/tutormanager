import { useParams } from "react-router-dom";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { Box, Button } from "@mui/material";
import "./Payment.css";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const param = useParams();
    const userName = param.username;
    const navigate = useNavigate();
    return (<div>
        <Button variant="" onClick={() => {
            navigate('/dashboard');
        }}>
            Back
        </Button>
        <h2>Enter your payment details</h2>
        <Box sx={{ display: "flex", flexWrap: "wrap"}} className="inputBox">
            <div>
                <InputLabel htmlFor="Booking description">
                    Cardholder Name
                </InputLabel>
                <Input
                    id="Name"
                    onChange={(event) => {}}
                />
            </div>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }} className="inputBox">
            <div sx={{padding: '50px'}}>
                <InputLabel htmlFor="Booking description">
                    Card Number
                </InputLabel>
                <Input
                    id="Card Number"
                    onChange={(event) => {}}
                />
            </div>
        </Box>
        <Box className="inputBox2">
            <div>
                <InputLabel htmlFor="Booking description">
                    Expiry Date
                </InputLabel>
                <Input
                    id="Expiry Date"
                    onChange={(event) => {}}
                />
            </div>
            <div>
                <InputLabel htmlFor="Booking description">
                    CVV
                </InputLabel>
                <Input
                    id="CVV"
                    onChange={(event) => {}}
                />
            </div>
        </Box>
            <div>
                <Button variant="outlined">
                    Process Payment
                </Button>
            </div>
    </div>)
}

export default Payment;