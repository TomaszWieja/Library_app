$(document).ready(function() {
 
    $.ajax({
        url: "api/books.php",
        data: {},
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            for (var book of data) {
                //console.log(book);
                $("#booksList").append("<li data-id='"+book.id+"'>"+book.name+"</li><div id='div"+book.id+"'></div>");
            }
        },
        error: function( xhr, status, errorThrown ) {},
        complete: function( xhr, status ) {}
    });
    //console.log($("#booksList"));
    $("#booksList").on("click", "li", function (e) {
        var id = $(this).data("id");
        $.ajax({
            url: "api/books.php",
            data: {'id': id},
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $("#div"+data.id).text(data.author);
            },
            error: function( xhr, status, errorThrown ) {},
            complete: function( xhr, status ) {}
        });
        //console.log(id);
    });
    
});


