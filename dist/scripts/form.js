const Form = () => {
  const element = document.querySelector("[data-modal-form]");

  const getId = () =>
    Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

  const getData = (id = getId()) => {
    const formData = new FormData(element);
    const details = {
      id,
      bankName: formData.get("bankName"),
      interestRate: Number(formData.get("interestRate")),
      maximumLoan: Number(formData.get("maximumLoan")),
      minimumDownPayment: Number(formData.get("minimumDownPayment")),
      loanTerm: Number(formData.get("loanTerm")),
    };
    return details;
  };

  return { getData };
};

export default Form;
