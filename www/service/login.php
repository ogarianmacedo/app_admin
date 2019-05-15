<?php 

include("conecta_login.php");

header("Access-Control-Allow-Origin: *");

$return = [];

if(isset($_POST['usuario']) && isset($_POST['senha'])){

	if($_POST['usuario'] != "" && $_POST['senha'] != ""){

		$sql = "SELECT * FROM tb_usuario WHERE usuario = '".$_POST['usuario']."' AND senha = '".$_POST['senha']."'";

		$result = mysqli_query($conn,$sql);

		if($result && $result->num_rows > 0){

			$user = $result->fetch_assoc();
			
			$return = array(
				'success' => true,
				'message' => 'Bem-vindo '.$user['usuario'],
				'user' => $user
			);
		}else{
			$return = array(
				'success' => false,
				'message' => 'Usuário ou senha inválidos!'
			);
		}

	}else{
		$return = array(
			'success' => false,
			'message' => 'Preencha todos os campos!'
		);
	}

	echo json_encode($return);
}

$conn->close();

?>