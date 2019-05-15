<?php 

$obj = json_decode(file_get_contents('php://input'), true);

include("../data_conecta.php");

$connect = new Con();
$con = $connect->getCon();

$user = $obj['user'];

$id_usuario = $user['id_usuario'];
$nome = $user['nome'];
$email = $user['email'];
$usuario = $user['usuario'];
$senha = $user['senha'];
$imagem = $user['imagem'];

try{

	$con->beginTransaction();

	if(!empty($id_usuario)){

		$sql = "UPDATE tb_usuario SET nome = '$nome', email = '$email', usuario = '$usuario', senha = '$senha', imagem = '$imagem' WHERE id_usuario = $id_usuario";		

		$stmt = $con->prepare($sql);
		$stmt->execute();

		echo "usuario_alterado";

	}else{
		echo "nao_alterado";
	}

	$con->commit();

}catch(Excption $e){
	$con->rollback();
}

?>