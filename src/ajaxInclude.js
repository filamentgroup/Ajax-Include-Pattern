/*! Ajax-Include - v0.1.0 - 2012-08-17
* http://filamentgroup.com/lab/ajax_includes_modular_content/
* Copyright (c) 2012 @scottjehl, Filament Group, Inc.; Licensed MIT */

(function( $, undefined ){
	$.fn.ajaxInclude = function( options ) {
		var w = window,
			urllist = [],
			elQueue = $(),
			boundAttr = "data-ajax-bound",
			o = {
				proxy: null
			};
		
		// Option extensions
		// Sting check: deprected. Formerly, proxy was the single arg.
		if( typeof options === "string" ){
			o.proxy = options;
		}
		else {
			o = $.extend( o, options );
		}
		
		// if it's a proxy, que the element and its url, if not, request immediately
		function queueOrRequest( el ){
			var url = el.data( "url" );
			if( o.proxy && $.inArray( url, urllist ) === -1 ){
				urllist.push( url );
				elQueue = elQueue.add( el );
			}
			else{
				makeReq( el.data( "url" ), el );
			}
		}
		
		// request a url and trigger ajaxInclude on elements upon response
		function makeReq( url, els ){
			$.get( url, function( data ) {
				els.trigger( "ajaxIncludeResponse", [data] );
			});
		}
		
		// if there's a url queue
		function runQueue(){
			if( urllist.length ){
				makeReq( o.proxy + urllist.join( "," ), elQueue );
				elQueue = $();
				urllist = [];
			}
		}
		
		// bind a listener to a currently-inapplicable media query for potential later changes
		function bindForLater( el, media ){
			var mm = w.matchMedia( media );
			function cb(){
				queueOrRequest( el );
				runQueue();
				mm.removeListener( cb );
			}
			if( mm.addListener ){
				mm.addListener( cb );
			}
		}
		
		// loop through els, bind handlers
		this.not( "[" + boundAttr + "]" ).each(function( k ) {
			var el = $( this ),
				media = el.attr( "data-media" ),
				methods = [ "append", "replace", "before", "after" ],
				method,
				url;
			
			for( var ml = methods.length, i=0; i < ml; i++ ){
				if( el.is( "[data-" + methods[ i ] + "]" ) ){
					method  = methods[ i ];
					url		= el.attr( "data-" + method );
				}
			}
			
			if( method === "replace" ){
				method += "With";
			}
			
			el
				.data( "method", method )
				.data( "url", url )
				.attr( boundAttr, true )
				.bind( "ajaxIncludeResponse", function(e, data){
					var content = data;
					
					if( o.proxy ){
						var subset = content.match( new RegExp( "<entry url=[\"']?" + el.data( "url" ) + "[\"']?>(?:(?!</entry>)(.|\n))*", "gmi" ) );
						if( subset ){
							content = subset[ 0 ];
						}
					}
					
					var filteredContent = el.triggerHandler( "ajaxIncludeFilter", [ content ] );
					
					if( filteredContent ){
						content = filteredContent;
					}
					
					el
						[ el.data( "method" ) ]( content )
						.trigger( "ajaxInclude", [ content ] );
											
				});
			
			if ( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ) {
				queueOrRequest( el );
			}
			else if( media && w.matchMedia ){
				bindForLater( el, media );
			}
		});
		
		// empty the queue for proxied requests
		runQueue();
		
		// return elems
		return this;
	};
}( jQuery ));