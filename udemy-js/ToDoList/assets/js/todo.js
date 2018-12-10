console.log('connected');

//"Complete" items
$("ul").on("click","li", function(){
    $(this).toggleClass("completed");
});

//Remove item from list
$("ul").on("click","span", function(event){
    event.stopPropagation();
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });
    
});

$("input").keypress(function (event){
    if(event.which === 13){
        var newItem = $(this).val();
        $("ul").append("<li><span>X </span>" + newItem + "</li>");
        $(this).val("");
    }
    
});