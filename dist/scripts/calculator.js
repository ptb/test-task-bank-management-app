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
    return initialLoan <= maximumLoan && downPayment <= minimumDownPayment;
  };

  const handleEvents = () => {
    selectContainer.addEventListener("change", ({ target }) => {
      currentBankId = target.value;
    });

    buttonReset.addEventListener("click", () => {
      form.reset();
    });

    buttonSubmit.addEventListener("click", () => {
      const data = getData();
      const bankDetails = data.filter(
        (item) => item.id === Number(currentBankId)
      );
      const { interestRate, loanTerm, maximumLoan, minimumDownPayment } =
        bankDetails[0];

      const initialLoan = Number(form.initialLoan.value);
      const downPayment = Number(form.downPayment.value);

      const details = {
        interestRate,
        loanTerm,
        maximumLoan,
        minimumDownPayment,
        initialLoan,
        downPayment,
      };

      if (checkRequiredOptions(details)) {
        const monthlyPayment =
          (initialLoan *
            ((interestRate / 12) *
              (1 + interestRate / 12) ** Number(loanTerm))) /
            (1 + interestRate / 12) ** Number(loanTerm) -
          1;

        console.log(monthlyPayment);
      }
    });
  };

  //   const getMonthlyPayment = (id) => {
  //     console.log(id);
  //   };

  return { renderBankNames, handleEvents };
})();

calculator.renderBankNames();
calculator.handleEvents();

// const monthlyPayment =
//   (amountBorrowed *
//     (interestRate / 12) *
//     (1 + interestRate / 12) ** numberOfMonthlyPayment) /
//     (1 + interestRate / 12) ** numberOfMonthlyPayment -
//   1;
