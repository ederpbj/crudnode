const Jumbotron = ReactBootstrap.Jumbotron;
const Button = ReactBootstrap.Button;

const App = () => {
  return (
    <Jumbotron>
      <h1>Olá!</h1>
      <p>
        Este é um exemplo do Componente Jumbotron construído com o
        React-Boostrap!
      </p>
      <p>
        <Button bsStyle="primary">Aprenda mais!</Button>
      </p>
    </Jumbotron>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));