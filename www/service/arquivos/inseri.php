<?php 

$obj = json_decode(file_get_contents('php://input'), true);

include("../data_conecta.php");

$connect = new Con();
$con = $connect->getCon();

$arquivo  = $obj['arquivo'];

$anexo = $arquivo['anexo'];
$nome = $arquivo['nome'];
$observacao = $arquivo['observacao'];


try{

	$con->beginTransaction();

	$sql = $con->exec("INSERT INTO tb_arquivo (nome, anexo, observacao) VALUES ('$nome', '$anexo', '$observacao')");

	if ($sql) {
		echo "arquivo_cadastrado";
	}else{
		echo "nao_cadastrou";
	}

	$con->commit();

}catch(Exception $e){
	$con->rollback();
	var_dump($e);
}

?>