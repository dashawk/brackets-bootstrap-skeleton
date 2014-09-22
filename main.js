/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 2, maxerr: 50 */
/*global define, brackets */

define(function (require, exports, module) {
    "use strict";
    /*
     * Simple extension that adds a "File > New Bootstrap 3 Document" menu item
     * to insert an Bootstrap 3 HTML "skeleton" at cursor position
     */
    var AppInit        = brackets.getModule("utils/AppInit"),
        CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        Menus          = brackets.getModule("command/Menus");


  /**
   * @private
   * Insert the selected elements into the document
   */
  function inserthtmlSkelly() {
    var BOOTSTRAP_VERSION = "3.2.0";

    var Indent  = "\u0020\u0020\u0020\u0020",
        Indent2 = Indent + Indent,
        Indent3 = Indent2 + Indent,
        Indent4 = Indent2 + Indent2,
        Indent5 = Indent2 + Indent3,
        Indent6 = Indent3 + Indent3;

    // The HTML skeleton
    var htmlSkelly = "<!DOCTYPE html>\n" +
           "<html lang=''>\n" +
             Indent + "<head>\n" +
              Indent2 + "<meta charset='UTF-8'>\n" +
              Indent2 + "<meta name='viewport' content='width=device-width, initial-scale=1'>\n" +
              Indent2 + "<meta name='description' content=''>\n" +
              Indent2 + "<meta name='author' content=''>\n" +
              Indent2 + "<link rel='shortcut icon' href=''>\n" +
              Indent2 + "<title>Starter Template for Bootstrap</title>\n\n" +
              Indent2 + "<!-- Bootstrap core CSS -->\n" +
              Indent2 + "<link rel='stylesheet' href='https://netdna.bootstrapcdn.com/bootstrap/boots-version/css/bootstrap.min.css'>\n" +
              Indent2 + "<link rel='stylesheet' href='https://netdna.bootstrapcdn.com/bootstrap/boots-version/css/bootstrap-theme.min.css'>\n\n" +
              Indent2 + "<!-- Custom styles for this template -->\n" +
              Indent2 + "<style>body{padding-top:50px;}.starter-template{padding:40px 15px;text-align:center;}</style>\n\n" +

              Indent2 + "<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->\n" +
              Indent2 + "<!--[if IE]>\n" +
                Indent3 + "<script src='https://oss.maxcdn.com/libs/html5shiv/3.7.2/html5shiv.js'></script>\n" +
                Indent3 + "<script src='https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js'></script>\n" +
              Indent2 + "<![endif]-->\n" +
                  Indent + "</head>\n\n" +
            Indent + "<body>\n" +
                    Indent2 + "<nav class='navbar navbar-inverse navbar-fixed-top' role='navigation'>\n" +
                Indent3 + "<div class='container'>\n" +
                  Indent4 + "<div class='navbar-header'>\n" +
                      Indent5 + "<button type='button' class='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>\n" +
                      Indent6 + "<span class='sr-only'>Toggle navigation</span>\n" +
                      Indent6 + "<span class='icon-bar'></span>\n" +
                      Indent6 + "<span class='icon-bar'></span>\n" +
                      Indent6 + "<span class='icon-bar'></span>\n" +
                      Indent5 + "</button>\n" +
                      Indent5 + "<a class='navbar-brand' href='#'>Project name</a>\n" +
                  Indent4 + "</div>\n" +
                  Indent4 + "<div class='collapse navbar-collapse'>\n" +
                      Indent5 + "<ul class='nav navbar-nav'>\n" +
                      Indent6 + "<li class='active'><a href='#'>Home</a></li>\n" +
                      Indent6 + "<li><a href='#about'>About</a></li>\n" +
                      Indent6 + "<li><a href='#contact'>Contact</a></li>\n" +
                      Indent5 + "</ul>\n" +
                  Indent4 + "</div><!--/.nav-collapse -->\n" +
                  Indent3 + "</div>\n" +
              Indent2 + "</nav>\n" +
              Indent2 + "<div class='container'>\n" +
                Indent3 + "<div class='starter-template'>\n" +
                  Indent4 + "<h1>Hello, world!</h1>\n" +
                  Indent4 + "<p class='lead'>Now you can start your own project with <a target='_blank' href='http://getbootstrap.com/'>Bootstrap boots-version</a>. This plugin is a fork from <a href='https://github.com/le717/brackets-html-skeleton#readme'>HTML Skeleton</a>.</p>\n" +
                Indent3 + "</div>\n" +
              Indent2 + "</div>\n" +
           Indent2 + "<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->\n" +
           Indent2 + "<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script>\n" +
           Indent2 + "<!-- compiled and minified Bootstrap JavaScript -->\n" +
           Indent2 + "<script src='https://netdna.bootstrapcdn.com/bootstrap/boots-version/js/bootstrap.min.js'></script>\n" +
           Indent + "</body>\n" +
           "</html>\n";

    var editor = EditorManager.getCurrentFullEditor();
    if (editor) {
      // Insert the skeleton at the current cursor position
      var insertionPos = editor.getCursorPos();
      editor.document.batchOperation(function () {
          // Do a regex search for the `boots-version` keyword
          // and replace it with the Bootstrap version constant
          // Also replace all single quotes with double quotes
          htmlSkelly = htmlSkelly.replace(/boots-version/g, BOOTSTRAP_VERSION)
                                 .replace(/'/g, "\"");
          editor.document.replaceRange(htmlSkelly, insertionPos);
      });
    }
  }


    /**
    * @private
    * Load the extension after Brackets itself has finished loading
    */
    AppInit.appReady(function () {
        var EXTENSION_ID = "mirorauhala.bootstrap-skeleton";
          CommandManager.register("New Bootstrap 3 Document", EXTENSION_ID, inserthtmlSkelly);
          var theMenu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
          theMenu.addMenuItem(EXTENSION_ID);
    });
});
