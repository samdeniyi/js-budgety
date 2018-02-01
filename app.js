// BUDGET CONTROLLER
var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        }
    }

    return{
        addItem: function (type, des, val) {
            var newItem, ID;

            if(data.allItems[type].length == 0){
                ID = 0
            }else{
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }

            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },
        testing : function () {
            console.log(data.allItems);
        }
    }
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
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.addBtn).addEventListener('click', appCtrlAddItem);
        document.addEventListener('keypress', function (ev) {
            if(ev.keyCode === 13 || ev.which === 13){
                appCtrlAddItem();
            }
        });
    };
    var appCtrlAddItem = function () {
        var input, newItem;
        // 1. Get the filled input data
        input = UICtrl.getInput();
        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. Add the item to the UI
        // 4. Cal budget
        // 5. Display the budget on the UI
        budgetCtrl.testing();
    };

    return {
        init: function () {
            console.log('init', 'Application has started');
            setupEventListeners();
        }
    }

})(budgetController,UIController);
appController.init();
(function () {
    // var Person = function (name, phone) {
    //     this.name = name;
    //     this.phone = phone;
    // };

    // Person.prototype.career = function (career) {
    //     console.log(this.name+" is a "+career+" guy");
    // }

    // var sam = new Person('Sam', '08030600957');
    // sam.career('UX');
})();