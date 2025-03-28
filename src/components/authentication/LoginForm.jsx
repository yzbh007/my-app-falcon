import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Correct import
import { toast } from 'react-toastify';
import Divider from '@/components/common/Divider';
import SocialAuthButtons from '@/components/authentication/SocialAuthButtons';
import paths from '@/routes/paths';
import { useAppContext } from '@/hooks/useAppContext'; // Import context hook

// Removed forgotPasswordPaths as direct path usage is clearer
// const forgotPasswordPaths = {
//   simple: paths.forgotPassword,
// };

const LoginForm = ({ hasLabel = false }) => { // Removed layout prop if not used for path
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogin, setLoginUsername } = useAppContext(); // Get login handler from context

  // State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  // Handler
  const handleSubmit = async e => { // Make async if using await for API calls
    e.preventDefault();
    // --- TODO: Replace with actual API call ---
    // Example simulation:
    console.log('Simulating login for:', formData.email);
    const loginSuccessful = true; // Assume login is successful for now
    const username = formData.email.split('@')[0]; // Example username extraction

    if (loginSuccessful) {
      handleLogin(); // Update login state in context
      setLoginUsername(username); // Update username in context
      localStorage.setItem('username', username); // Persist username

      toast.success(`Logged in as ${formData.email}`, {
        theme: 'colored'
      });

      // Redirect logic
      const from = location.state?.from?.pathname || '/'; // Get intended destination or default to home
      navigate(from, { replace: true }); // Redirect after login

    } else {
      toast.error('Login failed. Please check your credentials.', {
        theme: 'colored'
      });
    }
    // --- End of TODO section ---
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
        />
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={e =>
                setFormData({
                  ...formData,
                  remember: e.target.checked
                })
              }
            />
            <Form.Check.Label className="mb-0 text-700">
              Remember me
            </Form.Check.Label>
          </Form.Check>
        </Col>

        <Col xs="auto">
          {/* Use direct path */}
          <Link className="fs-10 mb-0" to={paths.forgotPassword}>
            Forgot Password?
          </Link>
        </Col>
      </Row>

      <Form.Group>
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
          disabled={!formData.email || !formData.password}
        >
          Log in
        </Button>
      </Form.Group>

      <Divider className="mt-4">or log in with</Divider>

      <SocialAuthButtons />
    </Form>
  );
};

LoginForm.propTypes = {
  // layout: PropTypes.string, // Removed if not used
  hasLabel: PropTypes.bool
};

export default LoginForm;
