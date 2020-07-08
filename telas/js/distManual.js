function listarCursos(){
    var selecao = $('#cursos');
    var listar = "http://localhost:3000/curso/listar";
    $.ajax({
      url: listar,
      type: "GET",
      dataType: "json",
      success: (function (data) {
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