class domObject {

    constructor(elID) {
        this.objID = elID;
        //this.object = null;
        this.eventList = null;
        this.object = document.getElementById(this.objID);
        //console.log(this.object); 
        //return this;
    }

    //-------------------------------------------------------------------------------//
    // 								Set attributes                     
    //-------------------------------------------------------------------------------//
    setAttributes(attrObj) {
        Object.assign(this.object, attrObj);
    }

    //-------------------------------------------------------------------------------//
    // 								Get element id                     
    //-------------------------------------------------------------------------------//
    getID(elID) {
        this.object = document.getElementById(elID);
        return this.object;
    }

    //-------------------------------------------------------------------------------//
    // 								All events list                    
    //-------------------------------------------------------------------------------// 
    events(eventObj) {
        Object.assign(this.object, eventObj);
        this.eventList = eventObj;
    }

    //-------------------------------------------------------------------------------//
    // 			                    Event list					                    
    //-------------------------------------------------------------------------------// 
    eventList(events) {
        for (let i = 0; i < events.length; i++) {
            this.object.addEventListener(events[i].event, events[i].callback);
        }
    }

    //-------------------------------------------------------------------------------//
    //                              Get element id                     
    //-------------------------------------------------------------------------------//
    bridge(from, to) {
        let  firstElem = document.getElementById(from);
        let  secondElem = document.getElementById(to);

        firstElem.oninput = function(){
            secondElem.innerHTML = firstElem.value;
        }
    }
}