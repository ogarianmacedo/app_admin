<?php 

$obj = json_decode(file_get_contents('php://input'), true);

include("../data_conecta.php");
$connect = new Con();
$con = $connect->getCon();

$user = $obj['user'];

$nome = $user['nome'];
$email = $user['email'];
$usuario = $user['usuario'];
$senha = $user['senha'];
$imagem = $user['imagem'];

try{

	$con->beginTransaction();

	$sql = $con->exec("INSERT INTO tb_usuario (nome, email, usuario, senha, imagem) VALUES ('$nome', '$email', '$usuario', '$senha', '$imagem')");

	// echo "INSERT INTO tb_usuario (nome, email, usuario, senha, imagem) VALUES ('$nome', '$email', '$usuario', '$senha', '$imagem')";

	if($sql){
		echo "usuario_cadastrado";
	}else{
		echo "usuario_nao_cadastrado";
	}

	$con->commit();


}catch(Exception $e){
	$con->rollback();
	var_dump($e);
}

?>


