<?php

$obj = json_decode(file_get_contents('php://input'), true);

include("../data_conecta.php");

$connect = new Con();
$con = $connect->getCon();

$noticia = $obj['noticia'];

$id_noticia = $noticia['id_noticia'];
$titulo = $noticia['titulo'];
$descricao = $noticia['descricao'];
$imagem = $noticia['imagem'];
$data_editado = $noticia['data_editado'];

try {
	$con->beginTransaction();

	if (!empty($id_noticia)) {
		$sql = "UPDATE tb_noticia SET titulo ='$titulo', descricao = '$descricao', imagem = '$imagem', data_editado = NOW() WHERE id_noticia = $id_noticia";
		$stmt = $con->prepare($sql);
		$stmt->execute();

		echo "noticia_alterada";
	} else {
		echo "nao_alterou";
	}

	$con->commit();
} catch (Exception $e) {
	$con->rollback();
}
