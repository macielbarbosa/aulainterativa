<!DOCTYPE html>
<html lang="pt-br">
<head>
  <title>Aula Interativa</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
  <link href="css/template.css" rel="stylesheet" type="text/css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="javascript/template.js"></script>

</head>
<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60">

<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand navbar-logo" href="#myPage">Aula Interativa</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#sobre">SOBRE</a></li>
        <li><a href="#algebra-linear">ÁLGEBRA LINEAR</a></li>
        <li><a href="#calculo">CÁLCULO</a></li>
        <li><a href="#contato">CONTATO</a></li>
      </ul>
    </div>
  </div>
</nav>

<div class="jumbotron text-center">
  <h1>Aula Interativa</h1> 
  <p>Uma maneira diferente e intuitiva de aprender</p> 
  <nav class="navbar">
    <a href="#algebra-linear"><button type="button" class="btn btn-danger">Começar</button></a>
  </nav>
</div>

<div id="sobre" class="container-fluid">
  <div class="row">
    <div class="col-sm-8">
      <h2>Sobre Aula Interativa</h2><br>
      <h4>Projeto em desenvolvimento que visa auxiliar estudantes das disciplinas de Álgebra Linear e Cálculo, com ênfase nos temas de difícil compreensão, facilitando sua visualização na prática.</h4><br>
      <p>Projeto do professor Hector Carrion (ECT/UFRN), desenvolvido por Maciel Barbosa (aluno do curso de Ciências e Tecnologia da UFRN).</p>
    </div>
  </div>
</div>

<div id="algebra-linear" class="container-fluid text-center bg-grey">
  <h2>ÁLGEBRA LINEAR</h2>
  <br>
  <div class="row slideanim">
    <div class="col-sm-4" align="middle">
      <a href="independencia-linear" class="thumbnail">
        <img src="imagens/icon-independencia.png">
      </a>
      <a href="independencia-linear">
        <h4>Independência Linear</h4>
      </a>
    </div>
    <div class="col-sm-4" align="middle">
      <a href="rotacao-de-vetores" class="thumbnail">
        <img src="imagens/icon-rotacao.png">
      </a>
      <a href="rotacao-de-vetores">
        <h4>Rotação de vetores</h4>
      </a>
    </div>
    <div class="col-sm-4" align="middle">
      <a href="operadores-lineares" class="thumbnail">
        <img src="imagens/icon-operadores.png">
      </a>
      <a href="operadores-lineares">
        <h4>Operadores Lineares</h4>
      </a>
    </div>
  </div>
  <br>
  <div class="row slideanim">
    <div class="col-sm-2"></div>
    <div class="col-sm-4" align="middle">
      <a href="secoes-conicas" class="thumbnail">
        <img src="imagens/icon-conicas.png">
      </a>
      <a href="secoes-conicas">
        <h4>Seções Cônicas</h4>
      </a>
    </div>
    <div class="col-sm-4" align="middle">
      <a href="intersecao-quadricas" class="thumbnail">
        <img src="imagens/icon-intersecao.PNG">
      </a>
      <a href="intersecao-quadricas">
        <h4>Interseção de planos cartesianos com quádricas</h4>
      </a>
    </div>
    <div class="col-sm-2"></div>
  </div>
  <br><br>
</div>

<div id="calculo" class="container-fluid text-center">
  <h2>CÁLCULO</h2><br>
  <h4>Em breve</h4>
</div>

<div id="contato" class="container-fluid bg-grey">
  <h2 class="text-center">CONTATO</h2>
  <div class="row">
    <div class="col-sm-5">
      <h4>Envie-nos o seu feedback</h4>
      <p><span class="glyphicon glyphicon-map-marker"></span> Campus Universitário UFRN, s/n - Lagoa Nova, 59078-970, Natal/RN - Brasil </p>
      <p><span class="glyphicon glyphicon-envelope"></span> hectors@ect.ufrn.br</p>
    </div>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
    <div class="col-sm-7 slideanim">
      <div class="row">
        <div class="col-sm-6 form-group">
          <input class="form-control" input type="text" name="name" placeholder="Nome" required>
        </div>
        <div class="col-sm-6 form-group">
          <input class="form-control" name="email" placeholder="E-mail" type="email" required>
        </div>
      </div>
      <textarea class="form-control" name="comment" placeholder="Comentário" rows="5" required></textarea><br>
      <div class="row">
        <div class="col-sm-12 form-group">
          <button class="btn btn-default pull-right" type="submit" name="submit" value="Submit">Enviar</button>
        </div>
      </div>
    </div>
    </form>
  </div>
</div>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST"){
  $servername = "localhost";
  $dbname = "id1055645_aulainterativa";
  $username = "id1055645_macielbarbosa";
  $password = "mbs1994";

  // Create connection
  $conn = mysqli_connect($servername, $username, $password, $dbname);
  // Check connection
  if (!$conn) {
    echo "<script>alert('não conectado')</script>";
  }
  else{
    echo "<script>alert('conectado')</script>";
    /*$sql = "INSERT INTO MyGuests (firstname, lastname, email)
    VALUES ('John', 'Doe', 'john@example.com')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }*/

  mysqli_close($conn);
  }
  }
?>

<footer class="container-fluid text-center">
  <a href="#myPage" title="To Top">
    <span class="glyphicon glyphicon-chevron-up"></span>
  </a>
  <br>
</footer>

</body>
</html>
