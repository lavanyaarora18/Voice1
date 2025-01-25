<?php
$host = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "voice";

$conn =  mysqli_connect($host, $dbusername, $dbpassword, $dbname);

$Name = $_POST['Name'];
$Email = $_POST['Email'];
$Msg = $_POST['Msg'];

$sql = "INSERT INTO feedback (Name, Email, Msg) VALUES ('$Name', '$Email', '$Msg')";

if($conn->query($sql))
         {
            echo "<script>
            alert('Thank you for your feedback!');
            window.location.href = 'contactus.html';
            </script>";
         } 
         else{
            echo "<script>
            alert('Sorry, feedback not sent.');
            window.history.back();
            </script>";
         } 

$conn->close();
?>

