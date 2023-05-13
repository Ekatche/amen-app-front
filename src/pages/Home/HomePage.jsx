import React, { useContext, useState, useEffect } from "react";
import UserInfo from "../../components/My_account/myAccount";
import AuthContext from "../../context/AuthContext";
import HomeCarousel from "./Carousel";
import "./HomePage.css";
import prod_1 from "./img/prod_1.png";
import prod_2 from "./img/prod_2.png";
import prod_3 from "./img/prod_3.png";
import car_1 from "./img/car_1.jpg";
import car_2 from "./img/car_2.jpg";
import car_3 from "./img/car_3.jpg";
import homes_scent from "./img/home_scents.jpg";
import coffrets from "./img/coffrets.jpg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Mycard from "./MyCard";

import CustomCarousel from "./MultiImageCarousel";
import { Row, Col } from "react-bootstrap";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [key, setKey] = useState("Nouveautees");
  const [itemShowed, setitemShowed] = useState(3);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1000 && window.innerWidth > 768) {
      setitemShowed(2);
      setMobile(true);
    }
    if (window.innerWidth < 767) {
      setitemShowed(1);
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000 && window.innerWidth > 768) {
        setitemShowed(2);
        setMobile(true);
      } else if (window.innerWidth < 767) {
        setitemShowed(1);
        setMobile(true);
      } else {
        setitemShowed(3);
        setMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {user ? <UserInfo user={user} /> : null}
      <div className="container top-section">
        <HomeCarousel />
      </div>

      <div className="container middle-section">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          {/* NEW ITEMS  */}
          <Tab eventKey="Nouveautees" title="Nouveautées">
            <div className="middle-content">
              <div className={mobile ? "" : "new-bloc"}>
                {mobile ? (
                  <CustomCarousel show={itemShowed}>
                    <Mycard
                      img={prod_1}
                      id={1}
                      title="Card Title"
                      description="Some quick example text to build on the card title and
                        make up the bulk of the card's content."
                      btn="Go somewhere"
                    />

                    <Mycard
                      img={prod_2}
                      id={2}
                      title="Card Title"
                      description="Some quick example text to build on the card title and
                        make up the bulk of the card's content."
                      btn="Go somewhere"
                    />

                    <Mycard
                      img={prod_3}
                      id={3}
                      title="Card Title"
                      description="Some quick example text to build on the card title and
                        make up the bulk of the card's content."
                      btn="Go somewhere"
                    />
                  </CustomCarousel>
                ) : (
                  <>
                    <Mycard
                      img={prod_1}
                      id={1}
                      title="Card Title"
                      description="Some quick example text to build on the card title and
                        make up the bulk of the card's content."
                      btn="Go somewhere"
                    />

                    <Mycard
                      img={prod_2}
                      id={2}
                      title="Card Title"
                      description="Some quick example text to build on the card title and
                        make up the bulk of the card's content."
                      btn="Go somewhere"
                    />

                    <Mycard
                      img={prod_3}
                      id={3}
                      title="Card Title"
                      description="Some quick example text to build on the card title and
                        make up the bulk of the card's content."
                      btn="Go somewhere"
                    />
                  </>
                )}
              </div>
            </div>
          </Tab>

          {/* BEST SELLERS  */}
          <Tab eventKey="Best-Sellers" title="Best Sellers">
            {/* <MultiItemcarousel /> */}
            <CustomCarousel show={itemShowed}>
              <Mycard
                img={car_1}
                id={1}
                title="Card Title"
                description="Some quick example text to build on the card title and
                        make up the bulk of the card's content."
                btn="Go somewhere"
              />
              <Mycard
                img={car_2}
                id={2}
                title="Card Title"
                description="Some quick example text to build on the card title and
                        make up the bulk of the card's content."
                btn="Go somewhere"
              />
              <Mycard
                img={car_3}
                id={3}
                title="Card Title"
                description="Some quick example text to build on the card title and
                        make up the bulk of the card's content."
                btn="Go somewhere"
              />
              <Mycard
                img={car_3}
                id={4}
                title="Card Title"
                description="Some quick example text to build on the card title and
                        make up the bulk of the card's content."
                btn="Go somewhere"
              />
              <Mycard
                img={car_3}
                id={5}
                title="Card Title"
                description="Some quick example text to build on the card title and
                        make up the bulk of the card's content."
                btn="Go somewhere"
              />
            </CustomCarousel>
          </Tab>
        </Tabs>
      </div>
      <div className="container" style={{ "padding-top": "30px" }}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              paddingTop: "20px",
            }}
          >
            <h2> Decouverez </h2>
          </div>
        </div>
        <Row style={{ marginTop: "30px" }}>
          <Col>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  alt="Home scent"
                  src={homes_scent}
                  style={{ width: "70%" }}
                ></img>
              </div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "20px",
                }}
              >
                <h3> Home scent </h3>
                <div>
                  <p>lorem ipsun description</p>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "20px",
                }}
              >
                <span> Discover </span>
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  alt="Coffrets"
                  src={coffrets}
                  style={{ width: "70%" }}
                ></img>
              </div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "20px",
                }}
              >
                <h3> Coffrets </h3>
                <div>
                  <p>lorem ipsun description</p>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "20px",
                }}
              >
                <span> Discover </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
