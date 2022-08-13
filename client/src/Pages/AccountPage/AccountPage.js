import styled from "styled-components";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AccountPage = () => {
  return (
    <Wrapper>
      <SignInForm />
      <SignUpForm />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 900px;
  justify-content: space-between;
  margin: 30px auto;
`;
export default AccountPage;
