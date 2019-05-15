<?php 

$obj = json_decode(file_get_contents('php://input'), true);

include("../data_conecta.php");

$connect = new Con();
$con = $connect->getCon();

$arquivo  = $obj['arquivo'];

$id_arquivo = $arquivo['id_arquivo'];
$nome = $arquivo['nome'];
$observacao = $arquivo['observacao'];

try{

	$con->beginTransaction();

	if (!empty($id_arquivo)) {

		$sql = "UPDATE tb_arquivo SET nome = '$nome', observacao = '$observacao' WHERE id_arquivo = $id_arquivo ";
		$stmt = $con->prepare($sql);
		$stmt->execute();

		echo "arquivo_alterado";

	}else{
		echo "nao_alterou";
	}

	$con->commit();

}catch(Exception $e){
	$con->rollback();
}

?>