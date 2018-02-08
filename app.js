// BUDGET CONTROLLER
var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage= -1;
    };

    Expense.prototype.calPercantages = function(totalIncome){
        if(totalIncome>0){
            this.percentage = Math.round((this.value / totalIncome) * 100);            
        }else{
            this.percentage = -1;
        }
    };

    
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal  = function (type) {
        var sum = 0;
        data.allItems[type].forEach(
            function (cur) {
                sum += cur.value;
            });

            data.totals[type] =  sum;
    };

    var data = {
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        },
        budget:0,
        percentage:-1
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

        deleteItem: function(type, id){
            var ids, index;
            ids = data.allItems[type].map(function(current){
                return current.id;
            });
            index = ids.indexOf(id);
            if(index !==-1){
                data.allItems[type].splice(index, 1);
                console.log("deleteItem index",data.allItems);
            }
        },
        calculateBudget: function () {
            // cal total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // cal the budget:  inc - exp
            data.budget = data.totals.inc - data.totals.exp;
            // cal the % of income we spent
            if(data.totals.inc > 0 ){
                data.percentage = Math.round( (data.totals.exp/data.totals.inc) * 100 );                
            }else{
                data.percentage = -1;
            }
        },
        calculatePercantages: function(){

        },
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        expensesLabel: '.budget__expenses--value',
        incomeLabel: '.budget__income--value',
        percentageLabel: '.budget__expenses--percentage',
        itemPercentageLabel:'.item__percentage',
        container: '.container'
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
                html='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div></div>';
            }else if(type ==='exp'){
                element = DOMString.expensesContainer;
                html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

        },

        deleteListItem(selectorId){
            var el  = document.getElementById(selectorId);
            el.parentNode.removeChild(el);
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
        
        displayBudget(obj){
            console.log("displayBudget", obj);
            document.querySelector(DOMString.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMString.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMString.expensesLabel).textContent = obj.totalExp;
            if(obj.percentage > 0){
                document.querySelector(DOMString.percentageLabel).textContent = obj.percentage + "%";                 
            }else{
                document.querySelector(DOMString.percentageLabel).textContent = '';                                 
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
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
    };

    var updateBudget = function () {
        // 1. cal the budget
            budgetCtrl.calculateBudget();
        // 2. Return the buget
        var budget = budgetCtrl.getBudget();
        // 3. Display the budget on the UI
         UICtrl.displayBudget(budget);
    };

    var updatePercentages = function(){
            // 1. cal %
            // 2. read % from the budget controller
            // 3. update the UI with the new %
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
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event){
        var itemID,splitID,type,ID ;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            budgetCtrl.deleteItem(type,ID);
            UICtrl.deleteListItem(itemID);
            updateBudget();
            updatePercentages();
        }
    };
    
    return {
        init: function () {
            console.log('init', 'Application has started');
            setupEventListeners();
            UICtrl.displayBudget(
                {
                    budget:0,
                    totalInc: 0,
                    totalExp: 0,
                    percentage: -1
                }
            );
            
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