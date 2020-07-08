
//Atualizar coordenador
$(document).ready(function () {
  $("#atualizar").click(function () {
    var url = window.location.href
    var id_coordenador = url.split("=")[1]

    var matricula = $("#matricula").val();
    var nome = $("#nome").val();
    var email = $("#email").val();
    var atualizar = "http://localhost:3000/coordenador/atualizar/" + id_coordenador;

    event.preventDefault();
    $.ajax({
      type: "PATCH",
      url: atualizar,
      dataType: "json",
      data: {
        "matricula": matricula,
        "nome": nome,
        "email": email
      },
      success: function (data) {
        console.log(data);
        alert("Registro atualizado com sucesso")
        window.location.replace("listarCoordenador.html");
      },
      error: function (erro) {
        alert("Erro ao tentar atualizar o registro")
        console.log(erro)
      }
    })
  })
})

//Fazer Login
$(document).ready(function () {
  $("#entrar").click(function () {
    var email = $("#email").val();
    var senha = $("#senha").val();
    var login = "http://localhost:3000/coordenador/login";

    event.preventDefault();
    $.ajax({
      type: "POST",
      url: login,
      dataType: "json",
      data: { "email": email, "senha": senha },
      success: function (data) {
        console.log(data);
        alert("Acesso Permitido");
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", data.nome);
        window.location.replace("home.html");
      },
      error: function (erro) {
        console.log(erro)
        alert("Erro ao tentar acessar")
        window.location.replace("index.html");
      }
    })
  })
})




//Cadastrar coordenador
$(document).ready(function () {
  $("#cadastrar").click(function () {
    var nome = $("#nome").val();
    var email = $("#email").val();
    var senha = $("#senha").val();
    var matricula = $("#matricula").val();
    var cadastrar = "http://localhost:3000/coordenador/cadastrar";
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: cadastrar,
      dataType: "json",
      data: {
        "nome": nome, "email": email, "senha": senha,
        "matricula": matricula
      },
      success: function (data) {
        alert("Operação realizado com sucesso ")
        console.log(data)
        window.location.replace("listarCoordenador.html");
      },
      error: function (erro) {
        alert("Erro ao realizar a operação ")
        console.log(erro)
      }
    })
  })
})


function listar() {
  var corpoTabela = $('#corpo');
  var listar = "http://localhost:3000/coordenador/listar";
  //$("#corpo").remove();
  $.ajax({
    url: listar,
    type: "GET",
    dataType: "json",
    success: (function (data) {
      $.each(data, function (index, item) {
        for (var i = 0; i < item.length; i++) {
          var row = document.createElement('tr');
          //.php?db=ubtlogistica2&table=COORDENADOR
          row.innerHTML = 
            '<td>' + item[i].matricula + '</td>'
            + '<td>' + item[i].nome + '</td>'
            + '<td>' + item[i].email + '</td>'
            + '<td>'
            + '<a href="editarCoordenador.html?id=' + item[i].id_coordenador + ' "' + ' >Editar</a>' + ' '
            + '<a href="excluirCoordenador.html?id=' + item[i].id_coordenador + '"' + '+ onclick="excluir()" >Excluir</a>'
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
  var matricula = $("#matricula").val();
  var url = window.location.href
  var id_coordenador = url.split("=")[1]
  var excluir = "http://localhost:3000/coordenador/excluir/" + id_coordenador;
  $.ajax({
    type: "DELETE",
    url: excluir,
    dataType: "json",
    data: { "matricula": matricula },
    success: function (data) {
      console.log(data);
      alert("Coordenador excluido com sucesso!")
      window.location.replace("listarCoordenador.html");
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
  var id_coordenador = url.split("=")[1]
  var urlLocalizar = "http://localhost:3000/coordenador/localizar/" + id_coordenador;
  $.ajax({
    url: urlLocalizar,
    type: "GET",
    dataType: "json",
    success: function (data) {
      $("#nome").val(data.coordenador.nome);
      $("#email").val(data.coordenador.email);
      $("#matricula").val(data.coordenador.matricula);
      console.log(data)
    },
    error: function (erro) {
      alert("Matricula não encontrada")

    }
  })
}
//})
//})


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
