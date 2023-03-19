import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./Footer.css";
import logoAmen from "./logo_without_background_192.png"
import {Image} from "react-bootstrap";
import {AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import {MdAlternateEmail} from "react-icons/md"

const Footer = () => {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div>
          <a href="/" className="me-4 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="/" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
        </div>
      </section>
      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Amen fragrance
                <Image src={logoAmen} alt={"amenLogo"} width={150}/>
              </h6>
              <p>
                One Body, one Family,
                Our goal is to share a message of Life, Faith,
                Courage and Ambition through the Love of Jesus Christ
              </p>
            </MDBCol>
            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                {" "}
                Aide & Information{" "}
              </h6>
              <p>
                <a href="#!" className="text-reset">
                  A propos d'Amen Fragrance
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Assistance
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Conditions
                </a>
              </p>
            </MDBCol>
            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                < AiOutlineMail className="me-3" /> adresse a définir
              </p>
              <p>
                <MdAlternateEmail className="me-3" /> email a definir
              </p>
              <p>
                < AiOutlinePhone className="me-3" /> + 01 234 567 88
              </p>
              <p>
                < AiOutlinePhone className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © {new Date().getFullYear()} Copyright:
        <a className="text-reset fw-bold" href="/admin">{" "}
          Eliel KATCHE
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
