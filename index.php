<?php
include('DB.php');
session_start();
class User
{
  public $conn;
  public function __construct()
  {
    $db = new DatabaseConnection;
    $this->conn = $db->getConnection();
  }
  public function insert()
  {
    if ($_POST['action'] == 'Login') {
      $obj = (object)$_POST;
      if (empty($obj)) {
        echo "The $obj->key field is empty";
      } else {
        $query = "INSERT INTO user(firstname, username, email, password)VALUES(:firstname,:username,:email,:password)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':firstname', $obj->firstname);
        $stmt->bindParam(':username', $obj->username);
        $stmt->bindParam(':email', $obj->email);
        $stmt->bindParam(':password', md5($obj->password));
        $stmt->execute();
        $lastId = $this->conn->lastInsertId();
        if ($stmt) {
          header("Location: php/home.php");
        } else {
          $e = new PDOException();
          $error = $e->getMessage();
          echo "Error while inserting " . $error;
          header('Location: index.php');
        }
      }
    }
  }
}
$user = new User;
$user->insert();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form</title>
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <div id="root">
    <form method="post">
      <h1>Sign in</h1>
      <p class=err_msg></p>
      <label>
        <h2>Firstname:</h2>
      </label>
      <input type="text" name="firstname" id="fname" placeholder="Enter your first name">

      <label>
        <h2>Username:</h2>
      </label>
      <input type="text" name="username" id="uname" placeholder="Enter your username">

      <label>
        <h2>Email:</h2>
      </label>
      <input type="email" name="email" id="email" placeholder="Enter your email">

      <label>
        <h2>Password:</h2>
      </label>
      <input type="password" name="password" id="psw" placeholder="Enter your password">

      <label>
        <h2>ConfirmPassword:</h2>
      </label>
      <input type="password" id="cpsw" placeholder="Retype password">

      <input type="submit" name="action" class="btn" value="Login">
    </form>
  </div>
  <script src="src/script.js"></script>
</body>

</html>