import React, { useState, createContext } from "react";

export const FormsContext = createContext(null);

export const FormsProvider = ({ children }) => {
  const initialShippingForm = {
    givenName: "",
    surname: "",
    address: "",
    phoneNumber: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
  };

  const initialBillingForm = {
    givenName: "",
    surname: "",
    address: "",
    phoneNumber: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
  };

  const initialOrderForm = {
    givenName: "",
    surname: "",
    email: "",
    creditCard: "",
    expiration: "",
    orderedItems: "",
  };

  const [shippingForm, setShippingForm] = useState(initialShippingForm);
  const [billingForm, setBillingForm] = useState(initialBillingForm);
  const [orderForm, setOrderForm] = useState(initialOrderForm);

  const handleBillingFormChange = (value, name) => {
    setBillingForm({ ...billingForm, [name]: value });
  };

  const handleShippingFormChange = (value, name) => {
    setShippingForm({ ...shippingForm, [name]: value });
  };

  const handleOrderFormChange = (value, name) => {
    setOrderForm({ ...orderForm, [name]: value });
  };

  return (
    <FormsContext.Provider
      value={{
        shippingForm,
        setShippingForm,
        billingForm,
        setBillingForm,
        orderForm,
        setOrderForm,
        handleShippingFormChange,
        handleOrderFormChange,
        handleBillingFormChange,
        initialShippingForm,
        initialBillingForm,
        initialOrderForm,
      }}
    >
      {children}
    </FormsContext.Provider>
  );
};
