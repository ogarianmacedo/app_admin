<?php 
// Conexao local
// $host = "localhost";
// $user= "root";
// $pass = "";
// $dbname = "exercicio_app_admin_db";
// $conn = new mysqli($host, $user, $pass, $dbname);


// Conexao online
$host = "localhost";
$user = "id7826102_upapp";
$pass = "omen2014";
$dbname = "id7826102_upapp";
$conn = new mysqli($host, $user, $pass, $dbname);

if($conn->connect_error){
	die("Erro na conexão");
}

?>