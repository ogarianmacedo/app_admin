<?php

$obj = json_decode(file_get_contents('php://input'), true);

include("../data_conecta.php");

$connect = new Con();
$con = $connect->getCon();

$id_usuario = $obj['id_usuario'];

try {
	$con->beginTransaction();

	$str = "UPDATE tb_usuario SET deletado = 1 WHERE id_usuario = $id_usuario";
	$sql = $con->exec($str);

	if ($sql) {
		echo "usuario_excluido";
	} else {
		echo "nao_excluido";
	}

	$con->commit();
} catch (Exception $e) {
	$con->rollback();
}
