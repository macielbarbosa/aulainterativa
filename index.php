<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta content= "Aula Interativa é um projeto da Escola de Ciências e Tecnologia da UFRN que visa descomplicar o Cálculo e a Álgebra Linear através de gráficos dinâmicos." name="description">
  <title>Aula Interativa</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
  <link href="css/template.css" rel="stylesheet" type="text/css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="template.js"></script>
  <style type="text/css">
    footer img{
      margin: 20px; 
      height: 40px;
    }
  </style>

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
<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $servername = "10.6.0.81";
    $dbname = "aulainterativa_db";
    $username = "aulainterativa";
    $password = "dbaula@!interativa#";
    /*$servername = "localhost";
    $dbname = "id1055645_aulainterativa";
    $username = "id1055645_macielbarbosa";
    $password = "mbs1994";*/

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
      echo "<script>alert('Desculpe! Tente novamente.')</script>";
    }
    else{
      $name = $_POST['name'];
      $email = $_POST['email'];
      $comment = $_POST['comment'];
      $date = date("Y-m-d H:i:s");
      $sql = "INSERT INTO feedback (nome, email, comentario, data) VALUES ('$name', '$email', '$comment', '$date')";
      if (mysqli_query($conn, $sql)) {
          echo "<div align='center' class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Obrigado $name!</strong> O seu feedback é muito importante para nós.</div>";
      } else {
          echo "Error: " . $sql . "<br>" . mysqli_error($conn);
      }

    mysqli_close($conn);
    }
  }
?>
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
  <div class="row">
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
  <div class="row">
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
  <h2>CÁLCULO</h2>
  <br>
  <div class="row">
    <div class="col-sm-4" align="middle">
      <a href="riemann-3d" class="thumbnail">
        <img src="imagens/icon-riemann.PNG">
      </a>
      <a href="riemann-3d">
        <h4>Integração dupla por Soma de Riemann</h4>
      </a>
    </div>
    <div class="col-sm-4" align="middle">
      <a href="projecao" class="thumbnail">
        <img src="imagens/icon-projecao.png">
      </a>
      <a href="projecao">
        <h4>Projeção de sólidos nos planos cartesianos</h4>
      </a>
    </div>
    <div class="col-sm-4" align="middle">
      <a href="fluxo" class="thumbnail">
        <img src="imagens/icon-fluxo.png">
      </a>
      <a href="fluxo">
        <h4>Fluxo através de um plano</h4>
      </a>
    </div>
  </div>
  <br>
  <div class="row">
    <div class="col-sm-2"></div>
    <div class="col-sm-4" align="middle">
      <a href="campo-vetorial" class="thumbnail">
        <img src="imagens/icon-campos-vetoriais.png">
      </a>
      <a href="campo-vetorial">
        <h4>Campo vetorial em movimento</h4>
      </a>
    </div>
    <div class="col-sm-4" align="middle">
      <a href="integral-linha" class="thumbnail">
        <img src="imagens/icon-integral-linha.PNG">
      </a>
      <a href="integral-linha">
        <h4>Integral de linha</h4>
      </a>
    </div>
  </div>
  <div class="col-sm-2"></div>
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
    <div class="col-sm-7">
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

<footer class="container-fluid text-center">
  <img src="../imagens/ect-logo.png">
  Escola de Ciências e Tecnologia - UFRN
  <img src="../imagens/ufrn-logo.png">
  <br><br>
  <a href="#myPage" title="Para início">
    <span class="glyphicon glyphicon-chevron-up"></span>
  </a>
  <br>
</footer>

</body>
</html>
