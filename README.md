# Ajax-include pattern 

* Copyright 2012, Scott Jehl, Filament Group, Inc. Original idea from Scott Gonzalez :)

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/filamentgroup/ajaxInclude/master/dist/ajaxInclude.min.js
[max]: https://raw.github.com/filamentgroup/ajaxInclude/master/dist/ajaxInclude.js

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


Also, the data-threshold attr allows a min width for this to apply.

Note: these attributes can be placed on any element, not just anchors.


Once the DOM is ready, you can apply the plugin like this: 

    $("[data-append],[data-replace],[data-after],[data-before]").ajaxInclude();
	

## Optional Proxy

To use the proxy and include all ajax includes in one call, just pass in a URL that is ready to accept a list of files, such as the included `quickconcat.php` file in the root of this demo, as an argument to the `ajaxInclude` method. Note that `quickconcat.php` is from the external project, [quickconcat](https://github.com/filamentgroup/quickconcat) - check out that project for usage examples.

    $("[data-append],[data-replace],[data-after],[data-before]").ajaxInclude( { proxy: "quickconcat.php?wrap&files=" } );
	
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 @scottjehl, Filament Group, Inc.  
Licensed under the MIT license.