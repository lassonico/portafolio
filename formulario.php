<?php

// isset: identifica si una variable esta definida o null
// empty: identifica si una variable está vacía
// trim: elimina espacions en blanco o con caracteres distintos del inicio y el final de la cadena


if($_POST){
    
    $nombre = "";
    $telefono = "";
    $email = "";
    $mensaje = "";


    if(isset($_POST['nombre'])){
        $nombre = filter_var(trim($_POST['nombre']), FILTER_SANITIZE_STRING);
    }
    if(isset($_POST['telefono'])){
        $telefono = filter_var(trim($_POST['telefono']), FILTER_SANITIZE_NUMBER_INT);
    }
    if(isset($_POST['email'])){
        $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    }
    if(isset($_POST['mensaje'])){
        $mensaje = filter_var(trim($_POST['mensaje']), FILTER_SANITIZE_STRING);
    }
    if(empty($nombre)){
        echo json_encode(array(
            'error' => true,
            'campo' => 'nombre'
        ));
        return;
    }
    
    $patron = '/^[a-zA-Z, ]*$/';

    if(!preg_match($patron,$nombre)){
        echo json_encode(array(
            "error" => true,
            'campo' => 'nombre'
        ));
        return;
    }
    if(empty($telefono)){
        echo json_encode(array(
            'error' => true,
            'campo' => 'telefono'
        ));
        return;
    }
    if(empty($email)){
        echo json_encode(array(
            'error' => true,
            'campo' => 'email'
        ));
        return;
    }
    if(empty($mensaje)){
        echo json_encode(array(
            'error' => true,
            'campo' => 'mensaje'
        ));
        return;
    }
    
    //CUERPO DEL MENSAJE!!!

    $cuerpo = 'Hola Nícola, tienes un cliente potencial por contactar.' . "<br/>";
    $cuerpo .= 'Nombre: ' . $nombre . "<br/>";
    $cuerpo .= 'WhatsApp: ' . $telefono . "<br/>";
    $cuerpo .= 'Email: ' . $email . "<br/>";
    $cuerpo .= 'Mensaje: ' . $mensaje . "<br/>";

    //  DIRECCION DE CORREO

    $destinatario = 'sionvmx@gmail.com';
    $asunto = 'Tienes un cliente por llamar';
    $headers = 'MIME-Version: 1.0' . "\r\n" .'content-type: text/html;
    charset=utf-8' . "\r\n" . 'From: ' . $email . "\r\n";

    if(mail($destinatario, $asunto, $cuerpo, $headers)){
        echo json_encode(array(
            'error' => false,
            'campo' => 'éxito'
        ));
    }else{
        echo json_encode(array(
            'error' => true,
            'campo' => 'mail'
        ));
    }
}
else{
    echo json_encode(array(
    'error' => true,
    'campo' => 'post'
    ));
}
