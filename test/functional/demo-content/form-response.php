<p>The form was successfully submitted<!-- <?php echo '--' . '>'; ?>
<?php
if( !empty( $_POST ) ) {
	echo ' through POST';
} else if( !empty( $_GET ) ) {
	echo ' through GET';
}
?>
<?php echo '<!' . '--'; ?> -->.</p>
<!-- <?php echo '--' . '>'; ?>
<?php
foreach( $_REQUEST as $key => $val ) {
	echo $key . '=' . $val . '<br/>';
}
?>
<?php echo '<!' . '--'; ?> -->