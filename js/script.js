//----------------------------------------------------------------------------------//
//						    Php style include file function                     
//----------------------------------------------------------------------------------//
const include = function (filepath) {
    let fileExtension = filepath.split('.').pop();

    if (fileExtension == 'css') {
        let element = document.createElement("link");
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("type", "text/css");
        element.setAttribute("href", filepath);
        document.getElementsByTagName("head")[0].appendChild(element);
    }
    else if (fileExtension == 'js') {
        let element = document.createElement("script");
        element.setAttribute("type", "text/javascript");
        element.setAttribute("src", filepath);
        document.getElementsByTagName("head")[0].appendChild(element);
    }
    else {
        alert('undefined extension!');
    }
}

//----------------------------------------------------------------------------------//
//							        Css includes                     
//----------------------------------------------------------------------------------//
include('sass/theme.css');
include('css/split.css');
// include('http://localhost/webDev/myLib/js/jquery-ui/jquery-ui.min.css');
include('css/jquery-ui.min.css');
include('css/style.css');

//----------------------------------------------------------------------------------//
//							        Js includes                     
//----------------------------------------------------------------------------------//
// include('http://localhost/webDev/myLib/js/dom/dom.js');
// include('http://localhost/webDev/myLib/js/dom/domObject.js');

// include('http://localhost/webDev/myLib/js/misc/misc.js');
// include('http://localhost/webDev/myLib/js/jquery/jquery-3.3.1.min.js');
// include('http://localhost/webDev/myLib/js/jquery-ui/jquery-ui.min.js');

include('js/dom.js');
include('js/domObject.js');

include('js/misc.js');
include('js/jquery-3.3.1.min.js');
include('js/jquery-ui.min.js');

include('js/editor.js');
include('js/split.js');
include('js/plugin.js');
include('js/elementList.js');

// --------------------------------------------------------- //
// Save json data
// --------------------------------------------------------- //
saveJsonData = function (fileNamePath, fileName, data, callback) {
    var xhttpPhp = new XMLHttpRequest();
    xhttpPhp.open("POST", "php/saveJsonData.php", true);
    var dataObj = {
        fileNamePath: fileNamePath,
        fileName: fileName,
        data: JSON.stringify(data)
    };

    xhttpPhp.onreadystatechange = function () {
        if (xhttpPhp.readyState === 4) {
            if (xhttpPhp.status === 200 || xhttpPhp.status == 0) {

                var fNameArr = xhttpPhp.responseText;
                callback(fNameArr);

            }
        }
    }

    xhttpPhp.send(JSON.stringify(dataObj));
}

// --------------------------------------------------------- //
// Save file
// --------------------------------------------------------- //
saveFile = function (fileNamePath, fileName, data, callback) {
    var xhttpPhp = new XMLHttpRequest();
    xhttpPhp.open("POST", "php/saveFile.php", true);
    var dataObj = {
        fileNamePath: fileNamePath,
        fileName: fileName,
        data: data
    };

    xhttpPhp.onreadystatechange = function () {
        if (xhttpPhp.readyState === 4) {
            if (xhttpPhp.status === 200 || xhttpPhp.status == 0) {

                var fNameArr = xhttpPhp.responseText;
                callback(fNameArr);

            }
        }
    }

    xhttpPhp.send(JSON.stringify(dataObj));
}

