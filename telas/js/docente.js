//Atualizar docente
function atualizar(){
    var url = window.location.href
    var id_docente = url.split("=")[1]

    var nome = $("#nome").val();
    var matricula = $("#matricula").val();
    var curso = $("#cursos").val();
    var dias = "";
    if($("#1").is(":checked")){
      $("#1").val("Segunda")
    }
    if($("#2").is(":checked")){
      $("#2").val("Terça")
    }
    if($("#3").is(":checked")){
      $("#3").val("Quarta")
    }
    if($("#4").is(":checked")){
      $("#4").val("Quinta")
    }
    if($("#5").is(":checked")){
      $("#5").val("Sexta")
    }
    dias= $("#1").val()+" "+$("#2").val()+" "+$("#3").val()+" "+$("#4").val()+" "+$("#5").val()
    var atualizar = "http://localhost:3000/docente/atualizar/" + id_docente;

    event.preventDefault();
    $.ajax({
      type: "PATCH",
      url: atualizar,
      dataType: "json",
      data: {
        "nome": nome,
        "matricula": matricula,
        "dias": dias,
        "id_curso":curso
      },
      success: function (data) {
        console.log(data);
        alert("Registro atualizado com sucesso")
        window.location.replace("buscarDocentes.html");
      },
      error: function (erro) {
        console.log(erro)
        alert("Erro ao tentar atualizar o registro")
      }
    })
  }

//Cadastrar docente
       function cadastrar(){
    var nome = $("#nome").val();
    var matricula = $("#matricula").val();
    var cursos = $("#cursos").val();
  
    var dias = "";
    if($("#1").is(":checked")){
      $("#1").val("Segunda")
    }
    if($("#2").is(":checked")){
      $("#2").val("Terça")
    }
    if($("#3").is(":checked")){
      $("#3").val("Quarta")
    }
    if($("#4").is(":checked")){
      $("#4").val("Quinta")
    }
    if($("#5").is(":checked")){
      $("#5").val("Sexta")
    }
    dias= $("#1").val()+" "+$("#2").val()+" "+$("#3").val()+" "+$("#4").val()+" "+$("#5").val()  
    var cadastrar = "http://localhost:3000/docente/cadastrar";
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: cadastrar,
      dataType: "json",
      data: {
        "nome": nome, "matricula": matricula, "id_curso": cursos, "dias":dias
      },
      success: function (data) {
        console.log(data)
        alert("Operação realizado com sucesso ")
        window.location.replace("buscarDocentes.html");
      },
      error: function (erro) {
        console.log(erro)
        alert("Erro ao realizar a operação ")
      }
    })
  }



function listar() {
  var corpoTabela = $('#corpo');
  var listar = "http://localhost:3000/docente/listar";
  //$("#corpo").remove();
  $.ajax({
    url: listar,
    type: "GET",
    dataType: "json",
    success: (function (data) {
      console.log(data)
      $.each(data, function (index, item) {
        for (var i = 0; i < item.length; i++) {
          var row = document.createElement('tr');
          //.php?db=ubtlogistica2&table=COORDENADOR
          row.innerHTML = 
            '<td>' + item[i].nome + '</td>'
            + '<td>' + item[i].matricula + '</td>'
            + '<td>' + item[i].curso + '</td>'
            + '<td>' + item[i].dias + '</td>'
            + '<td>'
            + '<a href="editarDocentes.html?id=' + item[i].id_docente + ' "' + '>Editar</a>' + ' '
            + '<a href="excluirDocente.html?id=' + item[i].id_docente + '"' + '+ onclick="excluir()" >Excluir</a>'
            + '</td>';
          corpoTabela.append(row);
        }
      })
    })
  })
}

//Excluir coordenador
//$(document).ready(function () {
//$("#excluir").click(function () {
function excluir() {
  var url = window.location.href
  var id_docente = url.split("=")[1]
  var excluir = "http://localhost:3000/docente/excluir/" + id_docente;
  $.ajax({
    type: "DELETE",
    url: excluir,
    dataType: "json",
    data: { "id_docente": id_docente },
    success: function (data) {
      console.log(data);
      alert("Docente excluido com sucesso!")
      window.location.replace("buscarDocentes.html");
    },
    error: function (erro) {
      console.log(erro)
      alert(erro)
    }
  })
}


//localizar coordenador
//$(document).ready(function(){
//$("#localizar").click(function(){
function localizar() {
  var url = window.location.href
  var id_docente = url.split("=")[1]
  var urlLocalizar = "http://localhost:3000/docente/localizar/" + id_docente;
  $.ajax({
    url: urlLocalizar,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data)
      $("#nome").val(data.Docente.nome);
      $("#matricula").val(data.Docente.matricula);
      $("#cursos").val(data.Docente.id_cursos);
    },
    error: function (erro) {
      console.log(erro)
      alert("registro não localizado")

    }
  })
}

function listarCursos(){
  var selecao = $('#cursos');
  var listar = "http://localhost:3000/curso/listar";
  $.ajax({
    url: listar,
    type: "GET",
    dataType: "json",
    success: (function (data) {
      console.log(data)
      $.each(data, function (index, item) {
        for (var i = 0; i < item.length; i++) {

          op = '<option value="' + item[i].id_curso + '">' + item[i].nome + '</option>'
          //var op = document.createElement('option');
          //op.innerHTML =   item[i].id_id_curso ;
          selecao.append(op);
        }
      })
    })
  })
}


//EM TESTE
/*function listarCoordenador() {
  var selecao = $('#opcao');
  var listar = "http://localhost:3000/coordenador/listar";
  $.ajax({
    url: listar,
    type: "GET",
    dataType: "json",
    success: (function (data) {
      $.each(data, function (index, item) {
        for (var i = 0; i < item.length; i++) {

          op = '<option value="' + item[i].id_coordenador + '">' + item[i].id_id_curso + '</option>'
          //var op = document.createElement('option');
          //op.innerHTML =   item[i].id_id_curso ;
          selecao.append(op);
        }
      })
    })
  })
}*/


