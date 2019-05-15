<?php 

$obj = json_decode(file_get_contents('php://input'), true);

include('../data_conecta.php');

$connect = new Con();
$con = $connect->getCon();

$evento = $obj['evento'];

$titulo = $evento['titulo'];
$descricao = $evento['descricao'];
$imagem = $evento['imagem'];
$data_evento = $evento['data_evento'];
$situacao = $evento['situacao'];

try{

	$con->beginTransaction();

	$sql = $con->exec("INSERT INTO tb_evento (titulo, descricao, imagem, data_evento, situacao) VALUES ('$titulo', '$descricao', '$imagem', '$data_evento', '$situacao')");	

	if ($sql) {
		echo "evento_cadastrado";
	}else{
		echo "nao_cadastrou";
	}

	$con->commit();

}catch(Exception $e){
	$con->rollback();
	var_dump($e);
}

?>