//----------------------------------------------------------------------------------//
//							    Main functions                    
//----------------------------------------------------------------------------------//
var editor = null;
window.addEventListener('load', function () {

    /* 
        --------------------------------------------------------
                                Preloader
        --------------------------------------------------------     
    */ 
    window.setTimeout(function(){
        document.getElementById('preloader').style.display = 'none';
    },500);

    // Main sections start 
    const mainSplit = Split(['#componentSection', '#projectSection', '#codeSection'], {
        direction: 'horizontal',
        gutterSize: 6,
        cursor: 'col-resize',
        minSize: [0, 0, 0],
        sizes: [10, 40, 50]
    });

    // Jquery UI sortable elements list
    $("#IDmetaBoxesList").sortable();
    $("#IDmetaBoxesList").disableSelection();
    $("#tabs").tabs();

    // Create code editor
    const codeContainer = new domObject('IDcodeContainer');
    editor = new Editor(codeContainer.object, "application/x-httpd-php", '');
    editor.setData();

    // id, label, description for meta box
    let metaBoxID = new domObject('IDmetaBoxID');
    let metaBoxInputLabel = new domObject('IDmetaBoxLabel');
    let metaBoxDescription = new domObject('IDmetaBoxDescription');

    let metaBoxesList = new domObject('IDmetaBoxesList'); // parent element
    var newMetaBox = new metaBox(metaBoxesList.object);

    // Click event for created element list
    const elemList = new domObject('IDelemList');
    elemList.events({
        onclick: function (event) {            
            newMetaBox.createMetaBoxElement(event.target.innerText, metaBoxID.object.value, metaBoxInputLabel.object.value, metaBoxDescription.object.value, '');
            newMetaBox.addShortCodeSection(metaBoxID.object.value);
            newMetaBox.getMetaBoxList();
            newMetaBox.dataRefresh();

            console.log(event.target.id);
            console.log(event.target.innerText);
            console.log(metaBoxID.object.value);
        }
    });

    // When element list move refresh all data
    let wpMetaBoxesList = new domObject('IDmetaBoxesList');
    wpMetaBoxesList.events({
        onmouseup: function (event) {

            setTimeout(function () {
                newMetaBox.getMetaBoxList();
                newMetaBox.dataRefresh();

                new domObject('IDmetaBoxID').object.value = event.target.parentNode.children[1].id;
                new domObject('IDmetaBoxLabel').object.value = event.target.parentNode.children[0].textContent;
                new domObject('IDmetaBoxDescription').object.value = event.target.parentNode.children[2].textContent;

                console.log(event.target.parentNode.children);
                console.log(event.target.parentNode.children[0].textContent);
                console.log(event.target.parentNode.children[1].id);
                console.log(event.target.parentNode.children[2].textContent);
            }, 30);
            //console.log(event.target.id);
        }
    });

    // Save plugin file  
    const save = new domObject('IDsave');
    save.events({
        onclick: function () {
            let pluginName = new domObject('IDpluginName').object.value;
            saveFile(pluginFolderPath + pluginName, pluginName + '.php', editor.getData(), function (data) { console.log(data) });
            //console.log('save files!');           
        }
    });

    // Save json data
    const saveJsonDat = new domObject('IDsaveJsonData');
    saveJsonDat.events({
        onclick: function () {
            let pluginName = new domObject('IDpluginName').object.value;
            saveJsonData(pluginFolderPath + pluginName, 'jsonData.json', jsonData, function (data) { console.log(data) });
            console.log(pluginFolderPath + pluginName + 'save files!');
        }
    });

    // Init all data
    let openFolderDialogBox = document.getElementById("IDloadJsonData");
    openFolderDialogBox.addEventListener('change', function () {
        var reader = new FileReader();
        reader.readAsText(this.files[0]);
        reader.onload = function () {
            pluginName = new domObject('IDpluginName');
            pluginURI = new domObject('IDpluginURI');
            version = new domObject('IDversion');
            Author = new domObject('IDAuthor');
            authorURI = new domObject('IDauthorURI');
            license = new domObject('IDlicense');
            textDomain = new domObject('IDtextDomain');

            pluralName = new domObject('IDpluralName');
            nameSingular = new domObject('IDnameSingular');
            description = new domObject('IDdescription');
            textDomainCPT = new domObject('IDtextDomainCPT');

            let jsonDat = JSON.parse(reader.result);

            pluginName.object.value = jsonDat.pluginName;
            pluginURI.object.value = jsonDat.pluginURI;
            version.object.value = jsonDat.version;
            Author.object.value = jsonDat.author;
            authorURI.object.value = jsonDat.authorURI;
            license.object.value = jsonDat.license;
            textDomain.object.value = jsonDat.textDomain;

            pluralName.object.value = jsonDat.pluralName;
            nameSingular.object.value = jsonDat.nameSingular;
            description.object.value = jsonDat.description;
            textDomainCPT.object.value = jsonDat.textDomainCPT;

            // let metaBoxesList = new domObject('IDmetaBoxesList'); // parent element
            // let newMetaBox1 = new metaBox(metaBoxesList.object);
            console.log(jsonDat);
            // console.log(jsonDat.dataArr[0][2]); 

            console.log(jsonDat.dataArr.length);

            for (let index = 0; index < jsonDat.dataArr.length; index++) {
                let str = jsonDat.dataArr[index];

                str = str.replace(/array/gi, "").replace(/'/g, "").replace(/=>/gi, ",").replace(/\(/gi, "").replace(/\)/gi, "");
                str = str.replace("↵", "").trim();
                arr = str.split(",");
                console.log(arr);
                console.log(str);

                let arrStr = '';
                for (let index = 7; index < arr.length - 4; index++) {
                    arrStr += "\n" + arr[index].replace(/"/gi, "").trim();
                }

                newMetaBox.createMetaBoxElement(arr[5].trim(), arr[3].trim(), arr[1].trim(), arr[arr.length - 2].trim(), arrStr);
                newMetaBox.addShortCodeSection(arr[3].trim());

            }

            elementList = jsonDat.dataArr;

            newMetaBox.getMetaBoxList();
            newMetaBox.dataRefresh();
        }
    });

    // Load json data (trigger for input upload button)
    let loadJsonData = new domObject('IDloadJsonDataClick');
    loadJsonData.events({
        onclick: function () {
            document.getElementById('IDloadJsonData').click();
        }
    });
});   