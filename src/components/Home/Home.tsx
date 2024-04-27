import { ReactNode, useEffect, useRef, useState } from "react";
import React from "react";

import { getQuestionsData, question } from "../Questions/QuestionsSource";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Home() {
  const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    

    if (storedName) {
      setUserName(storedName);
    } else {
      setShowModal(true); 
    }
  }, []);

  const handleUserNameChange = (e :any) => {
    setTempName(e.target.value); 
  };

  const handleSaveName = () => {
    setUserName(tempName);
    localStorage.setItem("userName", tempName); 
    setShowModal(false); 
  };

  return (
    <div className="main-content">
      <div className="d-grid gap-5">
        <div className="container-fluid">
          <div className="row d-flex justify-content-center align-items-center">
            <div
              className="col-4 mb-3 mt-5 p-0 card-user"
              style={{ minWidth: "240px", maxWidth: "540px" }}
            >
              <div className="row g-0">
                <div className="col-2 d-flex justify-content-center align-items-center">
                  <img
                    src="./caralouco.png"
                    style={{ maxWidth: "80px" }}
                    alt="Imagem"
                  />
                </div>
                <div className="col-6 card-user d-flex justify-content-center align-items-center">
                  <div className="card-body ">
                    <h5 className="card-title text-white">
                      {userName || "Digite seu nome"}
                    </h5>
                  </div>
                </div>
                <div className="col-4 card-points text-white d-flex flex-column justify-content-center align-items-center">
                  <FontAwesomeIcon
                    icon={faCoins}
                    style={{ color: "#FDD65F" }}
                  />
                  <p className="card-text">{localStorage.getItem("points") || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid d-flex justify-content-center align-items-center mt-5">
          <div className="circle-container">
            <div className="circle"></div>
            <p className="circle-text">Lambda Quiz</p>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Digite seu nome</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className="form-control"
            type="text"
            placeholder="Digite seu nome"
            value={tempName}
            onChange={handleUserNameChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
          <Button  style={{ backgroundColor: "#FF9A30"}} variant="primary" onClick={handleSaveName}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container-fluid d-flex justify-content-center align-items-center mt-5 mb-5">

        <Button
          style={{ backgroundColor: "#FF9A30", width: "30%" }}
          variant="primary"
          onClick={() => navigate("/categories")}
        >
          <h1>Jogar</h1>
        </Button>
      </div>
    </div>
  );
}

export default Home;
