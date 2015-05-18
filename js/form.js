var Big=Big||{};Big.FORM=Big.FORM||{};Big.FORM.FormValidator={init:function(){$("form").each(function(){var formId=$(this).attr('id');if($(this).data("validate")){var formRules=$(this).data('rules');var formValues=$(this).data('values');if(typeof formValues=='boolean'){formValues=(formValues==1)?'true':'false';}
if((formRules.length>0)||(formValues.length>0)){var rulesArray=formRules.split(',');var valuesArray=formValues.split(',');for(var i=0;i<rulesArray.length;i++){if((valuesArray[i]=="true")||valuesArray[i]=="false"){$.validationEngine.defaults[rulesArray[i]]=(valuesArray[i]=="true")?true:false;}
else{$.validationEngine.defaults[rulesArray[i]]=valuesArray[i];}}}
jQuery("#"+formId).validationEngine('attach',{maxErrorsPerField:1,promptPosition:'centerRight',showArrow:true,addFailureCssClassToField:'require'});}});}}
Big.FORM.formatPhoneDisplay={init:function(){$(".phoneNumber").each(function(){var phone=$(this).html();$(this).html(phone.replace(/(\d{3})(\d{3})(\d{4})/,'($1) $2-$3'));})}}
Big.FORM.newsLetter={init:function(){$("#optInEmail").on('click',function(){if($(this).is(':checked')){$(this).val('yes');}
else{$(this).val('no');}})}}
Big.FORM.formatPhone={init:function(){$("input[name$='phoneNumber']").on('blur',function(){var value=$(this).val();value=value.replace(/[^0-9\s]/gi,'');value=value.substring(0,10);$(this).val(value.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3'));})}}
Big.FORM.multiEmail={init:function()
{$(document).on("blur","#Emailadd",function(event){event.preventDefault();var toEmail=$("#Emailadd").val(),filter=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,mustReturn=true;$('#wishlistTo').html('');var myarray=toEmail.split(",");if(toEmail!=""){for(var i=0;i<myarray.length;i++){if(!filter.test(myarray[i].replace(/^\s+|\s+$/g,""))){if(!filter.test(myarray[i])){$('#wishlistTo').html('* Invalid email address');mustReturn=false;$("#shareWishlistFormId").attr("disabled","disabled");break;}}}}
if(!mustReturn){return false;}else{$("#shareWishlistFormId").removeAttr("disabled");}});}}
Big.FORM.init=function(){Big.FORM.FormValidator.init();Big.FORM.formatPhoneDisplay.init();Big.FORM.newsLetter.init();Big.FORM.multiEmail.init();}
$(document).ready(function(){Big.FORM.init();});