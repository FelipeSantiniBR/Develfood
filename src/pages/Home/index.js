import React from "react";
import Header from "../../components/Header";
import RatingStar from "../../components/rating";

class Home extends React.Component {
  state = {
    menuOpen: false,
    user: false,
  };

  componentDidMount() {
    const restaurante = JSON.parse(localStorage.getItem("restaurante"));

    this.setState({ user: restaurante });
  }

  render() {
    const { menuOpen, user } = this.state;
    console.log(user);
    return (
      <>
        <Header
          title="Home"
          toogleOpen={(isOpen) => {
            this.setState({ menuOpen: isOpen });
          }}
        />
        <div className={"container-home " + (menuOpen ? "menu-open" : "")}>
          {user && (
            <>
              <div className="user">
                <img
                  className="logoUser"
                  src={user.logoRestaurante}
                  alt="aaa"
                />
                <div className="user-text">
                  <h1 className="homeTitle">
                    Bem vindo {user.nomeRestaurante}!
                  </h1>
                  <span className="homeSubtitle">
                    Aqui você pode controlar os pedidos, pratos, dados e demais
                    atividades do seu restaurante, de forma fácil e rápida!
                  </span>
                </div>
              </div>
              <div className="rating">
                <div className="ratingStars">
                  <h3>Média Geral</h3>
                  <RatingStar />
                  <span className="avaliation">(300 avaliações)</span>
                </div>
                <div className="opinionText">
                  <h2 className="ratingTitle">
                    A opinião dos clientes importa !
                  </h2>
                  <span className="ratingText">
                    Aqui você pode verificar a média geral de satisfação dos
                    clientes que fizeram pedidos no seu restaurante.
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Home;
