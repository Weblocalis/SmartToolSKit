/*
*VenoBox-jQueryPlugin
*version:1.6.0
*@requiresjQuery
*
*Examplesathttp://lab.veno.it/venobox/
*License:MITLicense
*LicenseURI:https://github.com/nicolafranchini/VenoBox/blob/master/LICENSE
*Copyright2013-2024NicolaFranchini-@nicolafranchini
*
*/
(function($){

varautoplay,bgcolor,blocknum,blocktitle,border,core,container,content,dest,
evitacontent,evitanext,evitaprev,extraCss,figliall,framewidth,frameheight,
infinigall,items,keyNavigationDisabled,margine,numeratio,overlayColor,overlay,
prima,title,thisgall,thenext,theprev,type,
finH,sonH,nextok,prevok;

$.fn.extend({
//pluginname-venobox
venobox:function(options){

//defaultoption
vardefaults={
framewidth:'',
frameheight:'',
border:'0',
bgcolor:'#fff',
titleattr:'title',//specificattributetogetatitle(e.g.[data-title])-thanx@mendezcode
numeratio:false,
infinigall:false,
overlayclose:true//disableoverlayclick-close-thanx@martybalandis
};

varoption=$.extend(defaults,options);

returnthis.each(function(){
varobj=$(this);

//Preventdoubleinitialization-thanx@matthistuff
if(obj.data('venobox')){
returntrue;
}

obj.addClass('vbox-item');
obj.data('framewidth',option.framewidth);
obj.data('frameheight',option.frameheight);
obj.data('border',option.border);
obj.data('bgcolor',option.bgcolor);
obj.data('numeratio',option.numeratio);
obj.data('infinigall',option.infinigall);
obj.data('overlayclose',option.overlayclose);
obj.data('venobox',true);

obj.click(function(e){
e.stopPropagation();
e.preventDefault();
obj=$(this);
overlayColor=obj.data('overlay');
framewidth=obj.data('framewidth');
frameheight=obj.data('frameheight');
//setdata-autoplay="true"forvimeoandyoutubevideos-thanx@zehfernandes
autoplay=obj.data('autoplay')||false;
border=obj.data('border');
bgcolor=obj.data('bgcolor');
nextok=false;
prevok=false;
keyNavigationDisabled=false;

//setadifferenturltobeloadedviaajaxusingdata-href=""-thanx@pixeline
dest=obj.data('href')||obj.attr('href');
extraCss=obj.data('css')||"";

$('body').addClass('vbox-open');
core='<divclass="vbox-overlay'+extraCss+'"style="background:'+overlayColor+'"><divclass="vbox-preloader">Loading...</div><divclass="vbox-container"><divclass="vbox-content"></div></div><divclass="vbox-title"></div><divclass="vbox-num">0/0</div><divclass="vbox-close">X</div><divclass="vbox-next">next</div><divclass="vbox-prev">prev</div></div>';

$('body').append(core);

overlay=$('.vbox-overlay');
container=$('.vbox-container');
content=$('.vbox-content');
blocknum=$('.vbox-num');
blocktitle=$('.vbox-title');

content.html('');
content.css('opacity','0');

checknav();

overlay.css('min-height',$(window).outerHeight());

//fadeinoverlay
overlay.animate({opacity:1},250,function(){

if(obj.data('type')=='iframe'){
loadIframe();
}elseif(obj.data('type')=='inline'){
loadInline();
}elseif(obj.data('type')=='ajax'){
loadAjax();
}elseif(obj.data('type')=='vimeo'){
loadVimeo(autoplay);
}elseif(obj.data('type')=='youtube'){
loadYoutube(autoplay);
}else{
content.html('<imgsrc="'+dest+'">');
preloadFirst();
}
});

/*--------CHECKNEXT/PREV--------*/
functionchecknav(){

thisgall=obj.data('gall');
numeratio=obj.data('numeratio');
infinigall=obj.data('infinigall');

items=$('.vbox-item[data-gall="'+thisgall+'"]');

if(items.length>1&&numeratio===true){
blocknum.html(items.index(obj)+1+'/'+items.length);
blocknum.show();
}else{
blocknum.hide();
}

thenext=items.eq(items.index(obj)+1);
theprev=items.eq(items.index(obj)-1);

if(obj.attr(option.titleattr)){
title=obj.attr(option.titleattr);
blocktitle.show();
}else{
title='';
blocktitle.hide();
}

if(items.length>1&&infinigall===true){

nextok=true;
prevok=true;

if(thenext.length<1){
thenext=items.eq(0);
}
if(items.index(obj)<1){
theprev=items.eq(items.index(items.length));
}

}else{

if(thenext.length>0){
$('.vbox-next').css('display','block');
nextok=true;
}else{
$('.vbox-next').css('display','none');
nextok=false;
}
if(items.index(obj)>0){
$('.vbox-prev').css('display','block');
prevok=true;
}else{
$('.vbox-prev').css('display','none');
prevok=false;
}
}
}

/*--------NAVIGATIONCODE--------*/
vargallnav={

prev:function(){

if(keyNavigationDisabled){
return;
}else{
keyNavigationDisabled=true;
}

overlayColor=theprev.data('overlay');

framewidth=theprev.data('framewidth');
frameheight=theprev.data('frameheight');
border=theprev.data('border');
bgcolor=theprev.data('bgcolor');
dest=theprev.data('href')||theprev.attr('href');

autoplay=theprev.data('autoplay');

if(theprev.attr(option.titleattr)){
title=theprev.attr(option.titleattr);
}else{
title='';
}

if(overlayColor===undefined){
overlayColor="";
}

content.animate({opacity:0},500,function(){

overlay.css('background',overlayColor);

if(theprev.data('type')=='iframe'){
loadIframe();
}elseif(theprev.data('type')=='inline'){
loadInline();
}elseif(theprev.data('type')=='ajax'){
loadAjax();
}elseif(theprev.data('type')=='youtube'){
loadYoutube(autoplay);
}elseif(theprev.data('type')=='vimeo'){
loadVimeo(autoplay);
}else{
content.html('<imgsrc="'+dest+'">');
preloadFirst();
}
obj=theprev;
checknav();
keyNavigationDisabled=false;
});

},

next:function(){

if(keyNavigationDisabled){
return;
}else{
keyNavigationDisabled=true;
}

overlayColor=thenext.data('overlay');

framewidth=thenext.data('framewidth');
frameheight=thenext.data('frameheight');
border=thenext.data('border');
bgcolor=thenext.data('bgcolor');
dest=thenext.data('href')||thenext.attr('href');
autoplay=thenext.data('autoplay');

if(thenext.attr(option.titleattr)){
title=thenext.attr(option.titleattr);
}else{
title='';
}

if(overlayColor===undefined){
overlayColor="";
}

content.animate({opacity:0},500,function(){

overlay.css('background',overlayColor);

if(thenext.data('type')=='iframe'){
loadIframe();
}elseif(thenext.data('type')=='inline'){
loadInline();
}elseif(thenext.data('type')=='ajax'){
loadAjax();
}elseif(thenext.data('type')=='youtube'){
loadYoutube(autoplay);
}elseif(thenext.data('type')=='vimeo'){
loadVimeo(autoplay);
}else{
content.html('<imgsrc="'+dest+'">');
preloadFirst();
}
obj=thenext;
checknav();
keyNavigationDisabled=false;
});

}

};

/*--------NAVIGATEWITHARROWKEYS--------*/
$('body').keydown(function(e){

if(e.keyCode==37&&prevok==true){//left
gallnav.prev();
}

if(e.keyCode==39&&nextok==true){//right
gallnav.next();
}

});

/*--------PREVGALL--------*/
$('.vbox-prev').click(function(){
gallnav.prev();
});

/*--------NEXTGALL--------*/
$('.vbox-next').click(function(){
gallnav.next();
});

/*--------ESCAPEHANDLER--------*/
functionescapeHandler(e){
if(e.keyCode===27){
closeVbox();
}
}

/*--------CLOSEVBOX--------*/

functioncloseVbox(){

$('body').removeClass('vbox-open');
$('body').unbind('keydown',escapeHandler);

overlay.animate({opacity:0},500,function(){
overlay.remove();
keyNavigationDisabled=false;
obj.focus();
});
}

/*--------CLOSECLICK--------*/
varcloseclickclass='.vbox-close,.vbox-overlay';
if(!obj.data('overlayclose')){
closeclickclass='.vbox-close';//closeonlyonX
}

$(closeclickclass).click(function(e){
evitacontent='.figlio';
evitaprev='.vbox-prev';
evitanext='.vbox-next';
figliall='.figlio*';
if(!$(e.target).is(evitacontent)&&!$(e.target).is(evitanext)&&!$(e.target).is(evitaprev)&&!$(e.target).is(figliall)){
closeVbox();
}
});
$('body').keydown(escapeHandler);
returnfalse;
});
});
}
});

/*--------LOADAJAX--------*/
functionloadAjax(){
$.ajax({
url:dest,
cache:false
}).done(function(msg){
content.html('<divclass="vbox-inline">'+msg+'</div>');
updateoverlay(true);

}).fail(function(){
content.html('<divclass="vbox-inline"><p>Errorretrievingcontents,pleaseretry</div>');
updateoverlay(true);
})
}

/*--------LOADIFRAME--------*/
functionloadIframe(){
content.html('<iframeclass="venoframe"src="'+dest+'"></iframe>');
//$('.venoframe').load(function(){//validonlyforiFramesinsamedomain
updateoverlay();
//});
}

/*--------LOADVIMEO--------*/
functionloadVimeo(autoplay){
varpezzi=dest.split('/');
varvideoid=pezzi[pezzi.length-1];
varstringAutoplay=autoplay?"?autoplay=1":"";
content.html('<iframeclass="venoframe"webkitallowfullscreenmozallowfullscreenallowfullscreenframeborder="0"src="//player.vimeo.com/video/'+videoid+stringAutoplay+'"></iframe>');
updateoverlay();
}

/*--------LOADYOUTUBE--------*/
functionloadYoutube(autoplay){
varpezzi=dest.split('/');
varvideoid=pezzi[pezzi.length-1];
varstringAutoplay=autoplay?"?autoplay=1":"";
content.html('<iframeclass="venoframe"webkitallowfullscreenmozallowfullscreenallowfullscreensrc="//www.youtube.com/embed/'+videoid+stringAutoplay+'"></iframe>');
updateoverlay();
}

/*--------LOADINLINE--------*/
functionloadInline(){
content.html('<divclass="vbox-inline">'+$(dest).html()+'</div>');
updateoverlay();
}

/*--------PRELOADIMAGE--------*/
functionpreloadFirst(){
prima=$('.vbox-content').find('img');
prima.one('load',function(){
updateoverlay();
}).each(function(){
if(this.complete)$(this).load();
});
}

/*--------CENTERONLOAD--------*/
functionupdateoverlay(){

blocktitle.html(title);
content.find(">:first-child").addClass('figlio');
$('.figlio').css('width',framewidth).css('height',frameheight).css('padding',border).css('background',bgcolor);

sonH=content.outerHeight();
finH=$(window).height();

if(sonH+80<finH){
margine=(finH-sonH)/2;
content.css('margin-top',margine);
content.css('margin-bottom',margine);

}else{
content.css('margin-top','40px');
content.css('margin-bottom','40px');
}
content.animate({
'opacity':'1'
},'slow');
}

/*--------CENTERONRESIZE--------*/
functionupdateoverlayresize(){
if($('.vbox-content').length){
sonH=content.height();
finH=$(window).height();

if(sonH+80<finH){
margine=(finH-sonH)/2;
content.css('margin-top',margine);
content.css('margin-bottom',margine);
}else{
content.css('margin-top','40px');
content.css('margin-bottom','40px');
}
}
}

$(window).resize(function(){
updateoverlayresize();
});

})(jQuery);