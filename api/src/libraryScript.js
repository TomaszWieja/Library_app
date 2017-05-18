$(document).ready(function() {
    
    function loadAllBooks() {
        
        $("#booksList tr").remove();

        $.ajax({
            url: "api/books.php",
            data: {},
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                for (var book of data) {
                    $("#booksList").append("<tr><td class='bookName' data-id='"+book.id+"'>"+book.name+"</td>\n\
                                                <td><button data-delId='"+book.id+"'>Usuń książkę</button></td></tr>\n\
                                            <tr><td id='div"+book.id+"'>"+book.author+"</td>\n\
                                                <td><button id='edit'>Edytuj</button></td></tr>\n\
                                            <tr><td id='editTdName'><input id='editName' type='text' name='name' placeholder='Nowy tytuł'></td>\n\
                                                <td id='editTdAuthor'><input id='editAuthor' type='text' name='author' placeholder='Nowy autor'></td>\n\
                                                <td><button id='confirm' data-editid='"+book.id+"'>Zmień</button></td></tr>");
                    $('form').find("input[type=text], textarea").val("");
                }
            },
            error: function( xhr, status, errorThrown ) {
                console.log(xhr);
                console.log(status);
                console.log(errorThrown);
            }
        });
    }
    
    function isset(object){
        return (typeof object !=='undefined');
    }
    
    loadAllBooks();

    $("#booksList").on("click", "td", function (e) {
        var classTd = $(this).attr("class");
        if (classTd == "bookName") {
            $(this).parent().next().toggle();   
        }
    });
    
    $("#booksList").on("click", "button", function (e) {
        var buttonId = $(this).attr("id");
        if (buttonId == "edit") {
            $(this).parent().parent().next().toggle();
        }
    });
    
    $("#button").on("click", function () {
        var name = $("#inputName").val();
        var author = $("#inputAuthor").val();
        if (name != "" && author != "") {
            $.ajax({
                url: "api/books.php",
                data: {'name': name, 'author': author},
                type: 'POST',
                dataType: 'json',
                success: function (data) {

                        loadAllBooks();

                },
                error: function( xhr, status, errorThrown ) {
                    console.log(xhr);
                    console.log(status);
                    console.log(errorThrown);
                }
            });
        }
    });
    
    $("#booksList").on("click", "button", function (e) {
  
        if (isset($(this).data("delid"))) {
            var delId = $(this).data("delid");
            $.ajax({
                url: "api/books.php",
                data: {'id': delId},
                type: 'DELETE',
                dataType: 'json',
                success: function (data) {
                    loadAllBooks();
                },
                error: function( xhr, status, errorThrown ) {
                    console.log(xhr);
                    console.log(status);
                    console.log(errorThrown);
                }
            });
        } else if (isset($(this).data("editid")))  {
            
            var editId = $(this).data("editid");
            var name = $(this).parent().parent().children("#editTdName").children().val();
            var author = $(this).parent().parent().children("#editTdAuthor").children().val();
            
            if (name != "" && author != "") {
            
                $.ajax({
                    url: "api/books.php",
                    data: {
                        'id': editId,
                        'name': name,
                        'author': author                        
                    },
                    type: 'PUT',
                    dataType: 'json',
                    success: function (data) {
                        loadAllBooks();
                    },
                    error: function( xhr, status, errorThrown ) {
                        console.log(xhr);
                        console.log(status);
                        console.log(errorThrown);
                    }
                });
            }
        }
    });   
});