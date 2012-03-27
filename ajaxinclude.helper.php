<?php
$type = 'text/html';

$filelist = $_REQUEST[ "files" ];

$files = explode( ",", $filelist );

// Get the filetype and array of files
if ( ! isset($type) || ! isset($files) ){
	echo '$type and $files must be specified!';
	exit;
}

// sanitize input here... :)

$contents = '';

// Loop through the files adding them to a string
foreach ( $files as $file ) {
	$contents .= "<page url=\"". $file . "\">" . file_get_contents($file). "</page>\n\n";
}

// Set the content type, filesize and an expiration so its not cached
header('Content-Type: ' . $type);
header('Content-Length: ' . strlen($contents));

// Deliver the file
echo $contents;
