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
				.bind( "ajaxInclude", function( e, data ){
					ok( true );
					ok( $( data ).length );
					start();
				})
				.ajaxInclude();
		});

		asyncTest( "ajaxInclude event triggers on data-replace on the target element and event callback contains markup", 2, function(){
			$( "#dr-ev" )
				.bind( "ajaxInclude", function( e, data ){
					ok( true );
					ok( $( data ).length );
					start();
				})
				.ajaxInclude();
		});

		asyncTest( "Data-before is including content before target element", 1, function(){
			$( "#db" )
				.bind( "ajaxInclude", function(){
					ok( $( "#db" ).prev().is( "ul" ) );
					start();
				} )
				.ajaxInclude();
		} );

		asyncTest( "Data-after is including content after target element", 1, function(){
			$( "#da" )
				.bind( "ajaxInclude", function(){
					ok( $( "#da" ).next().is( "ul" ) );
					start();
				} )
				.ajaxInclude();
		} );

		asyncTest( "Data-replace replaces element with included content", 3, function(){
			var dr = $( "#dr" );

			ok( dr.length === 1 );

			dr.bind( "ajaxInclude", function(){
				var self = this;

				// the event runs before the replace with, so let the stack unwind and then check
				setTimeout(function() {
					ok( $( self ).parent().length === 0 );
					ok( $( "#dr" ).length === 0 );

					start();
				});
			}).ajaxInclude();
		});

		asyncTest( "Data-append is appending content to target element", 1, function(){
			$( "#dap" )
				.bind( "ajaxInclude", function(){
					ok( $( "#dap" ).children().length === 1 );
					start();
				})
				.ajaxInclude();
		});



		asyncTest( "Data-media with applicable mq appends content as expected", 1, function(){
			$( "#dm-a" )
				.bind( "ajaxInclude", function(){
					ok( $( "#dm-a" ).children().length === 1 );
					start();
				})
				.ajaxInclude();
		});

		asyncTest( "Data-media with inapplicable mq prevents content from appending (assumes an unexpected request will return within 5 seconds)", 1, function(){
			var response = null;
			$( "#dm-i" )
				.bind( "ajaxInclude", function(){
					response = true;
				})
				.ajaxInclude();

			setTimeout( function(){
				ok( response === null );
				start();
			}, 5000 );
		});

		asyncTest( "ajaxIncludeFilter event properly modifies content before inclusion in the page", 3,
 function(){
			var response;

			$( "#filter" )
				.bind( "ajaxIncludeFilter", function( evt, content ){
					response = content;
					return content.replace( /Related/gmi, "Unrelated" );
				})

				.bind( "ajaxInclude", function( evt, content ){
					ok( "ajaxInclude event fired" );
					ok( content !== response );
					ok( content.indexOf( "Unrelated" ) > -1 );

					start();
				})
				.ajaxInclude();

		});

		asyncTest( "ajaxInclude hijax a link", 1, function(){
			$( "#hijax-a" )
				.bind( "click", function( event ) {
					$( this ).removeAttr( 'data-interaction' ).ajaxInclude();
					return false;
				})
				.bind( "ajaxInclude", function(){
					ok( $( "#hijax-a" ).parent().children().length > 1 );
					start();
				})
				.trigger( "click" );
		});

		asyncTest( "ajaxInclude hijax a form", 1, function(){
			$( "#hijax-form" )
				.bind( "submit", function() {
					$( this ).removeAttr( 'data-interaction' ).ajaxInclude();
					return false;
				})
				.bind( "ajaxInclude", function(){
					ok( $( "#hijax-form" ).parent().children().length > 1 );
					start();
				})
				.trigger( "submit" );
		});

		asyncTest( "arbitrary target element for ajaxInclude content", 1, function(){
			$( "#target-a" )
				.bind( "ajaxInclude", function(){
					ok( $( "#new-target-a" ).children().length > 0 );
					start();
				})
				.ajaxInclude();
		});

		/* tests for whether proxy integration is working */
		if( $( "#proxytests").length ){

			asyncTest( "Proxy includes multiple ajax includes via 1 request and appends in proper locations", 3, function(){
				$( "#proxy-b" )
					.bind( "ajaxInclude", function(){
						ok( $( "#proxy-a" ).children().length === 1 );
						ok( $( "#proxy-b" ).children().length === 1 );
						start();
					})
					.bind( "ajaxIncludeResponse", function( e, data ){

						ok( $(data).filter("entry").length === 2 );


					});

				$( "#proxy-a, #proxy-b" ).ajaxInclude( { proxy: "functional/quickconcat.php?wrap&files=" } );
			});

			asyncTest( "Same as previous test, but run with deprecated proxy argument API.", 3, function(){
				$( "#proxy-d" )
					.bind( "ajaxInclude", function(){
						ok( $( "#proxy-c" ).children().length === 1 );
						ok( $( "#proxy-d" ).children().length === 1 );

						start();
					})
					.bind( "ajaxIncludeResponse", function( e, data ){
						ok( $(data).filter("entry").length === 2 );
					});

				$( "#proxy-c, #proxy-d" ).ajaxInclude( "functional/quickconcat.php?wrap&files=" );
			});
		}
	});

}(jQuery));
