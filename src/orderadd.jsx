import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

function Orderadd() {
    const pri = JSON.parse(localStorage.getItem('totalAmount'));
    
    const [costumerName, setCostumerName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const nav = useNavigate();

    const addProduct = async () => {
        if (!costumerName || !address || !email || !phoneNumber || !totalAmount) {
            setError(true);
            setErrorMessage('Please fill in all fields.');
            return;
        }

       try{ let userId;
        const id = JSON.parse(localStorage.getItem('user')).user._id;
        userId = id;

        let result = await fetch(`https://e-commerce-api-peach.vercel.app/addorder`, {
            method: "POST",
            body: JSON.stringify({ costumerName, address, email, phoneNumber, totalAmount, userId }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        if (result) {
            nav('/buynow');
        }}
        catch (error) {
            console.error("Error order add :", error);
        }
        // console.warn(result);
    };

    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardType, setCardType] = useState('');
    const [upiNumber, setUpiNumber] = useState('');
  
    const handlePaymentMethodChange = (e) => {
      setPaymentMethod(e.target.value);
    };
  
    const handleCardNumberChange = (e) => {
      setCardNumber(e.target.value);
    };
  
    const handleCardTypeChange = (e) => {
      setCardType(e.target.value);
    };
  
    const handleUpiNumberChange = (e) => {
      setUpiNumber(e.target.value);
    };
  
    const makePayment = async () => {
      if (paymentMethod === 'card') {
        if (!cardNumber ||!cardType) {
          setError(true);
          setErrorMessage('Please enter card number and type');
          return;
        }
      } else if (paymentMethod === 'upi') {
        if (!upiNumber) {
          setError(true);
          setErrorMessage('Please enter UPI number');
          return;
        }
      }
  
      // Make API call to process payment
      let result = await fetch(`https://e-commerce-api-peach.vercel.app/makepayment`, {
        method: "POST",
        body: JSON.stringify({ paymentMethod, cardNumber, cardType, upiNumber, pri }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result) {
        nav('/buynow');
      }
      console.warn(result);
    };
  
    return (
        <>
        <Container>
            <h1>Billing Info</h1>
            <Form>
                {error && <Alert variant="danger">{errorMessage}</Alert>}
                
                <Form.Group className="mb-3">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Customer Name"
                        onChange={(e) => { setCostumerName(e.target.value) }} 
                        value={costumerName}
                        isInvalid={error && !costumerName}
                    />
                    <Form.Control.Feedback type="invalid">
                        Enter valid customer name
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Address" 
                        onChange={(e) => { setAddress(e.target.value) }} 
                        value={address}
                        isInvalid={error && !address}
                    />
                    <Form.Control.Feedback type="invalid">
                        Enter valid address
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter Email" 
                        onChange={(e) => { setEmail(e.target.value) }} 
                        value={email}
                        isInvalid={error && !email}
                    />
                    <Form.Control.Feedback type="invalid">
                        Enter valid email
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter Phone Number" 
                        onChange={(e) => { setPhoneNumber(e.target.value) }} 
                        value={phoneNumber}
                        isInvalid={error && !phoneNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                        Enter valid phone number
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Total Amount</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter Total Amount" 
                        onChange={(e) => { setTotalAmount(e.target.value) }} 
                        value={pri}
                        isInvalid={error && !totalAmount}
                    />
                    <Form.Control.Feedback type="invalid">
                        Enter valid total amount
                    </Form.Control.Feedback>
                </Form.Group>

                {/* <p>Pay amount ${pri}</p> */}

            </Form>
        </Container>
        <Container>
      <h1>Payment Gateway</h1>
      <Form>
        {error && <Alert variant="danger">{errorMessage}</Alert>}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select value={paymentMethod} onChange={handlePaymentMethodChange}>
                <option value="">Select Payment Method</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="cod">COD</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {paymentMethod === 'card' && (
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Card Number"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Card Type</Form.Label>
                <Form.Select value={cardType} onChange={handleCardTypeChange}>
                  <option value="">Select Card Type</option>
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="americanexpress">American Express</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        )}
        {paymentMethod === 'upi' && (
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>UPI Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter UPI Number"
                  value={upiNumber}
                  onChange={handleUpiNumberChange}
                />
              </Form.Group>
            </Col>
          </Row>
        )}
        {/* <Button variant="primary" onClick={makePayment}>Pay Now</Button>    */}
                     <Button variant="primary" onClick={addProduct}>Add Order</Button>

      </Form>
    </Container>
        </>
    );
}

export default Orderadd;