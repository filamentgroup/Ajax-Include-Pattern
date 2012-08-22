/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

	$(function(){

		asyncTest( "ajaxInclude event triggers on the target element and event callback contains markup", 2, function(){
			$( "#ev" )
				.live( "ajaxInclude", function( e, data ){
					ok( true );
					ok( $( data ).length );
					start();
				} )
				.ajaxInclude();
		} );
		
		asyncTest( "Data-before is including content before target element", 1, function(){
			$( "#db" )
				.live( "ajaxInclude", function(){
					ok( $( "#db" ).prev().is( "ul" ) );
					start();
				} )
				.ajaxInclude();
		} );
		
		asyncTest( "Data-after is including content after target element", 1, function(){
			$( "#da" )
				.live( "ajaxInclude", function(){
					ok( $( "#da" ).next().is( "ul" ) );
					start();
				} )
				.ajaxInclude();
		} );
		
		asyncTest( "Data-replace replaces element with included content", 3, function(){
			var dr = $( "#dr" );
			
			ok( dr.length === 1 );
			
			dr
				.live( "ajaxIncludeResponse", function(){
					ok( $(this).parent().length === 0 );
					ok( $( "#dr" ).length === 0 );
					start();
				} )
				.ajaxInclude();
		} );
		
		asyncTest( "Data-append is appending content to target element", 1, function(){
			$( "#dap" )
				.live( "ajaxInclude", function(){
					ok( $( "#dap" ).children().length === 1 );
					start();
				} )
				.ajaxInclude();
		} );
		
		
		
		asyncTest( "Data-media with applicable mq appends content as expected", 1, function(){
			$( "#dm-a" )
				.live( "ajaxInclude", function(){
					ok( $( "#dm-a" ).children().length === 1 );
					start();
				} )
				.ajaxInclude();
		} );
		
		asyncTest( "Data-media with inapplicable mq prevents content from appending (assumes an unexpected request will return within 5 seconds)", 1, function(){
			var response = null;
			$( "#dm-i" )
				.live( "ajaxInclude", function(){
					response = true;
				} )
				.ajaxInclude();
			
			setTimeout( function(){
				ok( response === null );
				start();
			}, 5000 );
		} );
		
		asyncTest( "ajaxIncludeFilter event properly modifies content before inclusion in the page", 3, function(){
			var response;
			
			$( "#filter" )
				.bind( "ajaxIncludeFilter", function( evt, content ){
					response = content;
					return content.replace( /Related/gmi, "Unrelated" );
				} )
				
				.live( "ajaxInclude", function( evt, content ){
					
					ok( "ajaxInclude event fired" );
					ok( content !== response );
					ok( content.indexOf( "Unrelated" ) > -1 );
					start();
				} )
				.ajaxInclude();

		} );
		

		/* tests for whether proxy integration is working */
		if( $( "#proxytests").length ){
			
			
			asyncTest( "Proxy includes multiple ajax includes via 1 request and appends in proper locations", 3, function(){
				$( "#proxy-b" )
					.live( "ajaxInclude", function(){
						ok( $( "#proxy-a" ).children().length === 1 );
						ok( $( "#proxy-b" ).children().length === 1 );
						start();
					} )
					.live( "ajaxIncludeResponse", function( e, data ){
						
						ok( $(data).filter("entry").length === 2 );
						

					} );
					
				$( "#proxy-a, #proxy-b" ).ajaxInclude( { proxy: "functional/quickconcat.php?wrap&files=" } );
			} );
			
			asyncTest( "Same as previous test, but run with deprecated proxy argument API.", 3, function(){
				$( "#proxy-d" )
					.live( "ajaxInclude", function(){
						ok( $( "#proxy-c" ).children().length === 1 );
						ok( $( "#proxy-d" ).children().length === 1 );
						start();
					} )
					.live( "ajaxIncludeResponse", function( e, data ){
						ok( $(data).filter("entry").length === 2 );
						

					} );
					
				$( "#proxy-c, #proxy-d" ).ajaxInclude( "functional/quickconcat.php?wrap&files=" );
			} );
			
			
		}
		
	});



}(jQuery));
