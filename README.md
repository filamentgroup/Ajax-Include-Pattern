# Ajax-include pattern 

[![Filament Group](http://filamentgroup.com/images/fg-logo-positive-sm-crop.png) ](http://www.filamentgroup.com/)

© 2012, Scott Jehl, Filament Group, Inc. Original idea from Scott Gonzalez :)

[![Build Status](https://travis-ci.org/filamentgroup/Ajax-Include-Pattern.png)](http://travis-ci.org/filamentgroup/Ajax-Include-Pattern)

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/filamentgroup/Ajax-Include-Pattern/master/dist/ajaxInclude.min.js
[max]: https://raw.github.com/filamentgroup/Ajax-Include-Pattern/master/dist/ajaxInclude.js

## How-to
To use, add attributes to elements in your page where non-essential fragments of content can be included from an external URL, using jQuery-api-like qualifiers like data-after, data-before, data-append, and data-replace:

Replace:

    <a href="..." data-replace="articles/latest/fragment">Latest Articles</a>

Before:

    <a href="..." data-before="articles/latest/fragment">Latest Articles</a>

After:

    <a href="..." data-after="articles/latest/fragment">Latest Articles</a>

Append:

    <a href="..." data-append="articles/latest/fragment">Latest Articles</a>


Note: these attributes can be placed on any element, not just anchors.


Once the DOM is ready, you can apply the plugin like this: 

    $("[data-append],[data-replace],[data-after],[data-before]").ajaxInclude();
	
### media-qualified includes

To include content based on a particular CSS3 Media Query, you can add a `data-media` attribute to the element that already has one of the ajax-include data attributes specified above, and give that attribute a value of any CSS3 media query. The content of that include will only be requested and inserted into the page if and when that media query is valid (which could happen at page load or later on, after an orientation change or resize for example).

Include the referenced fragment at viewport widths of 30em and up:

    <a href="..." data-append="articles/latest/fragment" data-media="(min-width: 30em)">Latest Articles</a>


### HijaxInclude

To include content when a user clicks on a link or submits a form, use the `data-interaction` attribute.  `data-interaction` will block ajaxInclude from executing on this element until you explicitly remove it and subsequently call `ajaxInclude()`.

    <a href="articles/latest/fragment" data-replace data-interaction>Latest Articles</a>


    $( "a[data-interaction]" ).bind( "click", function() {
      $( this ).removeAttr( "data-interaction" ).ajaxInclude();
      return false;
    });

See also: [HijaxInclude with forms](README-plugins.md).

### Targeting a separate element.

To include content on a separate element, include a CSS selector to select a new element in the `data-target` attribute.  The following example appends the fragment inside of `#my-new-target` rather than inside of the `<a>`.

    <a href="..." data-append="articles/latest/fragment" data-target="#my-new-target">Latest Articles</a>

## Demos

To view some demos, you can visit the following page in your browser, or clone down this repo and browse to the `test/functional/` directory (you'll need to be running a local web server for the ajax to work in most browsers).

[Ajax-Include Demos](http://filamentgroup.github.com/Ajax-Include-Pattern/test/functional/)

(Note that the proxy demo page will not work at the above URL because it needs to be run on a web server with PHP support.)

## Optional Proxy

To use the proxy and include all ajax includes in one call, just pass in a URL that is ready to accept a list of files, such as the included `quickconcat.php` file in the root of this demo, as an argument to the `ajaxInclude` method. Note that `quickconcat.php` is from the external project, [quickconcat](https://github.com/filamentgroup/quickconcat) - check out that project for usage examples.

    $("[data-append],[data-replace],[data-after],[data-before]").ajaxInclude( { proxy: "quickconcat.php?wrap&files=" } );

Note: in prior versions, ajaxInclude supported a single string argument for the proxy url. This is currently deprecated and will be removed in an upcoming version.

## Browser Support

Ajax-Include works in most modern and semi-modern browsers, even IE6. That said, the `data-media` feature will only work in media-query supporting browsers, and for broad compatibility within media-query supporting browsers, it's recommended that you include the MatchMedia polyfill and MatchMedia `addListener` polyfill. Both can be found in the `libs/` directory, or at [the matchMedia polyfill project on Github](https://github.com/paulirish/matchMedia.js/). To see how these are used alongside ajaxInclude, check out the source of any of the demo pages.

## Unit Tests

The unit test suite can be run via `tests/ajaxInclude.html`, or on the Github site [here](http://filamentgroup.github.com/Ajax-Include-Pattern/test/functional/). Note that the unit tests for the optional proxy noted above will only run on a php-supporting web server.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## Release History
- 03.28.2012: [Initial alpha release](http://filamentgroup.com/lab/ajax_includes_modular_content/)


## License
Copyright (c) 2012 @scottjehl, Filament Group, Inc.  
Licensed under the MIT license.
