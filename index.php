<!doctype html>
<html>
    <head>
        <meta charset="UTF8">
        <title>wpPlugin Generator</title>
        <link rel="stylesheet" type="text/css" href="css/preloader.css">
        <link rel="stylesheet" type="text/css" href="css/codeMirror/codemirror.css" />
        <!-- Editor themes -->
        <link rel="stylesheet" type="text/css" href="css/codeMirror/clouds-midnight.css" />
        <link rel="stylesheet" type="text/css" href="css/codeMirror/icecoder.css" />
        <link rel="stylesheet" type="text/css" href="css/codeMirror/monokai-fannonedition.css" />
        <link rel="stylesheet" type="text/css" href="css/codeMirror/monokai.css" />
        <link rel="stylesheet" type="text/css" href="css/codeMirror/monokai-sublime.css" />
        <link rel="stylesheet" type="text/css" href="css/codeMirror/cobalt.css" />
        <link rel="stylesheet" type="text/css" href="css/codeMirror/eclipse.css" />
        <link rel="stylesheet" type="text/css" href="css/codeMirror/material.css" />
        <link rel="stylesheet" type="text/css" href="css/codeMirror/oceanic-next.css" />
        <link rel="stylesheet" type="text/css" href="css/codeMirror/shadowfox.css" />
        <link rel="stylesheet" type="text/css" href="css/codeMirror/darcula.css" />
        <link rel="stylesheet" type="text/css" href="css/codeMirror/foldgutter.css" />
        <link rel="stylesheet" type="text/css" href="css/codeMirror/docs.css">
    </head>  
    <body> 

        <!--Preloader Section -->
        <div id="preloader">
            <div id="status">&nbsp;</div>
        </div>

        <!-- Main container -->
        <div class="splitContainer">

            <!-- Top menu container -->
            <div class="buttonContainer">
                <button id="IDloadJsonDataClick" class="button loadJson">Load Json</button>
                <button id="IDsaveJsonData" class="button saveJson">Save Json</button>
                <button id="IDsave" class="button saveFile">Save</button>
                <input style="display:none" type="file" id="IDloadJsonData">
            </div>

            <!-- Component Section -->
            <div id="componentSection" class="componentSection split split-horizontal">            
                <div class="elementContainer">                        
                    <nav id="IDelementListContainer">  
                        <ul id="IDelemList" class="elementList">
                            <li id="IDtext" class="textIcon">text</li>
                            <li id="IDtextarea" class="textareaIcon">Textarea</li>
                            <li id="IDcolor" class="colorIcon">Color</li>
                            <li id="IDrange" class="rangeIcon">Range</li>
                            <li id="IDselect" class="selectIcon">Select</li>
                            <li id="IDradio" class="radioIcon">Radio</li>
                            <li id="IDcheckbox1" class="checkboxIcon">Checkbox</li>
                            <li id="IDmedia" class="mediaIcon">Media</li>   <!-- Media -->
                            <li id="IDnumber" class="numberIcon">Number</li>
                            <li id="IDdate" class="dateIcon">Date</li>                            
                            <li id="IDdatetimeLocal" class="datetimeLocalIcon">Datetime-local</li>
                            <li id="IDweek" class="weekIcon">Week</li>
                            <li id="IDmonth" class="monthIcon">Month</li>
                            <li id="IDemail" class="emailIcon">Email</li>                            
                            <li id="IDtel" class="telIcon">Tel</li>
                            <li id="IDtime" class="timeIcon">Time</li>                            
                        </ul>
                    </nav> 
                </div>
            </div>

            <!-- Project Section -->
            <div id="projectSection" class="split split-horizontal projectSection">          

                <div id="tabs">
                    <ul>
                        <li><a href="#tabs-1">Plugin Info</a></li>
                        <li><a href="#tabs-2">Custom Post Type</a></li>
                        <li><a href="#tabs-3">Meta Boxes</a></li>
                    </ul>

                    <div id="tabs-1">
                        <div class="pluginInfoContainer">                       
                            <label for="IDpluginName">Plugin Name</label><input id="IDpluginName" type="text" name="" value="wordpressDemo1"><br />
                            <label for="IDpluginURI">Plugin URI</label><input id="IDpluginURI" type="text" name="" value="Lorem Ipsum"><br />
                            <label for="IDversion">Version</label><input id="IDversion" type="text" name="" value="0.0.1"><br />
                            <label for="IDAuthor">Author</label><input id="IDAuthor" type="text" name="" value="John Doe"><br />
                            <label for="IDauthorURI">Author URI</label><input id="IDauthorURI" type="text" name="" value="https://johndoe@site.com"><br />
                            <label for="IDlicense">License</label><input id="IDlicense" type="text" name="" value="GPLv2 or later"><br />
                            <label for="IDtextDomain">TextDomain:</label><input id="IDtextDomain" type="text" name="" value="Text-Domain">                       
                        </div>
                    </div>

                    <div id="tabs-2">
                        <div class="customPostInfoContainer">                        
                            <label for="IDpluralName">Name(Plural)</label><input id="IDpluralName" type="text" name="" value="Plural"><br />
                            <label for="IDnameSingular">Name(Singular)</label><input id="IDnameSingular" type="text" name="" value="Singular"><br />
                            <!-- <label for="IDtypekey">Type Key</label><input id="IDtypekey" type="text" name=""><br /> -->
                            <label for="IDdescription">Description</label><input id="IDdescription" type="text" name="" value="Description"><br />
                            <label for="IDtextDomainCPT">TextDomain</label><input id="IDtextDomainCPT" type="text" name="" value="Text-Domain">                       
                        </div>
                    </div>

                    <div id="tabs-3">
                        <div class="metaBoxInfoContainer">                       
                            <label for="IDmetaBoxID">Metabox ID </label><input id="IDmetaBoxID" type="text" value="MetaBoxID"><br />
                            <label for="IDmetaBoxLabel">Metabox Label</label><input id="IDmetaBoxLabel" type="text" value="MetaBox-Label"><br />
                            <label for="IDmetaBoxDescription">Metabox Description</label><input id="IDmetaBoxDescription" type="text" value="MetaBox-Description">                       
                        </div>
                    
                        <div>
                            <nav id="IDmetaBoxesContainer" class="navContainer">
                                <ul id="IDmetaBoxesList" class="metaBoxesList"></ul>
                            </nav>
                        </div>
                    </div>
                </div>
            
            </div>
            
            <!-- Code Section -->
            <div id="codeSection" class="split split-horizontal">
                <div id="IDcodeContainer"></div>
            </div>       

        </div>
        <!---->
        <script type="text/javascript" src="js/script.js"></script>

        <script type="text/javascript" src="js/codeMirror/codemirror.js"></script>
        <script type="text/javascript" src="js/codeMirror/xml.js"></script>
        <script type="text/javascript" src="js/codeMirror/javascript.js"></script>
        <script type="text/javascript" src="js/codeMirror/htmlmixed.js"></script>
        <script type="text/javascript" src="js/codeMirror/css.js"></script>
        <script type="text/javascript" src="js/codeMirror/php.js"></script>
        <script type="text/javascript" src="js/codeMirror/sublime.js"></script>
        <script type="text/javascript" src="js/codeMirror/closebrackets.js"></script>
        <script type="text/javascript" src="js/codeMirror/closetag.js"></script>
        <script type="text/javascript" src="js/codeMirror/formatting.js"></script>
        <script type="text/javascript" src="js/codeMirror/matchbrackets.js"></script>
        <script type="text/javascript" src="js/codeMirror/clike.js"></script>

        <script type="text/javascript" src="js/codeMirror/fold/foldcode.js"></script>
        <script type="text/javascript" src="js/codeMirror/fold/foldgutter.js"></script>
        <script type="text/javascript" src="js/codeMirror/fold/brace-fold.js"></script>
        <script type="text/javascript" src="js/codeMirror/fold/xml-fold.js"></script>
        <script type="text/javascript" src="js/codeMirror/fold/indent-fold.js"></script>
        <script type="text/javascript" src="js/codeMirror/fold/markdown-fold.js"></script>
        <script type="text/javascript" src="js/codeMirror/fold/comment-fold.js"></script>

        <script type="text/javascript" src="js/codeMirror/scroll/annotatescrollbar.js"></script>
        <script type="text/javascript" src="js/codeMirror/search/matchesonscrollbar.js"></script>
        <script type="text/javascript" src="js/codeMirror/search/searchcursor.js"></script>
        <script type="text/javascript" src="js/codeMirror/search/match-highlighter.js"></script>
    </body>
</html>