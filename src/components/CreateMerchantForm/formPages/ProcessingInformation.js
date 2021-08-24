import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Button, Container, Modal } from "react-bootstrap";

// Import Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Iframe from "react-iframe";

// Import Fields
import renderCheckbox from "../../../fields/renderCheckbox";

// Import sychronous validation
import validate from "../validation/validate.js";
import warn from "../validation/warn.js";

// Import Initial Values
import initialFieldValues from "../initializeValues";

const ProcessingInformation = (props) => {
  const { handleSubmit, previousPage, pristine, submitting } = props;

  // Modal 1 - Merchant Agreement
  const [showSubmerchant, setShow] = useState(false);
  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const handleShowSubmerchant = (e) => {
    e.preventDefault();
    setShow(true);
  };
  // Modal 2 - Credit Agreement
  const [showCredit, setShowCredit] = useState(false);
  const handleCloseCredit = (e) => {
    e.preventDefault();
    setShowCredit(false);
  };
  const handleShowCredit = (e) => {
    e.preventDefault();
    setShowCredit(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container style={{ textAlign: "left", paddingTop: 20 }}>
        {props.state}
        <h2>Processing Information</h2>
        <div className="subtitle">
          Please review your application and accept the terms and conditions.
        </div>
        <br />
        <h4>Processing Rate</h4>
        <div>
          <FontAwesomeIcon color="#1A233B" icon="credit-card" /> 2.9% + $0.30
          per Credit Card Transfer
        </div>
        <div>
          <FontAwesomeIcon color="#1A233B" icon="money-check-alt" /> $0.50 per
          ACH Transfer
        </div>
        <br />
        <h4>Terms and Conditions</h4>
        <div className="small-text" style={{ paddingBottom: 5, paddingTop: 5 }}>
          <Field
            name="merchant_agreement_acceptance"
            type="checkbox"
            component={renderCheckbox}
            label=""
            style={{ marginRight: 5 }}
          />
          By submitting your merchant application, you agree to the{" "}
          <span onClick={handleShowSubmerchant} style={{ color: "blue" }}>
            Sub-Merchant Agreement
          </span>
          , and certify that all information you have provided is complete and
          corect. By selecting the "Submit Application" button, you are
          accepting and agreeing to the Sub-Merchant Agreement between you and
          Fattmerchant. You agree that your selecting “I Accept” is the legal
          equivalent of your manual signature to the Sub-Merchant Agreement, and
          that you consent to be legally bound by the Sub-Merchant Agreement.{" "}
        </div>
        <div
          className="small-text"
          style={{ paddingBottom: 15, paddingTop: 5 }}
        >
          <Field
            name="credit_check_allowed"
            type="checkbox"
            component={renderCheckbox}
            label=""
            style={{ marginRight: 5 }}
          />
          You further agree to provide written authorization to undergo a credit
          check as part of the{" "}
          <span onClick={handleShowCredit} style={{ color: "blue" }}>
            FCRA Permissible Purpose Guidelines.
          </span>
        </div>
        <div>
          <Button type="button" className="previous" onClick={previousPage}>
            Previous
          </Button>
          <Button type="submit" disabled={pristine || submitting}>
            Submit Merchant Application
          </Button>
        </div>

        <Modal
          show={showSubmerchant}
          //onHide={handleClose}
          size="lg"
          id="merchant_agreement_modal"
        >
          <Modal.Header
          //closeButton
          >
            <Modal.Title>Sub-Merchant Agreement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Iframe
              url="https://finix-hosted-content.s3.amazonaws.com/flex/v1/terms-and-conditions.html"
              width="100%"
            ></Iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showCredit}
          //onHide={handleCloseCredit}
          size="lg"
          id="credit_check_modal"
        >
          <Modal.Header
          //closeButton
          >
            <Modal.Title>Fair Credit Reporting Act</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Iframe
              url="https://finix-hosted-content.s3.amazonaws.com/flex/v1/credit-check-notice.html"
              width="100%"
            ></Iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="primary" onClick={handleCloseCredit}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Form>
  );
};

export default reduxForm({
  form: "createMerchantForm", // a unique identifier for this form
  initialValues: initialFieldValues,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
})(ProcessingInformation);
