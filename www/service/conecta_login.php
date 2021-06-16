<?php
// Conexao 
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "app_admin_db";
$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
	die("Erro na conexão");
}
