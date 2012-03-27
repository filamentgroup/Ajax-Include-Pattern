Anchor-include pattern for already-functional links that work as a client-side fragment include

Copyright 2011, Scott Jehl, Filament Group, Inc

Dual licensed under the MIT

Idea from Scott Gonzalez

To use, place attributes on an already-functional anchor pointing to content that should either replace, or insert before or after that anchor after the page has loaded
   * Replace:

    <a href="..." data-replace="articles/latest/fragment">Latest Articles</a>

   * Before:

    <a href="..." data-before="articles/latest/fragment">Latest Articles</a>

   * After:

    <a href="..." data-after="articles/latest/fragment">Latest Articles</a>

   * Also, the data-threshold attr allows a min width for this to apply.

On domready, you can apply the plugin like this: 

    $("[data-append],[data-replace],[data-after],[data-before]").anchorInclude();