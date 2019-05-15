<?php 

$obj = json_decode(file_get_contents('php://input'), true);

include("../data_conecta.php");

$connect = new Con();
$con = $connect->getCon();

$id_arquivo = $obj['id_arquivo'];

try{

	$con->beginTransaction();

	$str = "UPDATE tb_arquivo SET deletado = 1 WHERE id_arquivo = $id_arquivo";
	$sql = $con->exec($str);

	if ($sql) {
		echo "arquivo_excluido";
	}else{
		echo "nao_excluiu";
	}

	$con->commit();

}catch(Exception $e){
	$con->rollback();
}

?>