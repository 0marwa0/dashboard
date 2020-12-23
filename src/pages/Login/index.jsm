import styled from "styled-components";
import React from "react";
import { Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  width: 100%;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    grid-template-columns: auto;
  }
`;
const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20%;
  gap: 20px;
  width: 600px;
  margin: auto;
`;
const Logo = styled.img`
  width: 100px;
  margin: 0 auto;
`;
const ShortCat = styled.div`
  background-color: var(--lightGray);
  padding: 50px;
  display: flex;
  gap: 20px;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: var(--darkGray);
`;
const BoldText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

const LoginInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
class Index extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };
    return (
      <div>
        <PageWrapper>
          <LoginForm>
            <Logo src={require("../../public/images/Logo.png")} />
            <div>
              User Name{" "}
              <Input
                style={{
                  height: "50px",
                  borderRadius: "6px",
                  marginTop: "5px",
                }}
              />
            </div>

            <div>
              Password
              <Input
                style={{
                  height: "50px",
                  borderRadius: "6px",
                  marginTop: "5px",
                }}
              />
            </div>
            <div>
              <Link to="/Dashboard">
                <Button
                  style={{
                    backgroundColor: "var(--yellow)",
                    borderRadius: "5px",
                    border: "none",
                    display: "flex",
                    gap: "5px",
                    padding: "0 40%",
                    width: "100%",
                    alignItems: "center",

                    height: "50px",
                  }}
                >
                  Login
                </Button>
              </Link>
            </div>
            <LoginInfo>
              <div>
                <Checkbox /> Remember me
              </div>
              <u>Forgot Password?</u>
            </LoginInfo>
          </LoginForm>
          <ShortCat>
            <Slider ref={(slider) => (this.slider = slider)} {...settings}>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>

              <div>
                <img
                  src={require("../../public/images/Browser.png")}
                  style={{ width: "100%" }}
                />
                <BoldText>Trusted & certificated Dashboard System </BoldText>
                <p>
                  Turn your smartphone or tablet into powerful POS Manage sales
                  inventory and employees with ease; engage custommers increase
                  your revenue
                </p>{" "}
              </div>
            </Slider>
          </ShortCat>
        </PageWrapper>
      </div>
    );
  }
}

export default Index;
