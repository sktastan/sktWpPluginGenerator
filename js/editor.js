//-------------------------------------------------------------------------------//
// 							        Editor                    
//-------------------------------------------------------------------------------//
class Editor {

    constructor(parent, editorMode, data) {

        self = this;
        this.newEditor = null;

        // Create new editor
        this.newEditor = CodeMirror(parent, {

            lineNumbers: true,
            //theme:"icecoder",
            theme: "monokai",
            styleActiveLine: true,
            matchBrackets: true,
            // value: data,       
            // mode:  "application/x-httpd-php",
            mode: editorMode,
            tabMode: "shift",
            highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
            indentUnit: 4,
            smartIndent: true,
            autoCloseBrackets: true,
            autoCloseTags: true,
            keyMap: 'sublime',
            lineWrapping: true,
            extraKeys: { "Ctrl-Q": function (cm) { cm.foldCode(cm.getCursor()); } },
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            autoRefresh: true,
            autofocus: true,
            readOnly: true
            //autoformat:true

        });

        this.newEditor.setValue(data);
        this.newEditor.setSize('100%', '100vh');
        //return this;
    }    

    setData() {

        let IDList = ['IDpluginName', 'IDpluginURI', 'IDversion', 'IDAuthor', 'IDauthorURI', 'IDlicense', 'IDtextDomain'];
        let pluginInfoData = '';
        let pluginInfoArr = [];
        let pluginInfoLabels = ['Plugin Name', 'Plugin URI', 'Version', 'Author', 'Author URI', 'License', 'Text Domain'];

        let customPostTypeIDList = ['IDpluralName', 'IDnameSingular', 'IDdescription', 'IDtextDomainCPT'];
       
        let customPostTypeArr = [];
        let customPostTypeDataArr = [];       

        for (let i = 0; i < IDList.length; i++) {

            pluginInfoArr[i] = new domObject(IDList[i]);
            pluginInfoArr[i].events({
                oninput: function () {

                    pluginInfoData = '';
                    for (let i = 0; i < pluginInfoLabels.length; i++) {
                        pluginInfoData += pluginInfoLabels[i] + ': ' + pluginInfoArr[i].object.value + '\n';
                    }
                    let plgStr = pluginStr(customPostTypeDataArr[0], customPostTypeDataArr[1], customPostTypeDataArr[2], customPostTypeDataArr[3])
                    self.newEditor.setValue('<?php\n' + '/*\n' + pluginInfoData + '*/\n' + plgStr +'?>');
                }
            });

        }

        for (let i = 0; i < customPostTypeIDList.length; i++) {

            customPostTypeArr[i] = new domObject(customPostTypeIDList[i]);
            customPostTypeArr[i].events({
                oninput: function () {

                    customPostTypeDataArr = [];
                    for (let i = 0; i < customPostTypeIDList.length; i++) {

                        customPostTypeDataArr.push(customPostTypeArr[i].object.value);

                    }
                    let plgStr = pluginStr(customPostTypeDataArr[0], customPostTypeDataArr[1], customPostTypeDataArr[2], customPostTypeDataArr[3])
                    self.newEditor.setValue('<?php\n' + '/*\n' + pluginInfoData + '*/\n' + plgStr +'?>');
                }
            });

        }

    }

    getData() {
        return this.newEditor.getValue();
    }

} 