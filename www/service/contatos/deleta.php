<?php 

$obj = json_decode(file_get_contents('php://input'), true);

include("../data_conecta.php");

$connect = new Con();
$con = $connect->getCon();

$id_contato = $obj['id_contato'];

try{

	$con->beginTransaction();

	$str = "UPDATE tb_contato SET deletado = 1 WHERE id_contato = $id_contato";
	$sql = $con->exec($str);

	if ($sql) {
		echo "contato_excluido";
	}else{
		echo "nao_excluido";
	}

	$con->commit();

}catch(Exception $e){
	$con->rollback();
}

?>