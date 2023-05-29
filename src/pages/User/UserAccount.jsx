import Container from "react-bootstrap/Container";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import "./UserAccount.css";
import PersonalSpace from "../../components/User/UserAccount/EspacePersonnel";
import PersonalInformations from "../../components/User/PersonalInfo/PersonalInfo";
import UserOrders from "../../components/User/Orders/UserOrders";
import UserInvoices from "../../components/User/Invoices/UserInvoices";
import UserLikes from "../../components/User/Likes/UserLikes";
import { Usercart } from "../../components/User/ShoppingCart/Usercart";

export default function UserAccount() {
  const [active, setActive] = useState("account_main");

  return (
    <Container className="mt-3">
      <Row>
        <Col xs lg="3" className="tab-nav">
          <Tab.Container id="left-tabs" defaultActiveKey="first">
            <Nav className="col tab-elements">
              {/* <Col> */}
                <div
                  className={
                    active === "account_main"
                      ? "row tab-sections selected"
                      : "row tab-sections"
                  }
                  onClick={(event) => setActive(event.target.id)}
                >
                  <a href="#" id="account_main">
                    Mon espace personnel
                  </a>
                </div>
                <div
                  className={
                    active === "account_perso"
                      ? "row tab-sections selected"
                      : "row tab-sections"
                  }
                  onClick={(event) => setActive(event.target.id)}
                >
                  <a href="#" id="account_perso">
                    Mes informations personnelles
                  </a>
                </div>
                <div
                  className={
                    active === "account_orders"
                      ? "row tab-sections selected"
                      : "row tab-sections"
                  }
                  onClick={(event) => setActive(event.target.id)}
                >
                  <a href="#" id="account_orders">
                    Mes commandes
                  </a>
                </div>
                <div
                  className={
                    active === "account_invoices"
                      ? "row tab-sections selected"
                      : "row tab-sections"
                  }
                  onClick={(event) => setActive(event.target.id)}
                >
                  <a href="#" id="account_invoices">
                    Mes factures
                  </a>
                </div>
                <div
                  className={
                    active === "account_likes"
                      ? "row tab-sections selected"
                      : "row tab-sections"
                  }
                  onClick={(event) => {
                    return setActive(event.target.id);
                  }}
                >
                  <a href="#" id="account_likes">
                    Mes favoris
                  </a>
                </div>
                <div
                  className={
                    active === "account_contact"
                      ? "row tab-sections selected"
                      : "row tab-sections"
                  }
                  onClick={(event) => setActive(event.target.id)}
                >
                  <a href="#" id="account_contact">
                    Nous contacter
                  </a>
                </div>
              {/* </Col> */}
            </Nav>
          </Tab.Container>
        </Col>
        <section className="col-xs-12 col-sm-8 col-md-9">
          
            {active === "account_main" && (
              <div className="" id={"target-account_main"}>
                <PersonalSpace />
              </div>
            )}
            {active === "account_perso" && (
              <div className="" id={"target-account_perso"}>
                <PersonalInformations />
              </div>
            )}
            {active === "account_orders" && (
              <div className="" id={"target-account_orders"}>
                <UserOrders />
              </div>
            )}
            {active === "account_invoices" && (
              <div className="" id={"target-account_invoices"}>
                <UserInvoices />
              </div>
            )}
            {active === "account_likes" && (
              <div className="" id={"target-account_likes"}>
                <UserLikes />
              </div>
            )}

        </section>
      </Row>
    </Container>
  );
}
