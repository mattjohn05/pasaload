function transferLoad() {
    let sender = document.getElementById("sender").value.trim();
    let receiver = document.getElementById("receiver").value.trim();
    let amount = parseInt(document.getElementById("amount").value);

    if (!isValidPhoneNumber(sender) || !isValidPhoneNumber(receiver)) {
        showMessage("Invalid sender or receiver phone number.");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        showMessage("Invalid amount.");
        return;
    }

    let senderBalance = localStorage.getItem(sender);
    if (!senderBalance || parseInt(senderBalance) < amount) {
        showMessage("Insufficient balance.");
        return;
    }

    localStorage.setItem(sender, parseInt(senderBalance) - amount);

    let receiverBalance = localStorage.getItem(receiver);
    if (receiverBalance) {
        localStorage.setItem(receiver, parseInt(receiverBalance) + amount);
    } else {
        localStorage.setItem(receiver, amount);
    }

    showMessage(`Successfully transferred ${amount} load from ${sender} to ${receiver}.`);
}

function checkBalance() {
    let number = document.getElementById("sender").value.trim();

    if (!isValidPhoneNumber(number)) {
        showMessage("Invalid phone number.");
        return;
    }

    let balance = localStorage.getItem(number);
    if (balance) {
        showMessage(`Balance for ${number}: ${balance}`);
    } else {
        showMessage(`No balance found for ${number}.`);
    }
}

function showMessage(message) {
    document.getElementById("message").textContent = message;
}

function isValidPhoneNumber(phoneNumber) {
    return phoneNumber.trim() !== "";
}

function addBalance() {
    let sender = document.getElementById("sender").value.trim();
    let amountToAdd = parseInt(prompt("Enter amount to add:"));

    if (!isValidPhoneNumber(sender)) {
        showMessage("Invalid sender phone number.");
        return;
    }

    if (isNaN(amountToAdd) || amountToAdd <= 0) {
        showMessage("Invalid amount to add.");
        return;
    }

    let senderBalance = localStorage.getItem(sender);
    if (senderBalance) {
        senderBalance = parseInt(senderBalance); 
        localStorage.setItem(sender, senderBalance + amountToAdd);
    } else {
        localStorage.setItem(sender, amountToAdd);
        senderBalance = amountToAdd; 
    }

    showMessage(`Added ${amountToAdd} to ${sender}'s balance. New balance: ${senderBalance + amountToAdd}`);
}
