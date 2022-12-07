import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: '#1a1a25',
    // border: '2px solid white',
    boxShadow: 24,
    color: "white",
    borderRadius: '5px',
    p: 4
};

export default function ProfileEmailVerify({ open, userRefetch, setOpenEmail, updateProfile, otpVerify, setError, handleVerifyEmail, minutes, seconds, otpCode, setOtpCode }) {


    const [isOtpError, setOtpError] = useState(false)

    const handleClose = () => setOpenEmail(false);


    // Re-send OTP states
    const [forEnable, setForEnable] = useState(false);
    const [againEnable, setAgainEnable] = useState(true);
    const [count, setCount] = useState(2);
    const [disabled, setDisabled] = useState(false);


    const hendelSubmit = (e) => {
        setCount(count - 1)
        e.preventDefault();
        if (otpVerify != otpCode) {
            return swal({
                title: "Warning",
                text: "Before updating please verify your email!",
                icon: "warning",
                button: "OK",
                dangerMode: true,
                className: "modal_class_success",
            });
        }
        else if (otpVerify == otpCode) {
            swal({
                text: "Email Verified and updated your profile.",
                icon: "success",
                button: "OK!",
                className: "modal_class_success",
            });
            updateProfile();
            handleClose();
            setOtpError(false)
            setError(false)
            handleClose(false)
            return;
        }
        if (count > 0) {
            let content2 = document.createElement("p");
            content2.innerHTML = 'You have entered wrong OTP. Please try again. You have another <br/><span style="color: #0d6efd;">0' + count + '</span> more tries .'
            swal({
                content: content2,
                icon: "warning",
                button: "OK!",
                className: "modal_class_success",
            });
        } else {
            setDisabled(true)
            swal({
                text: "You have entered wrong OTP, And you have no more tries left. You can request another OTP again",
                icon: "warning",
                button: "OK!",
                className: "modal_class_success",
            });
        }
        setError('Email OTP Code not matched')
        setOtpError(true)

    }

    const verifyAlert = () => {
        swal({
            text: "Please verify your email address before closing!",
            icon: "warning",
            button: "OK!",
            className: "modal_class_success",
        })
    }

    return (
        <div>
            <Modal
                open={open}
                P
                onClose={otpVerify == otpCode && handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="text-center"
            >
                <Box sx={style} id="">
                    <div className="closeD text-right p-1">
                        <Button
                            className="iconClose"
                            onClick={otpVerify == otpCode ? handleClose : verifyAlert}
                        >
                            <CloseIcon
                                className="iconClose"
                                style={{ color: "white", textAlign: "center" }}
                            />
                        </Button>
                    </div>
                    <Typography
                        id="modal-modal-title text-light"
                        className="text-light pt-1"
                        variant="h6"
                        component="h2"
                        align="left"
                    >
                        Verify Email test
                    </Typography>
                    <Typography id="modal-modal-description text-light" sx={{ mt: 2 }} style={{textAlign:"left"}}>
                        Check your email for OTP
                    </Typography>
                    <form className="d-flex input-group mt-2 mb-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="OTP code"
                            aria-label="OTP code !!"
                            aria-describedby="button-addon2"
                            onChange={(e) => setOtpCode(e.target.value)}
                        />
                        <button
                            disabled={disabled ? true : false}
                            className="btn btn-outline-secondary bg-danger text-light"
                            onClick={hendelSubmit}
                            type="submit"
                            id="button-addon2"
                        >
                            Verify
                        </button>
                    </form>

                    {isOtpError ? (
                        <p style={{ color: "red" }}>You have entered wrong OTP</p>
                    ) : (
                        ""
                    )}
                    <div className="d-flex" style={{ justifyContent: "center" }}>
                        <button
                            disabled={minutes == 0 && seconds == 0 ? false : true}
                            type="submit"
                            onClick={handleVerifyEmail}
                            className="submit banner-button2 font14 text-decoration-none p-2"
                            style={
                                minutes == 0 && seconds == 0
                                    ? { backgroundColor: "#007bff", color: "#fff" }
                                    : { backgroundColor: "#7b7b94", color: "#fff" }
                            }
                            id="font14"
                        >
                            Resend OTP
                        </button>
                    </div>
                    <div className="text-center text-white mt-3">
                        <span>{minutes}</span>:
                        <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
