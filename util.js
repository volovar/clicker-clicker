// util
var Util = {
    createNewElement: function(optionsObj) {
        // optionsObj requires type and parentID properties
        var newChild = document.createElement(optionsObj.type);
        var parent = document.getElementById(optionsObj.parentID);

        if (optionsObj.className) {
            newChild.className = optionsObj.className;
        }

        if (optionsObj.idName) {
            newChild.id = optionsObj.idName;
        }

        if (optionsObj.elementContent) {
            newChild.textContent = optionsObj.elementContent;
        }

        parent.appendChild(newChild);
    }
}