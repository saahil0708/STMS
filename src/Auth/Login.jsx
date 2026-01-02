import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Checkbox,
  FormControlLabel,
  Link,
  Tabs,
  Tab,
  Snackbar
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useLogin } from '../Context/LoginContext';

// Styled components
const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: `
      linear-gradient(90deg, transparent 79px, #f0f0f0 79px, #f0f0f0 81px, transparent 81px),
      linear-gradient(#e0e0e0 1px, transparent 1px)
    `,
    backgroundSize: '100px 20px',
    backgroundPosition: '0 0, 0 0',
    opacity: 0.3,
    zIndex: 0
  }
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  borderRadius: 24,
  overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: 1200,
  minHeight: 700
}));

const LoginFormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  height: '100%'
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(4)
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 6,
    backgroundColor: '#f8f9fa',
    '&:hover': {
      backgroundColor: '#f1f3f5'
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#991b1b',
        borderWidth: 2
      }
    }
  },
  '& .MuiInputLabel-root': {
    color: '#6c757d',
    '&.Mui-focused': {
      color: '#991b1b'
    }
  }
}));

const LoadingButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 6,
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  position: 'relative',
  '&.MuiButton-contained': {
    background: 'linear-gradient(90deg, #991b1b 0%, #dc2626 100%)',
    '&:hover': {
      background: 'linear-gradient(90deg, #7a1515 0%, #b91c1c 100%)',
      boxShadow: '0 6px 20px rgba(153, 27, 27, 0.3)'
    }
  }
}));

const IllustrationContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    top: '-100px',
    right: '-100px'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    bottom: '-50px',
    left: '-50px'
  }
}));

