<?php
function db() {
    try {
        $config = require "config.php";
        $db = new PDO("mysql:host=".$config['db_host'].";dbname=".$config['db_name'].";", $config['db_usern'], $config['db_passw']);
        return $db;
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
function searchTitle($query) {
    echo json_encode(
        db()->query("SELECT * FROM `country` WHERE `Name` LIKE '%$query%' ORDER BY `name`")->fetchAll(PDO::FETCH_CLASS)
    );
}
function getCountry($query) {
    echo json_encode(
        db()->query("SELECT * FROM `country` WHERE `Name` = '$query'")->fetchAll(PDO::FETCH_CLASS)
    );
}
if (isset($_GET['c'])) {
    $query = filter_var($_GET['c'], FILTER_SANITIZE_STRING);
    if (!$query) {
        echo "";
        return;
    }
    getCountry($query);
} elseif (isset($_GET['q'])) {
    $query = filter_var($_GET['q'], FILTER_SANITIZE_STRING);
    if (!$query) {
        echo "";
        return;
    }
    searchTitle($query);
}
