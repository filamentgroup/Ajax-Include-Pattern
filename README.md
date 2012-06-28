# Ajax-include pattern 

* Copyright 2012, Scott Jehl, Filament Group, Inc. Original idea from Scott Gonzalez :)
* Dual licensed under MIT and GPLv3

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

To use the proxy and include all ajax includes in one call, just pass in a URL that is ready to accept a list of files, such as the included `quickconcat.php` file in the root. Note that `quickconcat.php` is from the external project, [quickconcat](https://github.com/filamentgroup/quickconcat) - check out that project for usage examples.

    $("[data-append],[data-replace],[data-after],[data-before]").ajaxInclude( "quickconcat.php?wrap&files=" );