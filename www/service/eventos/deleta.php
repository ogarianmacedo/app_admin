<?php 

$obj = json_decode(file_get_contents('php://input'), true);

include("../data_conecta.php");

$connect = new Con();
$con = $connect->getCon();

$id_evento = $obj['id_evento'];

try{

	$con->beginTransaction();

	$str = "UPDATE tb_evento SET deletado = 1 WHERE id_evento = $id_evento";
	$sql = $con->exec($str);

	if($sql){
		echo "evento_excluido";
	}else{
		echo "nao_excluiu";
	}

	$con->commit();

}catch(Exception $e){
	$con->rollback();
}

?>