/*! Ajax-Include - v0.1.0 - 2012-08-17
* http://filamentgroup.com/lab/ajax_includes_modular_content/
* Copyright (c) 2012 @scottjehl, Filament Group, Inc.; Licensed MIT */

(function( $, undefined ){
	$.fn.ajaxInclude = function( options ) {
		
		var filelist = [],
			els = this,
			completeAttr = "data-ajax-requested",
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
		
		return this.not( "[" + completeAttr + "]" ).each(function( k ) {
			var el			= $( this ),
				w			= window,
				qualify		= el.attr( "data-media" ),
				methods		= [ "append", "replace", "before", "after" ],
				method,
				url;

			if ( !qualify || ( w.matchMedia && w.matchMedia( qualify ).matches ) ) {

				for( var ml = methods.length, i=0; i < ml; i++ ){
					if( el.is( "[data-" + methods[ i ] + "]" ) ){
						method  = methods[ i ];
						url		= el.attr( "data-" + method );
					}
				}

				if( method === "replace" ){
					method += "With";
				}

				if( url && method ){
					
					el
						.data( "method", method )
						.data( "url", url )
						.attr( completeAttr, true )
						.bind( "ajaxInclude", function(e, data){
							var content = $(data);
							
							if( $(this).data( "proxy" ) ){
								content = content.filter( "entry[url=\"" + $(this).data( "url" ) + "\"]" ).html();
							}
							$( this )[ $(this).data( "method" ) ]( content );								
						});
					
					if( o.proxy ){
						
						el.data( "proxy", o.proxy );
						
						if( $.inArray( url, filelist ) === -1 ){
							filelist.push( url );
						}
						
						if( k === els.length - 1 ){
							url = o.proxy + filelist.join();
						}
					}
					
					if( !o.proxy || k === els.length-1 ){
						$.get( url, function( data ) {	
							( o.proxy ? els : el ).trigger( "ajaxInclude", [data] );
						});
					}
				}
			}
		});
	};
}( jQuery ));
