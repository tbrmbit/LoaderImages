(function(window){
  var IE = false,
      _xml,
      _w = 0,
      _index = 0,
      _total = 0,
      LOADER,
      TIME,
      s1,
      j1,
      s2,
      j2,
      jsonRanking,
      listImagesSosias = [],
      listImagesJogador = [],
      listImagesLoader = [],
      listFase = [],
      listOrigem = [],
      totalVotos = 0,
      fase = 4,
      PATHSOSIAS = "http://estaticog1.globo.com/2014/05/Sosias/sosia/",
      PATHJOGADORES = "http://estaticog1.globo.com/2014/05/Sosias/jogador/";

  $(document).ready(function() {
    IE = (getInternetExplorerVersion() == -1) ? IE = false : IE = true;
    _w = $( ".bar-progress" ).width();
    $( ".bt-votar" ).bind( "click", closePage );
    $( ".btn-ranking" ).bind( "click", { url : "http://guia-das-cidades-da-copa.g1.globo.com/pegavoto/json.php?r="+fase}, openBox);

    $( "#btn-classificatoria" ).bind( "click", { url : "http://guia-das-cidades-da-copa.g1.globo.com/pegavoto/json.php?r=1"}, openBox);
    $( "#btn-classificatoria" ).bind( "mouseover", overLine);
    $( "#btn-classificatoria" ).bind( "mouseout", outLine);

    $( "#btn-oitavas" ).bind( "click", { url : "http://guia-das-cidades-da-copa.g1.globo.com/pegavoto/json.php?r=2"}, openBox);
    $( "#btn-oitavas" ).bind( "mouseover", overLine);
    $( "#btn-oitavas" ).bind( "mouseout", outLine);

    $( "#btn-quartas" ).bind( "click", { url : "http://guia-das-cidades-da-copa.g1.globo.com/pegavoto/json.php?r=3"}, openBox);
    $( "#btn-quartas" ).bind( "mouseover", overLine);
    $( "#btn-quartas" ).bind( "mouseout", outLine);

    //$( "#btn-semi" ).bind( "click", { url : "http://guia-das-cidades-da-copa.g1.globo.com/pegavoto/json.php?r=4"}, openBox);
    //$( "#btn-semi" ).bind( "mouseover", overLine);
    //$( "#btn-semi" ).bind( "mouseout", outLine);

    //$( "#btn-final" ).bind( "click", { url : "http://guia-das-cidades-da-copa.g1.globo.com/pegavoto/json.php?r=5"}, openBox);
    //$( "#btn-final" ).bind( "mouseover", overLine);
    //$( "#btn-final" ).bind( "mouseout", outLine);

    $( "#btn-close" ).bind( "click", closeBox);
    //$( "#btn-quartas" ).bind( "mouseover", overLine );
    //$( "#btn-quartas" ).bind( "mouseout", outLine );
    //$( "#btn-semi" ).bind( "mouseover", overLine );
    //$( "#btn-semi" ).bind( "mouseout", outLine );

    $( "#btn-final" ).bind( "mouseover", overLine );
    $( "#btn-final" ).bind( "mouseout", outLine );

    //$( "#btn-quartas" ).css( "opacity", ".6" );
    //$( "#btn-semi" ).css( "opacity", ".6" );
    $( "#btn-final" ).css( "opacity", ".6" );

    s1 = $(".card-sosia")[0];
    j1 = $(".card-idolo")[0];
    s2 = $(".card-sosia")[1];
    j2 = $(".card-idolo")[1];
    
    $(s1).css( "left", 30 );
    $(j1).css( "left", "22%" );
    $(s2).css( "right", "22%" );
    $(j2).css( "right", 30 );

    loadJsonFase();
  });

  function loadJson() {
    $.ajax({
      cache: false,
      url: "http://g1.globo.com/platb/files/2473/theme/data.json",
      //url: "js/data.json",
      //url: "http://operweb.com.br/arteg1web/sosias/json.php?r=1",
      dataType: "json",
      success: function(data) {
        for (var i = 0; i < data.sosias.length; i++) {
          listOrigem.push( data.sosias[i] );

          if( compare(data.sosias[i].id) )
            listImagesSosias.push( data.sosias[i] );

          listImagesLoader.push( PATHSOSIAS + data.sosias[i].image );
          listImagesLoader.push( PATHJOGADORES + data.sosias[i].imageJogador );
        };
      }
    });
  }

  function loadJsonFase() {
    var _url = "http://guia-das-cidades-da-copa.g1.globo.com/pegavoto/json.php?r="+fase;
    $.ajax({
       type: 'GET',
        url: _url,
        async: false,
        jsonpCallback: 'jsonp',
        contentType: "application/json",
        dataType: 'jsonp',
        crossDomain: true,
        success: function(data) {
          for (var j = 0; j < data.sosias.length; j++) {        
            listFase.push( data.sosias[j].id );
          };
          _total = listFase.length;
          loadJson();
        },
        error: function(e) {
           console.log(e.message);
        }
    });

    /*$.ajax({
      cache: false,
      url: "http://g1.globo.com/platb/files/2473/theme/ranking2.json",
      //url: "js/data.json",
      //url: "http://operweb.com.br/arteg1web/sosias/json.php?r=1",
      dataType: "json",
      success: function(data) {
        for (var j = 0; j < data.length; j++) {          
          listFase.push( data[j].id );
        };
        _total = listFase.length;
        loadJson();
      }
    });*/
  }

  function compare ( array_id ) {
      for( var x = 0; x < listFase.length; x++ )
      {
        if (listFase[x] == array_id) return true;
      }
  }

  function openLoading() {
    $( ".bar-progress" ).css( "width", 0 );
    TweenMax.to( $(".loading"), 1.5, { top : "50%", ease:Back.easeOut, delay:.3, onComplete : initLoader, onCompleteParams : [listImagesLoader] });
  }

  function closeLoading() {
    $(".compartilhamento").css("display", "none");
    TweenMax.to( $(".loading"), .6, { scale : 0, autoAlpha : 0, ease:Back.easeIn, delay : .3, onComplete : openGame });
    TweenMax.to( $(".initial"), 1, { alpha : .0 });
    removeEventListener('LOAD_PROGRESS', progressBar, false);
    removeEventListener('LOAD_COMPLETE', closeLoading, false);
  }

  function initLoader( list ) {
    LOADER = new LoaderImages(list);
    addEventListener('LOAD_PROGRESS', progressBar, false);
    addEventListener('LOAD_COMPLETE', closeLoading, false);
  }

  function progressBar() {
    var _width = ((_w * LOADER.percentage() ) / 100);
    $( ".bar-progress" ).width( _width );
    $( "#text-por" ).text( Math.round(LOADER.percentage()) + "%" );
  }

  function closePage() {
    $( this ).unbind( "click", closePage );
    TweenMax.to( $(".initial"), .5, { alpha : .2, onComplete: openLoading });
  }

  function openGame() {
    shuffleArray(listImagesSosias);
    $(".initial").css( "display", "none" );
    $(".game").css( "display", "block" );
    TweenMax.to( $(".game"), 1, { alpha : 1, delay : .3, onComplete : initGame });
  }

  function initGame() {
    changeImage();
    playCard(".card-sosia");
    playCard(".card-idolo");
  }

  function plaGol()
  {
    TweenMax.to( $(".ball"), .3, { scale : .6, top : 170, ease:Back.easeOut, delay: .3 });
    TweenMax.to( $(".shadow-ball"), .3, { scale : .9, top : 215, opacity : .3, ease:Back.easeOut, delay: .3 });
    TweenMax.to( $(".campo-normal"), .0, { opacity : 0, delay: .4 });
    TweenMax.to( $(".campo-rede"), .0, { opacity : 1, delay: .4 });
    TweenMax.to( $(".campo-normal"), .0, { opacity : 1, delay: .5 });
    TweenMax.to( $(".campo-rede"), .0, { opacity : 0, delay: .5 });
    TweenMax.to( $(".ball"), .3, { top : 200, ease:Bounce.easeOut, delay : .5 });
    TweenMax.to( $(".ball"), .3, { left : 80, rotation : -40, scale : .65, delay : .6 });
    TweenMax.to( $(".shadow-ball"), .3, { top : 218, left: 85, scale : .6, opacity : .7, ease:Back.easeOut, delay : .6 });
    TweenMax.allTo( [$(".ball"), $(".shadow-ball")], .5, { opacity : 0, delay : .9, onComplete: ballInit });
  }

  function plaError() {
    TweenMax.to( $(".ball"), .4, { scale : .5, top : 60, delay: .3 });
    TweenMax.to( $(".shadow-ball"), .4, { scale : 1.1, top : 205, opacity : 0, delay: .3 });
    TweenMax.to( $(".shadow-ball-error"), .4, { top: 80, scale : .6, opacity : .4, delay: .4 });
    TweenMax.to( $(".shadow-ball-error"), .3, { left: 30, top: 20, scale : 1, opacity : .0, delay: .6 });
    TweenMax.to( $(".ball"), .3, { left: 10, top : 0, scale : 1, opacity: 0, delay : .6 });
    TweenMax.allTo( [$(".ball"), $(".shadow-ball")], .5, { opacity : 0, delay : .9, onComplete: ballInit });
  }

  function playCard( card ) {
    if( IE )
    {
      $( card ).children(".front").css( "display", "none" );
      $( card ).children(".back").css( "backface-visibility", "visible" );
      $( card ).children(".back").css( "transform", "rotate(0)" );
    }

    TweenMax.to( $( card ), .5, { top: 25, rotation : 0, onComplete : flip } );
  }

  function ballInit() {
    $( ".ball" ).css({
      "top" : "150px",
      "left" : "100px"
    });
    $( ".shadow-ball" ).css({
      "top" : "295px",
      "left" : "100px"
    });
    $( ".shadow-ball-error" ).css({
      "top" : "110px",
      "left" : "100px"
    });

    TweenMax.to( $(".ball"), .2, { scale: 1, opacity : 1, rotation : 0 });
    TweenMax.to( $(".ball"), .3, { top : 275, ease:Bounce.easeOut, delay : .4 });

    TweenMax.to( $(".shadow-ball"), .2, { scale: 1.2, opacity : .3, rotation : 0 });
    TweenMax.to( $(".shadow-ball"), .3, { scale: 1, top: 293, opacity : .5, ease:Bounce.easeOut, delay : .4 });
  }

  function flip() {
    if( !IE )
    {
      TweenMax.killTweensOf( $(".card") );
      TweenMax.to( $(".card"), 1, { rotationY : 180, rotation : 0, top : 25, delay : .5, ease:Back.easeInOut });
    }
  }

  function flipBack() {
    if( !IE )
    {
      TweenMax.killTweensOf( $(".card") );
      TweenMax.to( $(".card"), 1, { rotationY : 0, rotation : 0, delay : .4, ease:Back.easeInOut, onComplete : changeImage });
    }
    else
      changeImage();
  }

  function pareceHandler() {
    sendId(listImagesSosias[_index].id);
    _index++;
    _index++;
    (_index === _total) ? _index = 0 : _index;
    noAbility();
    plaGol();
    flipBack();
  }

  function pareceHandler2() {
    sendId(listImagesSosias[(_index + 1)].id);
    _index++;
    _index++;
    (_index === _total) ? _index = 0 : _index;
    noAbility();
    plaGol();
    flipBack();
  }

  function notPareceHandler() {
    _index++;
    _index++;
    (_index === _total) ? _index = 0 : _index;
    noAbility();
    plaError();
    flipBack();
  }

  function jump() {
    _index++;
    _index++;
    (_index === _total) ? _index = 0 : _index;
    noAbility();
    flipBack();
  }

  function ability() {
    $( ".btn-ok" ).bind( "click", pareceHandler );
    $( ".btn-ok-2" ).bind( "click", pareceHandler2 );
    $( ".btn-not" ).bind( "click", notPareceHandler );
    $( ".btn-jump" ).bind( "click", jump );
  }

  function noAbility() {
    $( ".btn-ok" ).unbind( "click", pareceHandler );
    $( ".btn-ok-2" ).unbind( "click", pareceHandler2 );
    $( ".btn-not" ).unbind( "click", notPareceHandler );
    $( ".btn-jump" ).unbind( "click", jump );
  }

  function changeImage() {
    $(s1).children( ".back" ).children("img").attr( "src", PATHSOSIAS + listImagesSosias[_index].image );
    $(s1).children( ".back" ).find(".name-player h2").text( listImagesSosias[_index].name );
    $(s1).children( ".back" ).find(".name-team p").text( listImagesSosias[_index].cidade );

    $(j1).children( ".back" ).children("img").attr( "src", PATHJOGADORES + listImagesSosias[_index].imageJogador );
    $(j1).children( ".back" ).find(".name-player h2").text( listImagesSosias[_index].jogador );
    $(j1).children( ".back" ).find(".name-team p").text( listImagesSosias[_index].pais );

    $(s2).children( ".back" ).children("img").attr( "src", PATHSOSIAS + listImagesSosias[(_index + 1)].image );
    $(s2).children( ".back" ).find(".name-player h2").text( listImagesSosias[(_index + 1)].name );
    $(s2).children( ".back" ).find(".name-team p").text( listImagesSosias[(_index + 1)].cidade );

    $(j2).children( ".back" ).children("img").attr( "src", PATHJOGADORES + listImagesSosias[(_index + 1)].imageJogador );
    $(j2).children( ".back" ).find(".name-player h2").text( listImagesSosias[(_index + 1)].jogador );
    $(j2).children( ".back" ).find(".name-team p").text( listImagesSosias[(_index + 1)].pais );

    flip();
    ability();
  }

  function openBox( e ) {
    $(".game").css( "display", "none" );
    $(".ranking").css( "display", "block" );

    $.ajax({
       type: 'GET',
        url: e.data.url,
        async: false,
        jsonpCallback: 'jsonp',
        //contentType: "application/json",
        dataType: 'jsonp',
        crossDomain: true,
        success: function(data) {
          jsonRanking = data.sosias;
          totalVotos = 0;
          var _t = data.sosias.length;
          for (var j = 0; j < _t; j++) {
             totalVotos += Number(data.sosias[j].votos);
          }
          addBox();
        },
        error: function(e) {
           console.log("ERRO NOSSO: ", e.message);
        }
    });
  }

  function closeBox() {
    $(".ranking").css( "display", "none" );
    $(".game").css( "display", "block" );
    $(".content-ranking").html("");
  }

  function addBox() {
    for (var i = 0; i < jsonRanking.length; i++)
    {
      //console.log(jsonRanking[i].votos, getPorc(jsonRanking[i].votos));
      var _box = '\
                  <div class="box">\
                    <div class="content-left">\
                      <div class="position">\
                        <h2>'+ (i + 1) + "º" +'</h2>\
                      </div>\
                      <div class="cont-porcentagem">\
                        <h2>' + getPorc(jsonRanking[i].votos) + "%" + '</h2>\
                      </div>\
                    </div>\
                    <div class="card-sosia-ranking">\
                      <img src="'+ getSosia( Number(jsonRanking[i].id), "imagem" ) +'" alt="">\
                      <ul>\
                        <li class="name-player">\
                          <h2>'+ getSosia( Number(jsonRanking[i].id), "nome" ) +'</h2>\
                        </li>\
                      </ul>\
                    </div>\
                    <div class="card-sosia-idolo">\
                      <img src="'+ getPlayer( Number(jsonRanking[i].id), "imagem" ) +'" alt="">\
                      <ul>\
                        <li class="name-player">\
                          <h2>'+ getPlayer( Number(jsonRanking[i].id), "nome" ) +'</h2>\
                        </li>\
                      </ul>\
                    </div>\
                  </div>\
                  ';

      $(".content-ranking").append( _box );
      TweenMax.to( $( ".box" )[i], .5, { scale: 1, opacity : 1, marginTop : 10, rotationX : 0, ease:Power2.easeOut, delay : i * .05 } );
      //TweenMax.from( $( ".box" )[i], .5, { scale: .7, opacity : 0, marginTop : 200, rotationY: 30, rotationX : Math.floor( -(Math.random() * 10) + 80), ease:Power2.easeOut, delay : i * .1 } );
    };
  }

  function overLine(e) {
    switch( this.id )
    {
      case "btn-classificatoria":
        $(this).children(".text-step").children("h2").text("Encerrado");
        break;
      case "btn-oitavas":
        $(this).children(".text-step").children("h2").text("Encerrado");
        break;
      case "btn-quartas":
        $(this).children(".text-step").children("h2").text("Encerrado");
        break;
      case "btn-semi":
        $(this).children(".text-step").children("h2").text("Início em 8/7");
        break;
      case "btn-final":
        $(this).children(".text-step").children("h2").text("Início em 13/7");
        break;
    }
  }

  function outLine(e) {
    var txt = $(this).attr( "data-content" );
    $(this).children(".text-step").children("h2").text(txt);
  }

  function getPorc(value) {
    var por = (value > 0) ? ((Number(value) * 100) / totalVotos ).toFixed(1) : 0;
    return por;
  }

  function getSosia( _id_, item ) {
    switch(item)
    {
      case "imagem" :
        return PATHSOSIAS + listOrigem[(_id_ - 1)].image;
        break;
      case "nome" :
        return listOrigem[(_id_ - 1)].name;
        break;
      case "cidade" :
        return listOrigem[(_id_ - 1)].cidade;
        break;        
    }
  }

  function getPlayer( _id_, item ) {
    switch(item)
    {
      case "imagem" :
        return PATHJOGADORES + listOrigem[(_id_ - 1)].imageJogador;
        break;
      case "nome" :
        return listOrigem[(_id_ - 1)].jogador;
        break;
      case "pais" :
        return listOrigem[(_id_ - 1)].pais;
        break;        
    }
  }

  function sendId(value) {
    $.ajax({
      type: 'POST',
      url: 'http://globo-sosiasdacopa-processavoto-693287173.us-east-1.elb.amazonaws.com/processavoto/votos.php',
      data: { 
          'id': value,
          'r' : fase
      },
      success: function(){}
    });
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape')
    {
      var ua = navigator.userAgent;
      var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat( RegExp.$1 );
    }
    return rv;
  }

}(window));