// --------------------------------------------------------- //
// Misc variables
// --------------------------------------------------------- //
var shortcodeArr = [];
var elements = [];

var arrElem = [];
var allElem = [];

var tagname = '';
var idName = '';
var className = '';

elementList = [];
var shortcodeSectionArr = [];
var selectOptionsArr = [];
var selectRadioOptionsArr = [];

var pluginName = null;
var pluginURI = null;
var version = null;
var Author = null;
var authorURI = null;
var license = null;
var textDomain = null;

var pluralName = null;
var nameSingular = null;
var description = null;
var textDomainCPT = null;

var jsonData = null;

//var pluginFolderPath = 'http://localhost/wordpress/wp-admin/wp-content/plugins/demo/';
var pluginFolderPath = 'C:/wamp64/www/wordpress/wp-content/plugins/';

// --------------------------------------------------------- //
// Delete element item
// --------------------------------------------------------- //
deleteMetaBoxElement = function (event) {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    console.log(event.target.parentNode);

    for (let i = 0; i < shortcodeSectionArr.length; i++) {
        if (event.target.parentNode.id == shortcodeSectionArr[i]) {
            shortcodeArr.splice(i, 1);
            shortcodeSectionArr.splice(i, 1);
            console.log(shortcodeSectionArr);
        }
    }
}

// --------------------------------------------------------- //
// Get textarea data for select element
// --------------------------------------------------------- //
getTextareaDataForSelect = function (event) {
    selectOptionsArr = event.target.value.split("\n");
    newMetaBox.getMetaBoxList();
    newMetaBox.dataRefresh();
    console.log(selectOptionsArr);
}

// --------------------------------------------------------- //
// Get textarea data for radio button element
// --------------------------------------------------------- //
getTextareaDataForRadio = function (event) {
    selectRadioOptionsArr = event.target.value.split("\n");
    newMetaBox.getMetaBoxList();
    newMetaBox.dataRefresh();
    console.log(selectRadioOptionsArr);
}

//----------------------------------------------------------------------------------//
//						    WP Metabox class                    
//----------------------------------------------------------------------------------//
class metaBox {
    // Metabox constructor
    constructor(parent) {
        this.parent = parent;
    }

    // Create new Meta Box Element
    createMetaBoxElement(elem, id, label, description, radioSelectData = '') {
        let liID = misc.randomID('IDli', 999999);
        let elemStr = elem.toLowerCase();
        switch (elemStr) {
            case 'radio':
                this.parent.insertAdjacentHTML('beforeend', '<li id="' + liID + '"><label>' + label +
                    '</label><input id="' + id + '" type="radio"><p>' + description +
                    '</p><button class="deleteElementButton" onclick = deleteMetaBoxElement(event)>x</button>' +
                    '<textarea class="textareaStyle" id="' + misc.randomID('IDtextarea', 999999) + '" style="margin-left:30px" oninput = getTextareaDataForRadio(event)>' + radioSelectData + '</textarea></li>');
                break;

            case 'textarea':
                this.parent.insertAdjacentHTML('beforeend', '<li id="' + liID + '"><label>' + label + '</label><textarea id="' + id + '"></textarea><p>' + description + '</p><button class="deleteElementButton" onclick = deleteMetaBoxElement(event)>x</button></li>');
                break;

            case 'select':
                this.parent.insertAdjacentHTML('beforeend', '<li id="' + liID + '"><label>' + label +
                    '</label><select id="' + id + '"></select><p>' + description +
                    '</p><button class="deleteElementButton" onclick = deleteMetaBoxElement(event)>x</button>' +
                    '<textarea class="textareaStyle" id="' + misc.randomID('IDtextarea', 999999) + '" style="margin-left:30px" oninput = getTextareaDataForSelect(event)>' + radioSelectData + '</textarea></li>');
                break;

            default:
                this.parent.insertAdjacentHTML('beforeend', '<li id="' + liID + '"><label>' + label + '</label><input id="' + id + '" type="' + elemStr + '"><p>' + description + '</p><button class="deleteElementButton" onclick = deleteMetaBoxElement(event)>x</button></li>');
                break;
        }

        let addArr = `array('label' => '` + label + `', 'id' => '` + id + `', 'type' => '` + elemStr + `', 'description' => '` + description + `'),`;

        elementList.push(addArr);
        //console.log(elementList);

        shortcodeSectionArr.push(liID);
        //console.log(shortcodeSectionArr);
    }

