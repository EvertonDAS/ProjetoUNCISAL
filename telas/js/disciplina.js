
//Atualizar coordenador
function atualizar(){
    var url = window.location.href
    var id_disciplina = url.split("=")[1]
    var nome = $("#disciplina").val();
    var horas = $("#horas").val();
    var id_curso = $("#cursos").val();
    var id_docente = $("#professor").val();
    var periodo = $("#periodo").val();
    
    var atualizar = "http://localhost:3000/disciplina/atualizar/" + id_disciplina;
    event.preventDefault();
    $.ajax({
      type: "PATCH",
      url: atualizar,
      dataType: "json",
      data: {
        "nome": nome, "horas": horas, "id_curso": id_curso,
        "id_docente": id_docente, "periodo": periodo
      },
      success: function (data) {
        console.log(data);
        alert("Registro atualizado com sucesso")
        window.location.replace("buscarDisciplinas.html");
      },
      error: function (erro) {
        console.log(erro)
        alert("Erro ao tentar atualizar o registro")
      }
    })
  }

//Cadastrar disciplina 
    function cadastrar(){
    var nome = $("#disciplina").val();
    var horas = $("#horas").val();
    var id_curso = $("#cursos").val();
    var id_docente = $("#professor").val();
    var periodo = $("#periodo").val();
    var cadastrar = "http://localhost:3000/disciplina/cadastrar";
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: cadastrar,
      dataType: "json",
      data: {
        "nome": nome, "horas": horas, "id_curso": id_curso,
        "id_docente": id_docente, "periodo": periodo
      },
      success: function (data) {
        console.log(data)
        alert("Operação realizado com sucesso ")
        window.location.replace("buscarDisciplinas.html");
      },
      error: function (erro) {
        console.log(erro)
        alert("Erro ao realizar a operação ")
      }
    })
  }



function listar() {
  var corpoTabela = $('#corpo');
  var listar = "http://localhost:3000/disciplina/listar";
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
              '<td>' + item[i].disciplina+ '</td>'
            + '<td>' + item[i].horas + '</td>'
            + '<td>' + item[i].curso + '</td>'
            + '<td>' + item[i].docente + '</td>'
            + '<td>' + item[i].periodo + '</td>'
            + '<td>'
            + '<a href="editarDisciplina.html?id=' + item[i].id_disciplina + ' "' + '>Editar</a>' + ' '
            + '<a href="excluirDisciplina.html?id=' + item[i].id_disciplina + '"' + '+ onclick="excluir()" >Excluir</a>'
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
  var id_disciplina = url.split("=")[1]
  var excluir = "http://localhost:3000/disciplina/excluir/" + id_disciplina;
  $.ajax({
    type: "DELETE",
    url: excluir,
    dataType: "json",
    data: { "id_disciplina": id_disciplina },
    success: function (data) {
      console.log(data);
      alert("Disciplina excluido com sucesso!")
      window.location.replace("buscarDisciplinas.html");
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
function localizar(){
  var url = window.location.href
  var id_disciplina = url.split("=")[1]
  var urlLocalizar = "http://localhost:3000/disciplina/localizar/" + id_disciplina;
  $.ajax({
    url: urlLocalizar,
    type: "GET",
    dataType: "json",
    success: function (data) {
     console.log(data)
     $("#disciplina").val(data.disciplina.nome);
     $("#cursos").val(data.disciplina.id_cursos);
     $("#professor").val(data.disciplina.id_docentes);
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

function listarDocente(){
  var selecao = $('#professor');
  var listar = "http://localhost:3000/docente/listar";
  $.ajax({
    url: listar,
    type: "GET",
    dataType: "json",
    success: (function (data) {
      console.log(data)
      $.each(data, function (index, item) {
        for (var i = 0; i < item.length; i++) {

          op = '<option value="' + item[i].id_docente + '">' + item[i].nome + '</option>'
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
