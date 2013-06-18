## HijaxInclude with Forms

If you include `src/ajaxIncludeForms.js` (or `dist/ajaxIncludePlugins.js`) and `$(...).serialize()` is available, you can also use HijaxInclude with forms to hijack the submit event.

### HTML

    <form action="demo-content/form-response.html" method="post" data-replace data-interaction>
      <input type="text" name="textField" value="Test">
      <input type="submit" value="Submit">
    </form>

### JavaScript

    $( "form[data-interaction]" ).bind( "submit", function() {
      $( this ).removeAttr( "data-interaction" ).ajaxInclude();
      return false;
    });

## Header Hooks

If you include `src/ajaxIncludeHeaderHooks.js` (or `dist/ajaxIncludePlugins.js`), you can execute JavaScript when a specific HTTP Header is returned to the XHR object.

### JavaScript

    // Example: Redirect to the url returned by the
    //   X-AjaxInclude-Redirect header.
    $( el ).ajaxInclude({
      headerHooks: {
        'X-AjaxInclude-Redirect': function( url ) {
          window.location.href = url;
        }
      }
    });