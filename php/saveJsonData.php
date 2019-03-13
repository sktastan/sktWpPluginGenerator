<?php 

	/* Save new file */
	function saveJsonData(){

		// get ajax data
		$phpData = file_get_contents('php://input');
		$obj = json_decode( $phpData );

		//if(file_exists($obj->fileNamePath) {	

		if (!is_dir($obj->fileNamePath)) {
		    mkdir($obj->fileNamePath, 0777, true);		    
		}		
								    
		$phpfile = fopen($obj->fileNamePath . '/' . $obj->fileName, 'w');
				
		if ($phpfile != null) {
		    fwrite($phpfile, $obj->data);
			fclose($phpfile);
			echo 'Json File saved!';		    	    	
		} else{
			fclose($phpfile);
			echo '<script type="text/javascript">alert("write error!...");</script>';
		}

		// }
		// else{		
		// 	echo '<script type="text/javascript">alert("write error!...");</script>';
		// }		

	}

	saveJsonData();
		
?>