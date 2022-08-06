import styled from "styled-components";

const ShippingMethod = ({ setShippingMethod }) => {
  const handleShipping = (ev) => {
    const shippingCost = ev.target.value;
    setShippingMethod(shippingCost);
  };

  return (
    <div>
      <h4>SHIPPING METHOD</h4>
      <hr />
      <Radio>
        <div>
          <input
            type="radio"
            id="standard"
            name="shipping"
            value="0.00"
            onChange={handleShipping}
            required
          />
          <label htmlFor="standard">$0.00 | 4 - 5 days | Standard</label>
        </div>
        <div>
          <input
            type="radio"
            id="priority"
            name="shipping"
            value="10.00"
            onChange={handleShipping}
          />
          <label htmlFor="standard">$10.00 | 2 days | Priority</label>
        </div>
      </Radio>
    </div>
  );
};

const Radio = styled.div`
  display: flex;
  flex-direction: column; ;
`;

export default ShippingMethod;
