import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormInputs';
import Loader from '../components/Loader';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../redux/usersApiSlice';
import { setCredentials } from '../redux/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register,{isLoading}] = useRegisterMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userInfo} = useSelector((state)=>state.auth)

useEffect(() => {
  if(userInfo){
    navigate('/')
  }
  
}, [navigate,userInfo])


  

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        firstName,
        lastName,
        email,
        password
      }).unwrap()
      dispatch(setCredentials({...res}))
      toast.success('Registration Success')
      navigate('/login')
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }

   
  };
  return (
    <FormContainer>
      <h1 className='text-center text-2xl text-gray-700 font-bold'>User Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter last name'
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
     

        <button type='submit' 
           className='bg-blue-600 text-base font-bold text-white rounded-md px-8 py-2 mt-3'>
          Register
        </button>


        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account? <Link className='text-blue-500 text-base font-bold' to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;