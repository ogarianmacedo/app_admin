<?php 

$obj = json_decode(file_get_contents('php://input'), true);

include("../data_conecta.php");
$connect = new Con();
$con = $connect->getCon();

try{

	$con->beginTransaction();

	$sql = $con->prepare("SELECT tb_usuario. * FROM tb_usuario WHERE tb_usuario.deletado = 0");
	$sql->execute();

	$result_user = $sql->fetchAll();

	echo json_encode($result_user);

	$con->commit();

}catch(Exception $e){
	$con->rollback();
}

?>