Ajax-include pattern for already-functional links for use as a client-side fragment include

Optional proxy allows for a single request for all.

Copyright 2012, Scott Jehl, Filament Group, Inc

Dual licensed under the MIT

Original idea from Scott Gonzalez :)

To use, place attributes on an already-functional anchor pointing to content that should either replace, or insert before or after that anchor after the page has loaded

Replace:

    <a href="..." data-replace="articles/latest/fragment">Latest Articles</a>

Before:

    <a href="..." data-before="articles/latest/fragment">Latest Articles</a>

After:

    <a href="..." data-after="articles/latest/fragment">Latest Articles</a>

Also, the data-threshold attr allows a min width for this to apply.

Note: these attributes can be placed on any element, not just anchors.


On domready, you can apply the plugin like this: 

    $("[data-append],[data-replace],[data-after],[data-before]").ajaxInclude();
	
Optional Proxy

To use the proxy and include all ajax includes in one call, just pass in a URL that is ready to accept a list of files, such as the ajaxinclude.helper.php file in the root.

    $("[data-append],[data-replace],[data-after],[data-before]").ajaxInclude( "ajaxinclude.helper.php?files=" );