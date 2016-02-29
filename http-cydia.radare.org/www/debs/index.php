<html>
<head>
<title>radare cydia repository</title>
<meta name="viewport" content="width=320, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=false" />
<style>
body,h1,h2,a,img {
	font-family: Verdana, Sans-Serif, Arial;
	vertical-align: top;
	border:0px;
	padding:0px;
	spacing:0px;
	text-decoration:none;
}
</style>
</head>
<body>
<center>
<div style="text-align:left;width:300px;background-color:#ffffff">
<a href="../">back</a>
<hr size=1 width="100%" />
<table style="width: 100%">
<?php
/* TODO: sort by name */
$files = scandir ("./");
foreach ($files as $f) {
	if ($f[0]=='.') continue;
	$w = explode ("_", $f);
	if (count ($w)>2)
		print "<tr><td><a href='$f'>".$w[0]."</a></td><td align=right>".$w[1]."</td></tr>";
}
?>
</table>
</div>
</center>
</body>
</html>
