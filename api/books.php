<?php
require_once 'src/Book.php';
require_once 'src/connection.php';
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $booksId = Book::loadAllId($conn);
    $newIdTab = [];
    $newTabSerialized = [];
    foreach ($booksId as $id) {
        $newId = Book::loadFromDB($conn, $id);
        $serializedId = json_encode($newId);
        $newIdTab[] = $newId;
        $newTabSerialized[] = $serializedId;
    }
    var_dump($newIdTab);
    var_dump($newTabSerialized);

}

