import Row from "react-bootstrap/Row";
import "./EspacePersonnel.css";

export default function PersonalSpace() {
  return (
    <div className="tab-content">
      <div className="top-account">
        <div>
          <h3>welcome to account page</h3>
          <p> Compte client n° </p>
        </div>
      </div>
      <div className="clearfix wall flex_left account-info">
        <div className="col-md-6 col-xs-12 cell nopadding-xs">
          <div className="box box_btn">
            <div className="boxTitle"> Info perso </div>
            <div className="box-content">
              <p>
                Mr. Eliel KATCHE
                <br />
                204 Rue Marcel Cerdan
                <br />
                69009 Lyon FRANCE
              </p>
            </div>
            <menu>
              <a className={"accountBtn background-color1 btn-block"}>
                Modifier vos informations personnelles{" "}
              </a>
            </menu>
          </div>
        </div>
        <div className="col-md-6 col-xs-12 cell nopadding-xs">
          <div className="box box-btn">
            <div className="boxTitle"> Commandes </div>
            <div className="box-content">
              <p> fetch commandes </p>
            </div>
            <menu>
              <a className={"accountBtn background-color1 btn-block"}> Voir vos commandes </a>
            </menu>
          </div>
        </div>

        <div className="col-md-6 col-xs-12 cell nopadding-xs">
          <div className="box box-btn">
            <div className="boxTitle"> Compte fidélité </div>
            <div className="box-content">
              <p>fetch info pcopte fidélité</p>
            </div>
            <menu>
              <a className={"accountBtn background-color1 btn-block"}> Voir mon compte fidélité </a>
            </menu>
          </div>
        </div>
        <div className="col-md-6 col-xs-12 cell nopadding-xs">
          <div className="box box-btn">
            <div className="boxTitle"> Magasin </div>
            <div className="box-content">
              <p> fetch info magasin </p>{" "}
            </div>
            <menu>
              <a className={"accountBtn background-color1 btn-block"}> Enregistrer un magason </a>
            </menu>
          </div>
        </div>
      </div>
    </div>
  );
}
