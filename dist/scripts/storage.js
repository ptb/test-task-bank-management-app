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

  return {
    get,
    add,
    remove,
    edit,
    getById,
  };
};

export default Storage;
