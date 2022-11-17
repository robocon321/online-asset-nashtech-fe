import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box, { BoxProps } from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const theme = createTheme({
        palette: {
            neutral: {
                main: "#1976d2",
                contrastText: '#fff',
            },
        },
    });

    const handleCancel = (event, reason) => {
        if (reason === "backdropClick") {
            console.log(reason);
        } else {
            props.setOpen(false);
            setValues({
                password: '',
                showPassword: false,
                newPassword: '',
                showNewPassword: false,
            });
            setError({
                errorPassword: false,
            });
        }
    };

    const handleBackdropClick = (event) => {
        event.stopPropagation();
        return false;
    };


    const [errors, setError] = React.useState({
        errorPassword: false,
    });


    //This button is Demo Error in this task
    //Will change later in right function in Integrate task
    const handleSave = () => {
        setError({
            ...errors,
            errorPassword: !errors.errorPassword,
        });
        console.log(errors.errorPassword);
    };

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
        newPassword: '',
        showNewPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowNewPassword = () => {
        setValues({
            ...values,
            showNewPassword: !values.showNewPassword,
        });
    };

    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCancel}
            onBackdropClick={handleBackdropClick}
            disableEscapeKeyDown
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Change password"}</DialogTitle>
            <DialogContent sx={{ pb: 0 }}>
                <Box
                    sx={{
                        width: '20vw',
                        height: 'auto',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        flexDirection: 'column',
                        borderRadius: 1,
                    }}
                >
                    <FormControl sx={{ m: 0, mt: 1, mb: 0.5, width: '100%' }} variant="outlined" error={errors.errorPassword ? true : false}
                        id={errors.errorPassword ? "outlined-error-helper-text" : "outlined-adornment-password"}>
                        <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                        <OutlinedInput
                            sx={{ width: '100%' }}
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        color={errors.errorPassword ? "error" : ""}
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Old Password"

                        />
                    </FormControl>
                    {errors.errorPassword ? <Alert severity="error" sx={{
                        width: '90%', py: 1, px: '5%'
                    }} >
                        Password is incorrect
                    </Alert> : <></>}
                    <FormControl sx={{ m: 0, mt: 2, mb: 5, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                        <OutlinedInput
                            sx={{ width: '100%' }}
                            id="outlined-adornment-password"
                            type={values.showNewPassword ? 'text' : 'password'}
                            value={values.newPassword}
                            onChange={handleChange('newPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowNewPassword}
                                        onMouseDown={handleMouseDownNewPassword}
                                        edge="end"
                                    >
                                        {values.showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="New Password"
                        />
                    </FormControl> </Box>
            </DialogContent>
            <ThemeProvider theme={theme}>
                <DialogActions>
                    <Button onClick={handleSave} disabled={values.password && values.newPassword ? false : true} color="neutral" variant="contained">Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </ThemeProvider>
        </Dialog>
    );
}