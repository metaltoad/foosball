<?php

$retvalue = false;

//a very basic script to save some values to the database about the game in progress and return info about it
//so that a 3rd party viewer can see the game in progress and send messages to the players

$secretish_key = "jlkjdsv7809304hjhjaef3$98fddfg";

$mysqli = new mysqli("127.0.0.1", "root", "", "foosball");

if ($mysqli->connect_errno) {
  exit();
}

/*
 * get and set basic session values for the game in play
 */
if(array_key_exists("key", $_POST) && $_POST['key'] == $secretish_key) {
  $mysqli->query("delete from session");

  //read in the post values from the request and populate the current game session table
  $query = "insert into session (player1, player2, player3, player4, "
          . "yellowscore, blackscore, gametime, currentTheme, themedata, player1data, player2data) values("
          . $_POST['player1'] . ","
          . $_POST['player2'] . ","
          . ($_POST['player3'] == "" ? -1 : $_POST['player3']) . ","
          . ($_POST['player4'] == "" ? -1 : $_POST['player4']) . ","
          . $_POST['yellowscore'] . ","
          . $_POST['blackscore'] . ","
          . $_POST['gametime'] . ","
          . "'" . $_POST['currentTheme'] . "',"
          . "'" . addslashes(json_encode($_POST['themedata'])) . "',"
          . "'" . addslashes(json_encode($_POST['player1data'])) . "',"
          . "'" . addslashes(json_encode($_POST['player2data'])) . "'"
          . ")";

  $result = $mysqli->query($query);

  $x = "";
}
else if(array_key_exists ("key", $_GET) && $_GET['key'] == $secretish_key) {
  //get the data from the current session table and return the values
  if ($result = $mysqli->query("select * from session", MYSQLI_USE_RESULT)) {

    $data = $result->fetch_object();

    $result->close();

    $data->themedata = json_decode($data->themedata);
    $data->player1data = json_decode($data->player1data);
    $data->player2data = json_decode($data->player2data);

    $retvalue = $data;
  }
}

$mysqli->close();

echo json_encode($retvalue);

