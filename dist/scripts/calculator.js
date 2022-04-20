import Storage from "./storage.js";

const calculator = (() => {
  const selectContainer = document.querySelector(
    "[data-calculator-bank-select]"
  );
  const buttonReset = document.querySelector(
    '[data-calculator-button="reset"]'
  );
  const buttonSubmit = document.querySelector(
    '[data-calculator-button="submit"]'
  );
  const resultContainer = document.querySelector("[data-calculator-result]");
  const resultValue = document.querySelector("[data-calculator-result-value]");

  let currentBankId;

  const form = document.querySelector("[data-calculator-form]");

  const storage = Storage();

  const getData = () => storage.get();

  const createSelectElement = ({ id, bankName }) => {
    const HTML = `<option value="${id}" class="calculator__form-select-option">${bankName}</option>`;
    const template = document.createElement("template");
    template.innerHTML = HTML;
    const element = template.content.firstElementChild;
    return element;
  };

  const addSelectElement = (element) => selectContainer.appendChild(element);

  const renderBankNames = () => {
    const data = getData();
    data.map(createSelectElement).forEach(addSelectElement);
    currentBankId = selectContainer.firstElementChild.value;
  };

  const checkRequiredOptions = (details) => {
    const { initialLoan, maximumLoan, downPayment, minimumDownPayment } =
      details;
    return initialLoan <= maximumLoan && downPayment >= minimumDownPayment;
  };

  const getBankDetails = () => {
    const data = getData();
    const bankDetails = data.filter(
      (item) => item.id === Number(currentBankId)
    );
    const { interestRate, loanTerm, maximumLoan, minimumDownPayment } =
      bankDetails[0];

    const initialLoan = Number(form.initialLoan.value);
    const downPayment = Number(form.downPayment.value);

    return {
      interestRate,
      loanTerm,
      maximumLoan,
      minimumDownPayment,
      initialLoan,
      downPayment,
    };
  };

  const getCalculation = () => {
    const details = getBankDetails();
    const { downPayment, initialLoan, interestRate, loanTerm } = details;

    if (checkRequiredOptions(details)) {
      const interestRatePercentage = interestRate / 100;
      const balance = initialLoan - downPayment;
      const monthlyRate = interestRatePercentage / 12;

      const monthlyPayment = balance * (monthlyRate / (1 - Math.pow(1 + monthlyRate, - loanTerm)))

      return monthlyPayment;
    }
  };

  const handleEvents = () => {
    selectContainer.addEventListener("change", ({ target }) => {
      currentBankId = target.value;
      resultContainer.classList.add("hidden");
    });

    buttonReset.addEventListener("click", () => {
      resultContainer.classList.add("hidden");
      form.reset();
    });

    buttonSubmit.addEventListener("click", () => {
      if (getCalculation()) {
        const monthlyPayment = getCalculation();
        const formatedValue = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(monthlyPayment.toFixed(2));
        resultValue.textContent = formatedValue;
        resultContainer.classList.remove("hidden");
      }
    });
  };

  return { renderBankNames, handleEvents };
})();

calculator.renderBankNames();
calculator.handleEvents();
