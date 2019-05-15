<?php 

$obj = json_decode(file_get_contents('php://input'), true);

include("../data_conecta.php");

$connect = new Con();
$con = $connect->getCon();

try{

	$con->beginTransaction();

	$sql = $con->prepare("SELECT tb_arquivo. * FROM tb_arquivo WHERE tb_arquivo.deletado = 0");
	$sql->execute();

	$result_arq = $sql->fetchAll();

	echo json_encode($result_arq);

	$con->commit();

}catch(Exception $e){
	$con->rollback();
}

?>