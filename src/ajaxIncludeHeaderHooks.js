/* 
 * Plugin to ajaxInclude to execute a JS callback based
 * on the value of a custom HTTP header.
 *
 * Usage: $( … ).ajaxInclude({
			headerHooks: {
				// Redirect to the url returned by the X-AjaxInclude-Redirect header.
				'X-AjaxInclude-Redirect': function( url ) {
					window.location.href = url;
				}
			}
		});
 */
(function( $, win, undefined ){
	if( typeof win.AjaxInclude !== 'undefined' ) {
		win.AjaxInclude.plugins.headerHooks = function( options ) {
			$( this ).bind( 'ajaxIncludeResponse', function( e, data, xhr ) {
				var callback,
					header;

				// backwards compatibility
				if( options.headerCallbacks ) {
					options.headerHooks = options.headerCallbacks;
				}

				if( options.headerHooks ) {
					for( var j in options.headerHooks ) {
						callback = options.headerHooks[ j ];
						header = xhr.getResponseHeader( j );
						if( typeof callback === 'function' && header ) {
							callback( header );
						}
					}
				}
			});
		};
	}
}( jQuery, this ));