$(document).ready(function() {
    
    function loadAllBooks() {
        $("#booksList li").remove();
        $("#booksList a").remove();
        $("#booksList div").remove();
        $.ajax({
            url: "api/books.php",
            data: {},
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                for (var book of data) {
                    $("#booksList").append("<li data-id='"+book.id+"'>"+book.name+"</li><a data-delid='"+book.id+"'>Usuń książkę</a><div id='div"+book.id+"'></div>");
                }
            },
            error: function( xhr, status, errorThrown ) {},
            complete: function( xhr, status ) {}
        });
    }
    
    loadAllBooks();
    
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
    });
    
    $("#button").on("click", function () {
        var name = $("#inputName").val();
        var author = $("#inputAuthor").val();
        $.ajax({
            url: "api/books.php",
            data: {'name': name, 'author': author},
            type: 'POST',
            dataType: 'json',
            success: function (data) {

                    loadAllBooks();
                
            },
            error: function( xhr, status, errorThrown ) {},
            complete: function( xhr, status ) {}
        });
    });
    
    $("#booksList").on("click", "a", function (e) {
        var id = $(this).data("delid");
        $.ajax({
            url: "api/books.php",
            data: {'id': id},
            type: 'DELETE',
            dataType: 'json',
            success: function (data) {

                loadAllBooks();
            },
            error: function( xhr, status, errorThrown ) {},
            complete: function( xhr, status ) {}
        });
    });
});


