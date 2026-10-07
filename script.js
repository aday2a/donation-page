"use strict";

const amountInput = document.getElementById("amount");
const walletAddress = document.getElementById("walletAddress");
const copyButton = document.getElementById("copyButton");
const donateButton = document.getElementById("donateButton");
const message = document.getElementById("message");
const toast = document.getElementById("toast");
const amountButtons = document.querySelectorAll(".amounts button");

amountButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        amountInput.value = button.dataset.amount;

        amountButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");
    });
});

amountInput.addEventListener("input", function () {
    amountButtons.forEach(function (button) {
        button.classList.remove("active");
    });
});

copyButton.addEventListener("click", async function () {
    const address = walletAddress.value;

    try {
        await navigator.clipboard.writeText(address);
        showToast("تم نسخ عنوان TRC20");
    } catch (error) {
        walletAddress.select();
        document.execCommand("copy");
        showToast("تم نسخ عنوان TRC20");
    }
});

donateButton.addEventListener("click", function () {
    const amount = Number(amountInput.value);

    if (!amount || amount <= 0) {
        message.textContent = "يرجى إدخال مبلغ التبرع أولًا.";
        message.style.color = "#e53935";
        return;
    }

    message.textContent =
        "مبلغ التبرع: " +
        amount.toFixed(2) +
        " USDT — أرسل المبلغ عبر شبكة TRC20 إلى العنوان الظاهر أعلاه.";

    message.style.color = "#555";
});

function showToast(text) {
    toast.textContent = text;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2000);
}
