$.EndecaSearchSuggestor=function(ele,opts)
{this._active=true;this._options=opts;this._lastValue='';this._element=ele;this._container=$('<div class="sear-drpdwn '+ this._options.containerClass+'"></div>');this._timeOutId;this._hideTimeOutId;this._selectedIndex=-1;var suggestor=this;$("#searchform").append(this._container);if(!Array.prototype.indexOf){Array.prototype.indexOf=function(obj,start){for(var i=(start||0),j=this.length;i<j;i++){if(this[i]===obj){return i;}}
return-1;}}
ele.keydown(function(e)
{switch(e.keyCode)
{case 38:{if(suggestor._active)
{suggestor.moveToPrev();}
else
{suggestor.show();}
break;}
case 40:{if(suggestor._active)
{suggestor.moveToNext();}
else
{suggestor.show();}
break;}
case 9:{suggestor.hide();break;}
case 13:{if(suggestor._active&&suggestor._selectedIndex!=-1)
{e.preventDefault();suggestor.selectItem();return false;}
break;}
case 27:{if(suggestor._active)
{suggestor.hide();}
break;}
default:{suggestor.handleRequest();}}});ele.blur(function(e)
{var hideFunction=function(){suggestor.hide();};suggestor._hideTimeOutId=setTimeout(hideFunction,200);});};$.EndecaSearchSuggestor.prototype.moveToPrev=function()
{if(this._selectedIndex==-1)
{this._selectedIndex=0;}
else
{if(this._selectedIndex==0)
{return;}
this._selectedIndex--;}
$(".dimResult",this._container).removeClass("selected");$($(".dimResult",this._container).get(this._selectedIndex)).addClass("selected");};$.EndecaSearchSuggestor.prototype.moveToNext=function()
{if(this._selectedIndex==-1)
{this._selectedIndex=0;}
else
{if(this._selectedIndex==$(".dimResult",this._container).size()- 1)
{return;}
this._selectedIndex++;}
$(".dimResult",this._container).removeClass("selected");$($(".dimResult",this._container).get(this._selectedIndex)).addClass("selected");};$.EndecaSearchSuggestor.prototype.selectItem=function()
{if(this._selectedIndex==-1)
{return;}
var url=$("a",$(".dimResult",this._container).get(this._selectedIndex)).attr("href");document.location.href=url;};$.EndecaSearchSuggestor.prototype.hide=function()
{this._container.hide();this._active=false;};$.EndecaSearchSuggestor.prototype.show=function()
{if(this._container.is(":hidden"))
{this.setPosition();this._container.show();this._active=true;this._selectedIndex=-1;}};$.EndecaSearchSuggestor.prototype.handleRequest=function()
{var suggestor=this;var callback=function()
{var text=$.trim(suggestor._element.val());if(text!=suggestor._lastValue)
{if(text.length>=suggestor._options.minAutoSuggestInputLength)
{suggestor.requestData();}
else
{suggestor.hide();}}
suggestor._lastValue=text;};if(this._timeOutId)
{clearTimeout(this._timeOutId);}
this._timeOutId=setTimeout(callback,this._options.delay);};$.EndecaSearchSuggestor.prototype.requestData=function()
{var suggestor=this;var response=$.ajax({url:suggestor.composeUrl(),dataType:'json',async:true,success:function(data){suggestor.showSearchResult(data);}});};$.EndecaSearchSuggestor.prototype.composeUrl=function()
{var url=this._options.autoSuggestServiceUrl;var searchTerm=$.trim(this._element.val());if(url.indexOf('?')==-1)
{url+='?';}
else
{url+='&';}
url+='Dy=1&Ntt='+ searchTerm+'*';return url;};$.EndecaSearchSuggestor.prototype.showSearchResult=function(data)
{var htmlResult=this.processSearchResult(data);if(htmlResult!=null)
{this._container.html(htmlResult);this.bindEventHandler();this.show();}
else
{this.hide();}};$.EndecaSearchSuggestor.prototype.processSearchResult=function(data)
{var dimSearchResult=data.contents[0].autoSuggest[0];if(dimSearchResult!=null)
{dimSearchResult.displayImage=true;return this.generateHtmlContent(dimSearchResult);}
return null;};$.EndecaSearchSuggestor.prototype.generateHtmlContent=function(dimSearchResult){var searchTerm=$.trim(this._element.val());var newContent="";var resultArr=new Array();if(dimSearchResult!=null&&dimSearchResult.dimensionSearchGroups.length>0)
{if(dimSearchResult.title&&$.trim(dimSearchResult.title)!="")
{}
var dimSearchGroupList=dimSearchResult.dimensionSearchGroups;var loopVal=0;if(dimSearchGroupList.length>8){loopVal=8;}
else{loopVal=dimSearchGroupList.length;}
for(var i=0;i<loopVal;i++)
{var dimResultGroup=dimSearchGroupList[i];var displayName=dimResultGroup.displayName;if(displayName=="sku.ColorDesc")
{displayName="Color";}
else if(displayName=="product.brandName")
{displayName="Brand";}else if(displayName=="product.category")
{displayName="Category";}
if(displayName=="Color"||displayName=="Brand"||displayName=="Category")
{newContent+='<ul>';newContent+='<li><h6>'+ displayName+'</h6></li>';for(var j=0;j<dimResultGroup.dimensionSearchValues.length;j++)
{var dimResult=dimResultGroup.dimensionSearchValues[j];var text=dimResult.label;var ancestors=dimResult.ancestors;var count=dimResult.count==null?'':'&nbsp;('+dimResult.count+')';if(resultArr.indexOf(text)==-1){resultArr.push(text);}
var ancestorsStr="";if(ancestors!=null&&ancestors.length>0)
{for(var n=1;n<ancestors.length;n++)
{ancestorsStr+=this.ancestorsStrHighlight(ancestors[n].label)+" > ";}}
this.generateDynamicUrl(this.highlightMatched(text),dimResult.navigationState,displayName);if(dimSearchResult.displayImage)
{var imageUrl="";if($.trim(dimResult.properties.img_url_thumbnail)!='')
{imageUrl=dimResult.properties.img_url_thumbnail;}
else
{imageUrl=this._options.defaultImage;}
newContent+='<li><a href="'+ this._options.searchUrl+'">'
+ ancestorsStr+ this.highlightMatched(text)+'</a>'+count+'</li>';}
else
{if(resultArr.indexOf(text)==-1){newContent.append('<li><a href="'+ this._options.searchUrl+'">'
+ ancestorsStr+ this.highlightMatched(text)+'</a>'+count+'</li>');}}}
newContent+='</ul>';newContent+='</div>';}}}
var inv=$("#searchText");var orignal=inv.val();var firstElementText="";for(var i=0;i<resultArr.length;i++){firstElementText=resultArr[i];if(firstElementText.toLowerCase().indexOf(orignal.toLowerCase())===0){var remainingText=firstElementText.substring(orignal.length,firstElementText.length);inv.val(orignal+remainingText);this.selectRange(inv,orignal.length,firstElementText.length);break;}}
if(newContent!=null)
{return newContent;}};$.EndecaSearchSuggestor.prototype.ancestorsStrHighlight=function(text)
{var inputText=$.trim(this._element.val()).replace(/\s+/g,'').toLowerCase();var highlighted=(text).toLowerCase();if(highlighted.indexOf(inputText)!=-1)
{var index=highlighted.indexOf(inputText);var prefix=text.substring(0,index);var suffix=text.substring(index+ inputText.length);inputText=text.substr(index,inputText.length);highlighted=''+prefix+'<b style="color:black">'+ inputText+'</b>'+ suffix;}
return highlighted;}
$.EndecaSearchSuggestor.prototype.selectRange=function(inv,start,end){var field=inv.get(0);if(field.createTextRange){var selRange=field.createTextRange();selRange.collapse(true);selRange.moveStart("character",start);selRange.moveEnd("character",end);selRange.select();}else if(field.setSelectionRange){field.setSelectionRange(start,end);}else{if(field.selectionStart){field.selectionStart=start;field.selectionEnd=end;}}
field.focus();}
$.EndecaSearchSuggestor.prototype.highlightMatched=function(text)
{var inputText=$.trim(this._element.val()).replace(/\s+/g,'').toLowerCase();var highlighted=(text).toLowerCase();if(highlighted.indexOf(inputText)!=-1)
{var index=highlighted.indexOf(inputText);var prefix=text.substring(0,index);var suffix=text.substring(index+ inputText.length);inputText=text.substr(index,inputText.length);highlighted=''+prefix+'<b style="color:black">'+ inputText+'</b>'+ suffix;}
return highlighted;};$.EndecaSearchSuggestor.prototype.bindEventHandler=function()
{var suggestor=this;$(".dimResult",this._container).mouseover(function(e)
{$(".dimResult",suggestor._container).removeClass("selected");$(this).addClass("selected");suggestor._selectedIndex=$(".dimResult",suggestor._container).index($(this));});$(".dimResult",this._container).click(function(e)
{suggestor.selectItem();});$("a",$(".dimResult",this._container)).click(function(e)
{e.preventDefault();suggestor.selectItem();});$(".dimRoots",this._container).click(function()
{clearTimeout(suggestor._hideTimeOutId);suggestor._element.focus();});};$.EndecaSearchSuggestor.prototype.setPosition=function()
{var offset=this._element.offset();this._container.css({top:'1px',left:'',width:''});};$.EndecaSearchSuggestor.prototype.generateDynamicUrl=function(text,nValue,pDisplayName)
{nValue=nValue.substr(1,nValue.length);if(pDisplayName=='Brand'){var url=$(".brandUrl").val()+nValue;}else{var url=$(".browseUrl").val()+nValue;}
this._options.searchUrl=url;return url;};$.fn.endecaSearchSuggest=function(options)
{var opts=$.extend({},$.fn.endecaSearchSuggest.defaults,options);this.each(function()
{var element=$(this);new $.EndecaSearchSuggestor(element,opts);});};$.fn.endecaSearchSuggest.defaults={minAutoSuggestInputLength:4,displayImage:false,delay:250,autoSuggestServiceUrl:'',collection:'',searchUrl:'',containerClass:'dimSearchSuggContainer',defaultImage:'no_image.gif'};