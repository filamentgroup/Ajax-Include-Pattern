/*! Ajax-include pattern. Copyright 2012, Scott Jehl, Filament Group, Inc. Dual licensed under MIT and GPLv2 */
/*
  * Original idea by Scott Gonzalez :)
  * To use, place attributes on content, pointing to a URL
    * that should either replace, or insert before or after that anchor
    * after the page has loaded
    * Replace:	<a href="..." data-replace="articles/latest/fragment">Latest Articles</a>
    * Before:	<a href="..." data-before="articles/latest/fragment">Latest Articles</a>
    * After:	<a href="..." data-after="articles/latest/fragment">Latest Articles</a>
    * Also, the data-threshold attr allows a min width for this to apply.
    * After domready, you can use it like this:
         $("[data-append],[data-replace],[data-after],[data-before]").ajaxInclude();
*/
(function( $ ){

	$.fn.ajaxInclude = function( options ) {

		var filelist = [],
			$els = this,
			numEls = $els.length,
			screenWidth = screen.width,
			opts;

		if (typeof options === "object") {
			opts = $.extend({}, defaults, options);
		} else {
			opts = $.extend({}, defaults);
			opts.proxy = options;
		}

		return $els.each(function( k ) {

			var $el			= $( this ),
				data 		= $el.data(),
				target		= data.target,
				$target		= target && $( target ) || $el,
				threshold	= screenWidth > parseFloat( data.threshold || 0 ),
				method 		= extractMethod(data),
				jqMethod	= opts.methods[method],
				url 		= data[method],
				proxy 		= opts.proxy;

			if (!threshold || !method || !url) { return; }

			$el
				.data( "method", method )
				.data( "url", url )
				.data( "proxy", proxy )
				.bind( "ajaxInclude", function(e, data){
					var content = $(data);
					if( proxy ){
						content = content.filter( "page[url=\"" + url + "\"]" );
					}
					$el[jqMethod]( content );
				});

			if ( !isUrlInFilelist(url) ) { filelist.push(url); }
			if ( k === numEls-1 ) { initAjaxRequest(); }

		}); // $els.each()


		// Checks if the URL is already in the filelist array
		// so we don't get duplicate data from the server if multiple
		// sections of the page request the same data. Don't know
		// if there's a use case for this, but it's a precaution.
		function isUrlInFilelist(url) {
			return $.inArray(url, filelist) !== -1;
		}


		// Returns the data-* method attribute that's on the element,
		// based on the ones in opts.methods.
		// @TODO: Should the method attribute be normalized? Should
		// there be a default method of "after" for instance,
		// and users override that with `data-method="replace"`,
		// and they always provide a `data-includeUrl` instead?
		function extractMethod(elData) {
			for (var m in opts.methods) {
				if (elData[m]) { return m; }
			}
			return false;
		}

		// Initializes the AJAX request, prepending the `proxy`
		// if there is one.
		function initAjaxRequest() {
			var url = (opts.proxy || '') + filelist.join();
			$.get( url, function( data ) {
				$els.trigger( "ajaxInclude", [data] );
			});
		}

	}; // $.fn.ajaxInclude


	var defaults = $.fn.ajaxInclude.defaults = {
		proxy: null,
		methods: {
			append: "append",
			replace: "replaceWith",
			before: "before",
			after: "after"
		}
	};

})( jQuery );