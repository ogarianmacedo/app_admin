<?php 

$obj = json_decode(file_get_contents('php://input'), true);

include("../data_conecta.php");

$connect = new Con();
$con = $connect->getCon();

$evento = $obj['evento'];

$id_evento = $evento['id_evento'];
$titulo = $evento['titulo'];
$descricao = $evento['descricao'];
$imagem = $evento['imagem'];
$data_evento = $evento['data_evento'];
$situacao = $evento['situacao'];

try{

	$con->beginTransaction();

	if (!empty($id_evento)) {

		$sql = "UPDATE tb_evento SET titulo ='$titulo', descricao = '$descricao', imagem = '$imagem', data_evento = '$data_evento', situacao = '$situacao' WHERE id_evento = $id_evento";

		$stmt = $con->prepare($sql);
		$stmt->execute();

		echo "nevento_alterado";

	}else{
		echo "nao_alterou";
	}

	$con->commit();

}catch(Exception $e){
	$con->rollback();
}

?>