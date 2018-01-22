// BUDGET CONTROLLER
var budgetController = (function () {

})();


// UI CONTROLLER
var UIController = (function () {
    var DOMString = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        addBtn : '.add__btn'
    }
    return {
        getInput : function () {
            return {
                type : document.querySelector(DOMString.inputType).value,
                description : document.querySelector(DOMString.inputDescription).value,
                value : document.querySelector(DOMString.inputValue).value,
            }
        },
        getDOMstrings : function () {
            return DOMString;
        }
    }

})();


//GLOBAL APP CONTROLLER
var appController = (function (budgetCtrl, UICtrl) {
    var DOM = UICtrl.getDOMstrings();
    var appCtrlAddItem = function () {
        // 1. Get the filled input data
        var input = UICtrl.getInput();
        console.log(input);
        // 2. Add the item to the budget controller
        // 3. Add the item to the UI
        // 4. Cal budget
        // 5. Display the budget on the UI
    }
    document.querySelector(DOM.addBtn).addEventListener('click', appCtrlAddItem);

    document.addEventListener('keypress', function (ev) {
        if(ev.keyCode === 13 || ev.which === 13){
            appCtrlAddItem();
        }
    });

})(budgetController,UIController);

(function () {
    var Person = function (name, phone) {
        this.name = name;
        this.phone = phone;
    };

    Person.prototype.career = function (career) {
        console.log(this.name+" is a "+career+" guy");
    }

    var sam = new Person('Sam', '08030600957');
    sam.career('UX');
})();