    // Add shortcode section code
    addShortCodeSection(ID) {
        var shortcode = `if (get_post_meta($post->ID, '` + ID + `', true)) :
                $`+ ID + ` = get_post_meta($post->ID, '` + ID + `', true);
            endif;`;
        shortcodeArr.push(shortcode);
    }

    // Refresh plugin data, custom post type data
    dataRefresh() {
        pluginName = new domObject('IDpluginName');
        pluginURI = new domObject('IDpluginURI');
        version = new domObject('IDversion');
        Author = new domObject('IDAuthor');
        authorURI = new domObject('IDauthorURI');
        license = new domObject('IDlicense');
        textDomain = new domObject('IDtextDomain');

        let pluginInfoData = "Plugin Name: " + pluginName.object.value +
            "\nPlugin URI: " + pluginURI.object.value +
            "\nVersion: " + version.object.value +
            "\nAuthor: " + Author.object.value +
            "\nAuthor URI: " + authorURI.object.value +
            "\nLicense: " + license.object.value +
            "\nText Domain: " + textDomain.object.value + "\n";

        pluralName = new domObject('IDpluralName');
        nameSingular = new domObject('IDnameSingular');
        description = new domObject('IDdescription');
        textDomainCPT = new domObject('IDtextDomainCPT');

        let plgStr = pluginStr(pluralName.object.value, nameSingular.object.value, description.object.value, textDomainCPT.object.value);
        self.newEditor.setValue('<?php\n' + '/*\n' + pluginInfoData + '*/\n' + plgStr + '?>');

        jsonData = {
            pluginName: pluginName.object.value,
            pluginURI: pluginURI.object.value,
            version: version.object.value,
            author: Author.object.value,
            authorURI: authorURI.object.value,
            license: license.object.value,
            textDomain: textDomain.object.value,

            pluralName: pluralName.object.value,
            nameSingular: nameSingular.object.value,
            description: description.object.value,
            textDomainCPT: textDomainCPT.object.value,
            dataArr: elementList
        }

        let strfy = JSON.stringify(jsonData);
    }

    // Get all meta boxes
    getMetaBoxList = function () {
        let wpMetaBoxesList = new domObject('IDmetaBoxesList');
        let listLenght = wpMetaBoxesList.object.children.length;
        let listItems = wpMetaBoxesList.object.children;

        elementList = [];
        let addArr;

        for (let index = 0; index < listLenght; index++) {
            if (listItems[index].childNodes[1].type.toLowerCase() == 'radio') {
                let strSelectRadioOptionsArr = '';

                let valArr = listItems[index].childNodes[4].value.split('\n');
                for (let i = 0; i < valArr.length; i++) {

                    strSelectRadioOptionsArr += '"' + valArr[i] + '",';

                }

                addArr = `array('label' => '` + listItems[index].childNodes[0].innerHTML + `', 'id' => '` + listItems[index].childNodes[1].id + `', 'type' => 'radio', 
                'options' => array(
                    ` + strSelectRadioOptionsArr + `
                ), 
                'description' => '` + listItems[index].childNodes[2].innerHTML + `'),
            `;

                console.log(valArr);

            }
            else if (listItems[index].childNodes[1].type.toLowerCase() == 'select-one') {
                let strselectOptionsArr = '';

                let valArr = listItems[index].childNodes[4].value.split('\n');
                for (let i = 0; i < valArr.length; i++) {

                    strselectOptionsArr += '"' + valArr[i] + '",';

                }

                addArr = `array('label' => '` + listItems[index].childNodes[0].innerHTML + `', 'id' => '` + listItems[index].childNodes[1].id + `', 'type' => 'select', 
                'options' => array(
                    ` + strselectOptionsArr + `
                ), 
                'description' => '` + listItems[index].childNodes[2].innerHTML + `'),
            `;

                console.log(valArr);

            }
            else if (listItems[index].childNodes[1].type.toLowerCase() == 'file') {
                addArr = `array('label' => '` + listItems[index].childNodes[0].innerHTML + `', 'id' => '` + listItems[index].childNodes[1].id + `', 'type' => 'media', 'description' => '` + listItems[index].childNodes[2].innerHTML + `'),
            `;
            }
            else {
                addArr = `array('label' => '` + listItems[index].childNodes[0].innerHTML + `', 'id' => '` + listItems[index].childNodes[1].id + `', 'type' => '` + listItems[index].childNodes[1].type.toLowerCase() + `', 'description' => '` + listItems[index].childNodes[2].innerHTML + `'),
            `;
            }

            elementList.push(addArr);
        }
        console.log(wpMetaBoxesList.object.children);
    }
}