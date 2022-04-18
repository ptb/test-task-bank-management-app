import Modal from "./modal.js";
import Storage from "./storage.js";

const Table = () => {
  const container = document.querySelector("[data-table-body]");
  const modal = Modal();
  const storage = Storage();

  const create = ({
    id,
    bankName,
    interestRate,
    maximumLoan,
    minimumDownPayment,
    loanTerm,
  }) => {
    const count = container.childElementCount + 1;
    const HTML = `
		<tr class="table__row table__body-row" data-id="${id}">
		<td class="table__cell table__body-cell">${count}</td>
			<td class="table__cell table__body-cell">${bankName}</td>
			<td class="table__cell table__body-cell">${interestRate}</td>
			<td class="table__cell table__body-cell">${maximumLoan}</td>
			<td class="table__cell table__body-cell">${minimumDownPayment}</td>
			<td class="table__cell table__body-cell">${loanTerm}</td>
			<td class="table__cell table__body-cell table__cell-actions">
				<button class="table__body-cell-button table__button page-button" data-table-button="edit">
				<i class="page-button__icon fa-solid fa-pen"></i>
				</button>
				<button class="table__body-cell-button table__button page-button" data-table-button="remove">
				<i class="page-button__icon fa-solid fa-trash"></i>
			</button>
			</td>
		</tr>
		`;
    const template = document.createElement("template");
    template.innerHTML = HTML;
    const element = template.content.firstElementChild;
    container.appendChild(element);
  };

  const toggleEmpty = () => {
    const HTML = `
		  <tr class="table__row table__body-row table__row--empty">
			  <td class="table__cell table__cell--empty" colspan="7">
				  No items
			  </td>
		  </tr>
		  `;
    const template = document.createElement("template");
    template.innerHTML = HTML;
    const element = template.content.firstElementChild;
    container.appendChild(element);
  };

  const render = () => {
    container.innerHTML = "";
    const details = storage.get();
    if (!details.length) return toggleEmpty();
    return details.map(create);
  };

  const handleEvents = () => {
    container.addEventListener("click", ({ target }) => {
      if (target.closest('[data-table-button="edit"]')) {
        const { id } = target.closest("[data-id]").dataset;
        modal.render("edit", id);
        modal.toggle();
      }

      if (target.closest('[data-table-button="remove"]')) {
        const { id } = target.closest("[data-id]").dataset;
        modal.render("remove", id);
        modal.toggle();
      }
    });

    document.addEventListener("DOMContentLoaded", () => {
      render();
    });
  };

  return { handleEvents, render };
};

export default Table;
