<?php
if ($_SERVER['HTTP_HOST'] !== 'localhost') {
  $db_host = '127.0.0.1'; // Server Name
  $db_user = 'c3617test'; // Username
  $db_pass = 'test'; // Password
  $db_name = 'c3617world'; // Database Name
      } else {
        $db_host = 'localhost'; // Server Name
        $db_user = 'root'; // Username
        $db_pass = ''; // Password
        $db_name = 'world'; // Database Name
      }

    return $config;
?>
