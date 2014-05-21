/*! Ajax-Include - v0.1.3 - 2014-05-21
* http://filamentgroup.com/lab/ajax_includes_modular_content/
* Copyright (c) 2014 @scottjehl, Filament Group, Inc.; Licensed MIT */

(function( $, win, undefined ){
	if( typeof win.AjaxInclude !== 'undefined' ) {
		var originalMakeReq = win.AjaxInclude.makeReq;

		win.AjaxInclude.makeReq = function( url, els, isHijax ) {
			if( isHijax && els.length && els[ 0 ].tagName && els[ 0 ].tagName === 'FORM' ) {
				if( $.prototype.serialize ) {
					// If not post, default to get.
					var method = ( els.attr( 'method' ) || '' ).toLowerCase() === 'post' ? 'post' : 'get',
						formData = els.serialize();

					$[ method ]( url, formData, function( data, status, xhr ) {
						els.trigger( "ajaxIncludeResponse", [ data, xhr ] );
					});
				} else {
					throw new Error( '$.fn.serialize required for ajaxInclude on forms.' );
				}
			} else {
				originalMakeReq( url, els, isHijax );
			}
		};
	}
}( jQuery, this ));