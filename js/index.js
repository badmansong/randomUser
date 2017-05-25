$(function(){
  
  //切換畫面開始
  var NOW = 0, userCount;

  
  function nextHandler(){
    if(NOW<userCount-1){
    NOW++
    }else{
      NOW =0
    }
    SHOW()
  }
  
  function prevHandler(){
    if(NOW>0){
      NOW--
    }else{
      NOW=userCount-1
    }
    SHOW()
  }
  
  function SHOW(){
    $('.randomBox').stop().animate({left:-1*768*NOW+'px'})
  }
    $('.toLeft , .toRight').on('click',function(){
      if($(this).is('.toLeft')){
        prevHandler()
      }else{
        nextHandler()
      }
    })
  
  //切換畫面結束
  
  //載入畫面開始
  function init(res){
    $.each(res.results,function(index,val){
      var user = val
      var photo = user.picture.large
      var name = user.name.first +" "+ user.name.last
      var mail = user.email
      var bd = user.dob
      var phone = user.phone
      var home = user.location.state+" "+user.location.city+" "+user.location.street
      userCount=res.results.length
      var tag = '<div class="randomBox"><div class="pic pic'+index+'"></div><div class="info"><p></p><h3></h3></div><div class="infoBox"><ul><li class="name" data-title="你好!我的名子是" data-info="'+name+'"><i class="fa fa-user-o" aria-hidden="true"></i></li><li class="mail" data-title="我的E-mail是" data-info="'+mail+'"><i class="fa fa-envelope-o" aria-hidden="true"></i></li><li class="birthday" data-title="我的生日是" data-info="'+bd.substr(0,10)+'"><i class="fa fa-calendar" aria-hidden="true"></i></li><li class="home" data-title="我家住在" data-info="'+home+'"><i class="fa fa-map-marker" aria-hidden="true"></i></li><li class="phone" data-title="我的電話是" data-info="'+phone+'"><i class="fa fa-phone" aria-hidden="true"></i></li></ul></div></div>';
     $('.wrap').append(tag)
      $('.pic'+index).css({'backgroundImage':'url("'+photo+'")'})

      $('.infoBox li').on('mouseover',function(){
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().parent().siblings('.info').find('h3').html($(this).data('info'))
        $(this).parent().parent().siblings('.info').find('p').html($(this).data('title'))
        })
    })
    $('.name').trigger('mouseover') 
  }
    //載入畫面結束
    //輸入產生數量開始
      $('#btn').on('click',function(){
        if($('#count').val()>20 || $('#count').val()<1){
          alert('請輸入1~20數字')
        }else{
          
        count = $('#count').val()
        loadAjax(count) 
        }
    if(count>1){
      $('.toLeft,.toRight').css({display:'block','opacity':'0'}).animate({opacity:1})
    }
    })
  //輸入產生數量結束
  function loadAjax(count){
  $.ajax({
    url:'https://randomuser.me/api/',
    datatype: 'json',
    data:{results:count}
  }).done(function(res){
    init(res)
    })
  }
  $(window).on('load',loadAjax(1))
})