<?php

class Book implements JsonSerializable {
    
    private $id;
    private $name;
    private $author;
    private $description;
    
    public function __construct() {
        $this->id = -1;
        $this->name = "";
        $this->author = "";
        $this->description = "";
    }
    public function jsonSerialize() {
        return [
            "id"=> $this->id,
            "name"=>$this->name,
            "author"=> $this->author,
            "description"=> $this->description
        
        ];
    }
            
    function setName($name) {
        $this->name = $name;
    }

    function setAuthor($author) {
        $this->author = $author;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function getId() {
        return $this->id;
    }

    function getName() {
        return $this->name;
    }

    function getAuthor() {
        return $this->author;
    }

    function getDescription() {
        return $this->description;
    }

    static public function loadFromDB(mysqli $connection, $id) {
        $sql = "SELECT * FROM Books WHERE id = ?";
        $result = $connection->prepare($sql);
        $result->bind_param("s", $id);
        $result->execute();
        $result = $result->get_result();
        if ($result == TRUE && $result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $loadedBook = new Book();
            $loadedBook->id = $row["id"];
            $loadedBook->name = $row["name"];
            $loadedBook->author = $row["author"];
            $loadedBook->description = $row["description"];
            
            return $loadedBook;
        }
        return NULL;
    }
    public function create(mysqli $connection, $name, $author) {
        $sql = "INSERT INTO Books(name, author) VALUES(?, ?)";
        $result = $connection->prepare($sql);
        $result->bind_param("ss", $name, $author);
        $result->execute();
        if ($result) {
            return TRUE;
        }
        return FALSE;
    }
    
    public function update(mysqli $connection, $name, $author) {
        $sql = "UPDATE Books SET name = ?, author = ? WHERE id = ?";
        $result = $connection->prepare($sql);
        $result->bind_param("sss", $name, $author, $this->id);
        $result->execute();
        if ($result) {
            return TRUE;
        }
        return FALSE;        
    }
    
    public function delteFromDB(mysqli $connection) {
        if ($this->id != -1) {
            $sql = "DELETE FROM Books WHERE id = ?";
            $result = $connection->prepare($sql);
            $result->bind_param("s", $this->id);
            $result->execute();
            if ($result) {
                return TRUE;
            }
            return FALSE;
        }
    }
    static public function loadAllId(mysqli $connection) {
        $sql = "SELECT id FROM Books";
        $result = $connection->query($sql);
        $ids = array();
        if ($result == TRUE && $result->num_rows > 0) {
            foreach ($result as $row) {
                $ids[] = $row["id"];                
            }
        }
        return $ids;
    }
}

