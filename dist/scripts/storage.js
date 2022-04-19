const Storage = () => {
  const name = "bankDetails";

  const get = () => JSON.parse(localStorage.getItem(name)) || [];

  const getById = (id) => {
    const details = JSON.parse(localStorage.getItem(name));
    const index = details.findIndex((item) => item.id === Number(id));
    return details[index];
  };

  const add = (item) => {
    if (localStorage.getItem(name) === null) {
      return localStorage.setItem(name, JSON.stringify([item]));
    }

    const details = JSON.parse(localStorage.getItem(name));
    details.push(item);
    return localStorage.setItem(name, JSON.stringify(details));
  };

  const remove = (id) => {
    if (localStorage.getItem(name) !== null) {
      const details = JSON.parse(localStorage.getItem(name));
      const updatedDetails = details.filter((item) => item.id !== Number(id));
      localStorage.setItem(name, JSON.stringify(updatedDetails));
    }
  };

  const edit = (id, data) => {
    const details = JSON.parse(localStorage.getItem(name));
    const index = details.findIndex((item) => item.id === Number(id));
    details.splice(index, 1, data);
    localStorage.setItem(name, JSON.stringify(details));
  };

  const init = () => {
    const details = [
      {
        id: 0,
        bankName: "local bank 1",
        interestRate: 12.5,
        maximumLoan: 2500,
        minimumDownPayment: 25,
        loanTerm: 24,
      },
      {
        id: 1,
        bankName: "local bank 2",
        interestRate: 14.5,
        maximumLoan: 1500,
        minimumDownPayment: 25,
        loanTerm: 12,
      },
      {
        id: 2,
        bankName: "local bank 3",
        interestRate: 25.5,
        maximumLoan: 1000,
        minimumDownPayment: 50,
        loanTerm: 8,
      },
      {
        id: 3,
        bankName: "local bank 4",
        interestRate: 12.5,
        maximumLoan: 3000,
        minimumDownPayment: 25,
        loanTerm: 32,
      },
    ];

    if (localStorage.getItem(name) === null) details.forEach(add);
  };

  return {
    get,
    add,
    remove,
    edit,
    getById,
    init,
  };
};

export default Storage;
