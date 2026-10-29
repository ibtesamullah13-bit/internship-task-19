
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const expenseList = document.getElementById("expenseList");
const totalDisplay = document.getElementById("total");
const filterCategory = document.getElementById("filterCategory");

// Store all expenses in an array
let expenses = [];

// Add a new expense
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;

    if (name === "" || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid name and amount.");
        return;
    }

    const expense = {
        id: Date.now() + Math.random(),
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(expense);

    expenseForm.reset();

    renderExpenses();
});

// Display expenses and update the total
function renderExpenses() {
    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;

        // Apply the category filter
        if (
            filterCategory.value !== "All" &&
            expense.category !== filterCategory.value
        ) {
            return;
        }

        const li = document.createElement("li");
        li.className = "expense-item";

        const details = document.createElement("div");
        details.className = "expense-details";

        const name = document.createElement("h3");
        name.textContent = expense.name;

        const category = document.createElement("p");
        category.textContent = expense.category;

        details.append(name, category);

        const right = document.createElement("div");
        right.className = "expense-right";

        const amount = document.createElement("p");
        amount.className = "expense-amount";
        amount.textContent = "Rs. " + expense.amount.toFixed(2);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            expenses = expenses.filter(function(item) {
                return item.id !== expense.id;
            });

            renderExpenses();
        });

        right.append(amount, deleteButton);
        li.append(details, right);
        expenseList.appendChild(li);
    });

    // Show a message if there are no matching expenses
    if (expenseList.children.length === 0) {
        const message = document.createElement("li");
        message.className = "empty-message";
        message.textContent = "No expenses to display.";
        expenseList.appendChild(message);
    }

    // Total includes all expenses, even while filtering
    totalDisplay.textContent = "Rs. " + total.toFixed(2);
}

// Update the list when the category changes
filterCategory.addEventListener("change", renderExpenses);