const TrainIQLogin = () => {
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  useEffect(() => {
    // Check for login success or error messages from navigation state
    if (location.state && location.state.message && location.state.type === 'success') {
      setSnackbarMessage(location.state.message);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      window.history.replaceState({}, document.title);
    }

    // Check for logout success message from localStorage (handles redirect race conditions)
    const logoutMsg = localStorage.getItem('logoutMessage');
    if (logoutMsg) {
      setSnackbarMessage(logoutMsg);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      localStorage.removeItem('logoutMessage');
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRoleChange = (event, newValue) => {
    setRole(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password, role);

      console.log('Login successful, role:', role);

      // Redirect based on role
      switch (role) {
        case 'student':
          console.log('Navigating to student dashboard');
          navigate('/', { state: { message: 'Login Successful!', type: 'success' } });
          break;
        case 'trainer':
          navigate('/trainer', { state: { message: 'Login Successful!', type: 'success' } });
          break;
        case 'admin':
          navigate('/admin', { state: { message: 'Login Successful!', type: 'success' } });
          break;
        default:
          navigate('/', { state: { message: 'Login Successful!', type: 'success' } });
      }
    } catch (err) {
      console.error(err);
      setSnackbarMessage(err.message || 'Invalid Credentials!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Grid container>
          {/* Left Side - Login Form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <LoginFormContainer>
              <LogoContainer>
                <Box component="img" src={Logo} alt="TrainIQ" sx={{ width: 200, height: 'auto' }} />
              </LogoContainer>

              <Typography variant="h4" fontWeight={700} gutterBottom>
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={4}>
                Sign in to access your dashboard
              </Typography>

              <Tabs
                value={role}
                onChange={handleRoleChange}
                variant="fullWidth"
                sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
                TabIndicatorProps={{ style: { backgroundColor: '#991b1b' } }}
              >
                <Tab
                  label="Student"
                  value="student"
                  sx={{
                    textTransform: 'none',
                    fontWeight: role === 'student' ? 700 : 400,
                    color: role === 'student' ? '#991b1b' : 'inherit',
                    '&.Mui-selected': { color: '#991b1b' }
                  }}
                />
                <Tab
                  label="Trainer"
                  value="trainer"
                  sx={{
                    textTransform: 'none',
                    fontWeight: role === 'trainer' ? 700 : 400,
                    color: role === 'trainer' ? '#991b1b' : 'inherit',
                    '&.Mui-selected': { color: '#991b1b' }
                  }}
                />
                <Tab
                  label="Admin"
                  value="admin"
                  sx={{
                    textTransform: 'none',
                    fontWeight: role === 'admin' ? 700 : 400,
                    color: role === 'admin' ? '#991b1b' : 'inherit',
                    '&.Mui-selected': { color: '#991b1b' }
                  }}
                />
              </Tabs>



              <Box component="form" onSubmit={handleSubmit}>
                <StyledTextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="dense"
                  variant="outlined"
                  required
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined color="action" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="student@trainiq.com"
                  disabled={loading}
                />

                <StyledTextField
                  fullWidth
                  sx={{ mt: 2 }}
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  margin="dense"
                  variant="outlined"
                  required
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                          disabled={loading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Enter your password"
                  disabled={loading}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        disabled={loading}
                        sx={{
                          color: '#991b1b',
                          '&.Mui-checked': {
                            color: '#991b1b'
                          }
                        }}
                      />
                    }
                    label="Remember me"
                  />
                  <Link href="#" variant="body2" color="primary" sx={{ textDecoration: 'none' }}>
                    Forgot password?
                  </Link>
                </Box>

                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : null}
                  sx={{ mt: 3, color: 'white' }}
                  disableElevation
                  disableRipple
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </LoadingButton>

                <Typography variant="body2" align="center" sx={{ mt: 4, color: 'text.secondary' }}>
                  Don't have an account?{' '}
                  <Link href="#" color="primary" fontWeight={600} sx={{ textDecoration: 'none' }}>
                    Contact Administrator
                  </Link>
                </Typography>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                  </Typography>
                </Box>
              </Box>
            </LoginFormContainer>
          </Grid>

          {/* Right Side - Illustration/Graphics */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <IllustrationContainer sx={{ ml: { md: 12.75 }, height: '100%' }}>
              <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                {/* SVG Illustration */}
                <Box sx={{ mb: 4 }}>
                  <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 150C100 100 150 100 150 150C150 200 200 200 200 150C200 100 250 100 250 150C250 200 300 200 300 150"
                      stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="100" cy="150" r="12" fill="white" />
                    <circle cx="150" cy="150" r="12" fill="white" />
                    <circle cx="200" cy="150" r="12" fill="white" />
                    <circle cx="250" cy="150" r="12" fill="white" />
                    <circle cx="300" cy="150" r="12" fill="white" />
                    <path d="M50 100L350 100L325 50L75 50L50 100Z" fill="white" fillOpacity="0.2" />
                    <path d="M75 50L325 50L300 80L100 80L75 50Z" fill="white" fillOpacity="0.3" />
                    <rect x="100" y="80" width="200" height="20" rx="10" fill="white" fillOpacity="0.4" />
                    <circle cx="120" cy="90" r="4" fill="white" />
                    <circle cx="150" cy="90" r="4" fill="white" />
                    <circle cx="180" cy="90" r="4" fill="white" />
                    <circle cx="210" cy="90" r="4" fill="white" />
                    <circle cx="240" cy="90" r="4" fill="white" />
                    <circle cx="270" cy="90" r="4" fill="white" />
                  </svg>
                </Box>

                <Typography variant="h4" fontWeight={700} color="white" gutterBottom>
                  Student Training Platform
                </Typography>
                <Typography variant="body1" color="rgba(255, 255, 255, 0.8)" sx={{ maxWidth: 400, mx: 'auto', mb: 4 }}>
                  Access course materials, track your progress, submit assignments, and connect with instructors
                </Typography>

                {/* Features List */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'white', mr: 2 }} />
                    <Typography variant="body2">Interactive Course Materials</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'white', mr: 2 }} />
                    <Typography variant="body2">Progress Tracking Dashboard</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'white', mr: 2 }} />
                    <Typography variant="body2">Assignment Submission Portal</Typography>
                  </Box>
                </Box>
              </Box>
            </IllustrationContainer>
          </Grid>
        </Grid>
      </LoginCard>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ zIndex: 9999, marginTop: '20px' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage || error || 'Invalid Credentials!'}
        </Alert>
      </Snackbar>
    </LoginContainer>
  );
};

export default TrainIQLogin;