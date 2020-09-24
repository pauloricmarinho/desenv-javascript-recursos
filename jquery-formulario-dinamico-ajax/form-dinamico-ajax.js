// Função #01 : SALVAR Arquivos na Lista de Comunicados
function adicionarArquivoListar(){
		
	    if($("#arquivo-importado").val() == ""){
			alert('Favor Selecionar um Arquivo...');
			event.preventDefault();
		}else{
	    
	    var formArquivos = document.getElementById("form-incluir-arquivo-hidden");
	    event.preventDefault();
		

		$("#arquivo-nome").val($("#arquivo-importado").val());
		$("#arquivo-nome-aux").val($("#arquivo-importado").val());
		$("#arquivo-importado-aux").value = $("#arquivo-importado").value;
		
      	var FORM_URL = $("#form-incluir-arquivo-hidden").attr("action");
      	var FORM_DATA = new FormData(formArquivos);
      		
      		$.ajax({
      			url: FORM_URL,
      			type: 'POST',
      			data: FORM_DATA,
      			success: function(data){
      				
      				// Limpar Lista de Arquivos
      				$("#arquivos-importados").html("");
      				$("#arquivo-importado").val("");
      				data.listaAnexosData.forEach(lerAnexo);

					function lerAnexo(anexo, index){

					  montarListaArquivos(anexo);					  
					  setInterval(null, 1000);
					  prepararCssColunas(anexo.ordem); // Garante que o Elemento Exista na Tela ao Setar o CSS.
					  
					}
      			},
      			error: function(data){
      				alert('Ocorreu um erro ao Incluir o Arquivo');      			
      			},
      			cache: false,
      			contentType: false,
      			processData: false
      		}).done(function(data){
      			$("#arquivos-importados-action").hide();   		
      		}); 
		} // Final IF

     };
     
     
     // Função  #02 : REMOVER Arquivos na Lista de Comunicados
    function removerArquivoListar(div,arquivoForm){
       	$("#"+arquivoForm).submit(function(event){
       		
       		event.preventDefault();
      		
      		var FORM_URL = $(this).attr("action");
      		var FORM_METHOD = $(this).attr("method");
      		var FORM_DATA = $("#"+arquivoForm).serialize();
      		
      		console.log("../"+FORM_URL);
      		console.log(FORM_METHOD);
      		console.log(FORM_DATA);
      		
      		$.ajax({
      			url: "../"+FORM_URL,
      			type: 'POST',
      			data: FORM_DATA,
      			success: function(data){
      				console.log('Removido com Sucesso');
      				$("#"+div).remove();
      			},
      			error: function(erro){
      				alert("Ocorreu um erro ao Tentar Remover o Arquivo.");
      			},
      		}).done(function(listaAnexos){
      			//console.log(listaAnexos);
      		});
      	});
     };
     
     // Função  #03 :  Monta a Lista de Arquivos Tratanto o Retorno do AJAX
     function montarListaArquivos(anexo){
     
     	event.preventDefault();
	   
		var divRoot 			= document.createElement('div');
			divRoot.id 			= "linha-"+anexo.ordem;
			$("#"+divRoot.id).addClass("col-sm-12");
	   
	   // DIV Descriï¿½ï¿½o do Arquivo
	   	var divArquivo			=  document.createElement('div');
			divArquivo.id    	= 'arquivo-id-'+anexo.ordem;
			divArquivo.style	= "text-align:left; color:#337ab7";
			divArquivo.innerHTML= "<span class='glyphicon glyphicon-save'></span> " + anexo.nome;
			
			$("#"+divArquivo.id).addClass("col-sm-8");
		
		// DIV Checkbox Habilitar				
		var divHabilitar			=  document.createElement('div');
			divHabilitar.id    		= 'ds-arquivo-'+anexo.ordem;			
			divHabilitar.style		= "text-align: center; color:blue";		
			
			$("#"+divHabilitar.id).addClass("col-sm-2");
		
		var formHabilitar			=  document.createElement('form');	
			formHabilitar.method	= "POST";
			formHabilitar.id		= "form-habilitar-id-"+anexo.ordem;
			formHabilitar.action		= "arquivos/processarArquivosComunicado!habilitarArquivo.do";
			
		var inputArqHabilitar 			= document.createElement('input');
		    inputArqHabilitar.name		= "anexosDTO.nome";
		    inputArqHabilitar.value		= anexo.nome;
		    inputArqHabilitar.type		= "hidden";
		
		var checkArqHabilitar 			= document.createElement('input');
		    checkArqHabilitar.id		= "check-"+anexo.ordem;
		    checkArqHabilitar.name		= "anexosDTO.habilitarEnvio";
		    checkArqHabilitar.value		= anexo.nome;
		    checkArqHabilitar.type		= "checkbox";

		    if(anexo.habilitarEnvio == true){
		    	checkArqHabilitar.checked	= true;
		    	checkArqHabilitar.value		= "true";
		    }else{
		    	checkArqHabilitar.checked	= false;		    
		    	checkArqHabilitar.value		= "false";
		    }
		    
		
			formHabilitar.appendChild(inputArqHabilitar);
			formHabilitar.appendChild(checkArqHabilitar);
			divHabilitar.appendChild(formHabilitar);
		
		// DIV Removação do Arquivo
		var divRemover			=  document.createElement('div');
			divRemover.id    		= 'rm-arquivo-'+anexo.ordem;
			divRemover.style		= "text-align: center; color:red";
			
			$("#"+divRemover.id).addClass("col-sm-2");
			
			
		var formRemover 			= document.createElement('form');
			formRemover.action		= "arquivos/processarArquivosComunicado!removerArquivo.do";
			formRemover.method		= "POST";
			formRemover.id			= "form-remover-id-"+anexo.ordem;
		
		var inputRemover 			= document.createElement('input');
		    inputRemover.name		= "anexosDTO.nome";
		    inputRemover.value		= anexo.nome;
		    inputRemover.type		= "hidden";
		
		var btnRemover 				= document.createElement('button');
			
			btnRemover.id			= "btn-arquivo-"+anexo.ordem;
			btnRemover.innerHTML	= "<span class='glyphicon glyphicon-trash'></span>";
			btnRemover.style		= "margin: 1px;";
			
			$("#"+btnRemover.id).addClass("btn");
			
			btnRemover.addEventListener("click", function(){preparaRemoverArquivo(divRoot.id, formRemover.id);}, false); 
			checkArqHabilitar.addEventListener("click", function(){habilitarArquivoEnvio(formHabilitar.id);}, false);
			
			formRemover.appendChild(inputRemover);			
			formRemover.appendChild(btnRemover);
		
			divRemover.appendChild(formRemover);
		
		
		divRoot.appendChild(divArquivo);
		divRoot.appendChild(divHabilitar);
		divRoot.appendChild(divRemover);
		
		$("#arquivos-importados").append(divRoot);
    
     	//$("#arquivos-importados").html(elemento);
     }
    
    // Função  04 : Responsï¿½vel por Setar o CSS nas DIV da Lista de Arquivo
    //			 : Criada Separada para Renderização em Tempo de Execução. 
    function prepararCssColunas(id){
    
    	$("#linha-"+id).addClass("col-sm-12");
    	$("#arquivo-id-"+id).addClass("col-sm-8");
    	$("#ds-arquivo-"+id).addClass("col-sm-2");
    	$("#rm-arquivo-"+id).addClass("col-sm-2");
    	$("#btn-arquivo-"+id).addClass("btn");	
    	
    }
    
    // Função  05 : Prepara para Remoção do Arquivo
    function preparaRemoverArquivo(div, form){
		//event.preventDefault();
		//$("#"+div).remove(); // Remove a DIV 
		removerArquivoListar(div,form);
		//$("#"+div).remove();
	}	
	
	// Função #06 : Habilitar Arquivo para Envio ao P8
    function habilitarArquivoEnvio(arquivoForm){
       
       		//event.preventDefault();
      		
      		var FORM_URL = $("#"+arquivoForm).attr("action");
      		var FORM_METHOD = $("#"+arquivoForm).attr("method");
      		var FORM_DATA = $("#"+arquivoForm).serialize();
      		
      		console.log("../"+FORM_URL);
      		console.log(FORM_METHOD);
      		console.log(FORM_DATA);
      		
      		$.ajax({
      			url: "../"+FORM_URL,
      			type: 'POST',
      			data: FORM_DATA,
      			success: function(data){
      				console.log('Arquivo Habilitado para Envio');
      				//check.checked = false;
      			},
      			error: function(erro){
      				alert("Ocorreu um erro ao Tentar Remover o Arquivo.");
      			},
      		}).done(function(listaAnexos){

      			console.log(listaAnexos);
      		});
   
     };