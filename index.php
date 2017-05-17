<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script src="api/src/libraryScript.js"></script>
    </head>
    <body>
        <form>
            <label>Tytuł</label>
            <input id='inputName' type="text" name="name" placeholder="Tytuł"><br>
            <label>Autor</label>
            <input id="inputAuthor" type="text" name="author" placeholder="Autor"><br>
            <input id="button" type="button" value="Dodaj książkę">
        </form>
        <ul id="booksList" style="list-style-type:none">
            
        </ul>
    </body>
</html>
