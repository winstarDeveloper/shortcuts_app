import React from "react";
import { Form, Button } from "react-bootstrap";

const Feedback = () => {
  return (
    <div class="col-3-of-4">
      <h1 class="feedback__title">Feedback </h1>
      <div class="feedback__form">
        <Form>
          <Form.Group controlId="formBasicText">
            <Form.Label>Name: </Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address: </Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea">
            <Form.Label>Your Feedback here: </Form.Label>
            <Form.Control as="textarea" rows="5" />
          </Form.Group>
          <Button variant="outline-secondary">Clear</Button>
          {"\t"}
          <Button class="feedback__btn" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Feedback;
