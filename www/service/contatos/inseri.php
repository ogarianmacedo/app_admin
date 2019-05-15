<?php 

$obj = json_decode(file_get_contents('php://input'), true);

include("../data_conecta.php");
$connect = new Con();
$con = $connect->getCon();

$contato = $obj['contato'];

$nome = $contato['nome'];
$email = $contato['email'];
$telefone = $contato['telefone'];

try{

	$con->beginTransaction();

	$sql = $con->exec("INSERT INTO tb_contato (nome, email, telefone) VALUES ('$nome', '$email', '$telefone')");


	if($sql){
		echo "contato_cadastrado";
	}else{
		echo "nao_cadastrado";
	}

	$con->commit();


}catch(Exception $e){
	$con->rollback();
	var_dump($e);
}

?>
