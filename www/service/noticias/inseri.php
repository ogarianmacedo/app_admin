<?php 

$obj = json_decode(file_get_contents('php://input'), true);

include('../data_conecta.php');

$connect = new Con();
$con = $connect->getCon();

$noticia = $obj['noticia'];

$titulo = $noticia['titulo'];
$descricao = $noticia['descricao'];
$imagem = $noticia['imagem'];
$data_criacao = $noticia['data_criacao'];

try{

	$con->beginTransaction();

	$sql = $con->exec("INSERT INTO tb_noticia (titulo, descricao, imagem, data_criacao) VALUES ('$titulo', '$descricao', '$imagem', NOW())");

	if ($sql) {
		echo "noticia_cadastrada";
	}else{
		echo "nao_cadastrou";
	}

	$con->commit();

}catch(Exception $e){
	$con->rollback();
	var_dump($e);
}

?>