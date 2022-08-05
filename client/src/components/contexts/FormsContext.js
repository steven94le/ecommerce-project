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

  const initialOrderForm = {
    givenName: "",
    surname: "",
    email: "",
    creditCard: "",
    expiration: "",
    orderedItems: [],
  };

  const [shippingForm, setShippingForm] = useState(initialShippingForm);
  const [orderForm, setOrderForm] = useState(initialOrderForm);

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
        orderForm,
        setOrderForm,
        handleShippingFormChange,
        handleOrderFormChange,
      }}
    >
      {children}
    </FormsContext.Provider>
  );
};
