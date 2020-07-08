//Atualizar curso
function atualizar() {
  var url = window.location.href
  var id_curso = url.split("=")[1]
  var nome = $("#nome").val();
  var id_coordenador = $("#id_coordenador").val();

  var atualizar = "http://localhost:3000/curso/atualizar/" + id_curso;
  event.preventDefault();
  $.ajax({
    type: "PATCH",
    url: atualizar,
    dataType: "json",
    data: {
      "nome": nome,
      "id_coordenador": id_coordenador
    },
    success: function (data) {
      console.log(data);
      alert("Registro atualizado com sucesso")
      window.location.replace("buscarCurso.html");
    },
    error: function (erro) {
      console.log(erro)
      alert("Erro ao tentar atualizar o registro")
    }
  })
}

//Cadastrar Curso
function cadastrar() {
  var nome = $("#nome").val();
  var id_coordenador = $("#id_coordenador").val();

  var cadastrar = "http://localhost:3000/curso/cadastrar";
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: cadastrar,
    dataType: "json",
    data: {
      "nome": nome, "id_coordenador": id_coordenador
    },
    success: function (data) {
      console.log(data)
      alert("Operação realizado com sucesso ")
      window.location.replace("buscarCurso.html");
    },
    error: function (erro) {
      console.log(erro)
      alert("Erro ao realizar a operação ")
    }
  })
}



function listar() {
  var corpoTabela = $('#corpo');
  var listar = "http://localhost:3000/curso/listar";
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
            + '<td>' + item[i].coordenador + '</td>'
            + '<td>'
            + '<a href="editarCurso.html?id=' + item[i].id_curso + ' "' + '>Editar</a>' + ' '
            + '<a href="excluirCurso.html?id=' + item[i].id_curso + '"' + '+ onclick="excluir()" >Excluir</a>'
            + '</td>';
          corpoTabela.append(row);

        }
      })
    })
  })
}

//Excluir curso
//$(document).ready(function () {
//$("#excluir").click(function () {
function excluir() {
  var url = window.location.href
  var id_curso = url.split("=")[1]
  var excluir = "http://localhost:3000/curso/excluir/" + id_curso;
  $.ajax({
    type: "DELETE",
    url: excluir,
    dataType: "json",
    data: { "id_curso": id_curso },
    success: function (data) {
      console.log(data);
      alert("Curso excluído com sucesso!")
      window.location.replace("buscarCurso.html");
    },
    error: function (erro) {
      console.log(erro)
      alert(erro)
    }
  })
}


//localizar curso
//$(document).ready(function(){
//$("#localizar").click(function(){
function localizar() {
  var url = window.location.href
  var id_curso = url.split("=")[1]
  var urlLocalizar = "http://localhost:3000/curso/localizar/" + id_curso;
  $.ajax({
    url: urlLocalizar,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data)
      $("#nome").val(data.curso.nome);
      $("#id_coordenador").val(data.curso.id_coordenadores);
    },
    error: function (erro) {
      console.log(erro)
      alert("registro não localizado")

    }
  })
}




//EM TESTE

function listarCoordenador() {
  var selecao = $('#id_coordenador');
  var listar = "http://localhost:3000/coordenador/listar";
  $.ajax({
    url: listar,
    type: "GET",
    dataType: "json",
    success: (function (data) {
      console.log(data)
      $.each(data, function (index, item) {
        for (var i = 0; i < item.length; i++) {

          op = '<option value="' + item[i].id_coordenador + '">' + item[i].nome + '</option>'
          //var op = document.createElement('option');
          //op.innerHTML =   item[i].id_id_curso ;
          selecao.append(op);
        }
      })
    })
  })
}
