//verifica se não está logado
function verificaLogoff(){
  if (localStorage.getItem("token")){
   alert("Acesso negado, faça logoff antes");
   window.location.replace("home.html");
  }
  }

//verifica token
function verificaToken(){
  if (localStorage.getItem("token")){
   console.log("Acesso permitido")
    }else{
    alert("Você precisa está logado");
    window.location.replace("index.html");
 }
}

//remove o localStorage
$(document).ready(function () {
  $("#sair").click(function () {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    alert("Saindo do sistema...!")
  })
  })

  function fecharPagina(){
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }

 //mostrar usuario logado:
//var _0x19f9=['getItem','usuario','getElementById',':\x20'];(function(_0x3ca792,_0x19f980){var _0xefa8bb=function(_0x5b1626){while(--_0x5b1626){_0x3ca792['push'](_0x3ca792['shift']());}};_0xefa8bb(++_0x19f980);}(_0x19f9,0x163));var _0xefa8=function(_0x3ca792,_0x19f980){_0x3ca792=_0x3ca792-0x0;var _0xefa8bb=_0x19f9[_0x3ca792];return _0xefa8bb;};$(document)['ready'](function(){if(localStorage[_0xefa8('0x1')](_0xefa8('0x2'))){document[_0xefa8('0x3')](_0xefa8('0x2'))['innerText']=_0xefa8('0x0')+localStorage[_0xefa8('0x1')](_0xefa8('0x2'));}});

//mostrar usuario logado:
  $(document).ready(function(){
    if(localStorage.getItem("usuario")){ 
    document.getElementById("negrito").innerText = 'Usuário: '+localStorage.getItem("usuario");
    }
   })


//localizar qualquer campo na tabela
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#corpo tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});


  $(".drop")
  .mouseover(function() {
  $(".dropdown").show(300);
});
$(".drop")
  .mouseleave(function() {
  $(".dropdown").hide(300);     
});
