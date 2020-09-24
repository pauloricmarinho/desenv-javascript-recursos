function validar() {

    // Pegar Valores dos Campos através dos seus nomes
    var nome = form1.txtnome.value;
    var email = form1.txtemail.value;
    var cargo = form1.cbocargo.value;
    var usuario = form1.txtusuario.value;
    var tipoUsuario = form1.rdtipo.value;
    var senha = form1.txtsenha.value;
    var senha2 = form1.txtsenha2.value;
    
    if (nome == "") {
    alert('Preencha o campo com seu nome');
    form1.txtnome.focus();
    return false;
    }
    
    if (nome.length < 4) {
    alert('Preencha o campo com um nome com mais de 4 caracteres');
    form1.nome.focus();
    return false;
    }
    
    if (email == "") {
    alert('Campo email Obrigatório.');
    form1.txtemail.focus();
    return false;
    }
    
    if(cargo == 0){
    alert('Selecione o cargo.');
    form1.cbocargo.focus();
    return false;
    }
    // Validação Simples de Email
    if ((email != 0) && ((email.indexOf("@") < 1) || (email.indexOf('.') < 7)))
      {
        alert('Informe um email Válido.');
        form1.txtemail.focus();
        return false;
      }
    
    if (usuario == "") {
    alert('Campo Usuário Obrigatório.');
    form1.txtusuario.focus();
    return false;
    }  
    
    if (senha == "") {
    alert('Campo senha Obrigatório.');
    form1.txtsenha.focus();
    return false;
    }  
    
    if (senha.length < 6) {
    alert('Informe uma senha com mais de 5 caracteres.');
    form1.txtsenha.focus();
    return false;
    }  
    
    if (senha != senha2) {
    alert('As Senhas devem ser iguais.');
    form1.txtsenha.focus();
    return false;
    }
    
    if(
       (((form1.chkconhecimento[0].checked == false )&&
         (form1.chkconhecimento[1].checked == false ))
        &&
        ((form1.chkconhecimento[2].checked == false )&&
         (form1.chkconhecimento[3].checked == false )))
         &&
        (((form1.chkconhecimento[4].checked == false )&&
          (form1.chkconhecimento[5].checked == false ))
         &&
        ((form1.chkconhecimento[6].checked == false )&&
         (form1.chkconhecimento[7].checked == false ))
         &&
         (form1.chkconhecimento[8].checked == false ))	
        ){
    
        alert('Selecione ao menos 1 Conhecimento.');
        form1.chkconhecimento[0].focus();
        return false;
    }
    
    if((form1.rdtipo[0].checked == false)&&(form1.rdtipo[1].checked == false)){
    alert('Informe o Tipo do Usuário.');
        form1.rdtipo[0].focus();
        return false;
    }
    
    return true;
    }