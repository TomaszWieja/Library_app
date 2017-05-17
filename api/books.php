<?php
require_once 'src/Book.php';
require_once 'src/connection.php';
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    
    
    $bookId = filter_input(INPUT_GET, "id", FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    if (isset($bookId)) {
        $bookDetails = Book::loadFromDB($conn, $bookId);
        echo json_encode($bookDetails);
    } else {
        $booksId = Book::loadAllId($conn);
        $newIdTab = [];
        foreach ($booksId as $id) {
            $newId = Book::loadFromDB($conn, $id);
            $newIdTab[] = $newId;
        }
        echo json_encode($newIdTab);
    }
} elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
    
    $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $author = filter_input(INPUT_POST, "author", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    
    if (isset($name) && isset($author)) {
    
        $newBook = new Book();
        $newBook->create($conn, $name, $author);
        if ($newBook) {
            echo TRUE;
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] == "DELETE") {
    parse_str(file_get_contents("php://input"), $del_vars);
    
    $id = $del_vars["id"];
    $bookToBeDeleted = Book::loadFromDB($conn, $id);
    $bookToBeDeleted->delteFromDB($conn);
    if ($bookToBeDeleted) {
        echo TRUE;
    }
}

