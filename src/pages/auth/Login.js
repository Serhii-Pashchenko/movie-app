import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/reducers/auth/ActionCreators';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RouteNames } from '../../components/AppRouter';

const Login = () => {
  const { user, error } = useAppSelector((state) => state.authReducer);
  const [redirect, setRedirect] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && redirect) {
      console.log('LOGIN', user, redirect);
      setRedirect(false);
      navigate(RouteNames.USERS);
    }
  }, [navigate, redirect, user]);

  const onFinish = (values) => {
    dispatch(loginUser({ email: values.email, password: values.password }));
    setRedirect(true);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={onFinish}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" required />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>

            {error && <p>{error}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
