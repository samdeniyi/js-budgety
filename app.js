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

    var calculateTotal  = function (type) {
        var sum = 0;
        data.allItems[type].forEach(
            function (value) {
                sum = sum + cur.value
            }
        )
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
    };



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
        calculateBudget: function () {
            // cal total income and expenses
            // cal the budget:  inc - exp
            // cal the % of income we spent
        },
        testing: function () {
            console.log("Testing Method", data.allItems)
        }
    };
})();

// UI CONTROLLER
var UIController = (function () {
    var DOMString = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        addBtn : '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }
    return {
        getInput : function () {
            return {
                type : document.querySelector(DOMString.inputType).value,
                description : document.querySelector(DOMString.inputDescription).value,
                value : parseFloat(document.querySelector(DOMString.inputValue).value),
            }
        },

        addListItem : function (obj, type) {
            var html, newHtml, element;
            if(type ==='inc'){
                element = DOMString.incomeContainer;
                html='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div></div>';
            }else if(type ==='exp'){
                element = DOMString.expensesContainer;
                html='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

        },

        clearFields: function(){
            var fields;
            fields = document.querySelectorAll(DOMString.inputDescription + ', ' + DOMString.inputValue);
            console.log("fields",fields),
            fieldArr = Array.prototype.slice.call(fields);
            console.log("fieldArr",Array),
            fieldArr.forEach(function (current, index, array) {
                current.value = "";
            });

            fieldArr[0].focus();
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
    var updateBudget = function () {
        // 1. cal the budget

        // 2. Return the buget
        // 3. Display the budget on the UI
    };
    var appCtrlAddItem = function () {
        var input, newItem;
        // 1. Get the filled input data
        input = UICtrl.getInput();
        if(input.description !=="" && !isNaN(input.value) && input.value >0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            UICtrl.clearFields();
            // 4. Cal budget
            // 5. Display the budget on the UI
            updateBudget();
        }
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