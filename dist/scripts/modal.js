import Form from "./form.js";
import Table from "./table.js";
import Storage from "./storage.js";

const Modal = () => {
  const container = document.querySelector("[data-modal]");

  const storage = Storage();

  const toggle = () => container.classList.toggle("hidden");

  const create = (HTML) => {
    const template = document.createElement("template");
    template.innerHTML = HTML;
    const element = template.content.firstElementChild;
    container.appendChild(element);
  };

  const add = () => {
    const HTML = `
		<div class="modal__content" data-modal-content>
		<div class="modal__header">
			<span class="modal__header-title">Add new bank</span>
			<button class="modal__header-button page-button modal__header-button" data-modal-button="close">
				<i class="page-button__icon modal__header-button-icon fa-solid fa-xmark fa-2x"></i>
			</button>
		</div>
		<div class="modal__main">
			<form class="modal__form" data-modal-form>
				<div class="modal__form-group">
					<input type="text" class="modal__form-input" id="bankName" name="bankName" placeholder="Your personal bank" required>
					<label for="bankName" class="modal__form-label">
						Bank name
					</label>
				</div>
				<div class="modal__form-group">
					<input type="text" class="modal__form-input" id="interestRate" name="interestRate" placeholder="8.25%" required>
					<label for="interestRate" class="modal__form-label">
						Interest rate
					</label>
				</div>
				<div class="modal__form-group">
					<input type="text" class="modal__form-input" id="maximumLoan" name="maximumLoan" placeholder="$250.00" required>
					<label for="maximumLoan" class="modal__form-label">
						Maximum loan
					</label>
				</div>
				<div class="modal__form-group">
					<input type="text" class="modal__form-input" id="minimumDownPayment" name="minimumDownPayment" placeholder="$20.00" required>
					<label for="minimumDownPayment" class="modal__form-label">
						Minimum down payment
					</label>
				</div>
				<div class="modal__form-group">
					<input type="text" class="modal__form-input" id="loanTerm" name="loanTerm" placeholder="8 Months" required>
					<label for="loanTerm" class="modal__form-label">
						Loan term
					</label>
				</div>
		</div>
		<div class="modal__footer">
			<button class="modal__footer-button page-button page-button--secondary"
				data-modal-button="cancel">Cancel</button>
			<button type="submit" class="modal__footer-button page-button page-button--primary"
				data-modal-button="submit">Submit</button>
		</div>
		</form>
	</div>
		`;
    create(HTML);
  };
  const edit = (id) => {
    const {
      bankName,
      interestRate,
      maximumLoan,
      minimumDownPayment,
      loanTerm,
    } = storage.getById(id);

    const HTML = `
		<div class="modal__content" data-modal-content data-table-element-id="${id}">
		<div class="modal__header">
			<span class="modal__header-title">Edit bank information</span>
			<button class="modal__header-button page-button modal__header-button" data-modal-button="close">
				<i class="page-button__icon modal__header-button-icon fa-solid fa-xmark fa-2x"></i>
			</button>
		</div>
		<div class="modal__main">
			<form class="modal__form" data-modal-form>
				<div class="modal__form-group">
					<input type="text" class="modal__form-input" id="bankName" name="bankName" value="${bankName}">
					<label for="bankName" class="modal__form-label">
						Bank name
					</label>
				</div>
				<div class="modal__form-group">
					<input type="text" class="modal__form-input" id="interestRate" name="interestRate" value="${interestRate}">
					<label for="interestRate" class="modal__form-label">
						Interest rate
					</label>
				</div>
				<div class="modal__form-group">
					<input type="text" class="modal__form-input" id="maximumLoan" name="maximumLoan" value="${maximumLoan}">
					<label for="maximumLoan" class="modal__form-label">
						Maximum loan
					</label>
				</div>
				<div class="modal__form-group">
					<input type="text" class="modal__form-input" id="minimumDownPayment" name="minimumDownPayment" value="${minimumDownPayment}">
					<label for="minimumDownPayment" class="modal__form-label">
						Minimum down payment
					</label>
				</div>
				<div class="modal__form-group">
					<input type="text" class="modal__form-input" id="loanTerm" name="loanTerm" value="${loanTerm}">
					<label for="loanTerm" class="modal__form-label">
						Loan term
					</label>
				</div>
			</form>
		</div>
		<div class="modal__footer">
			<button class="modal__footer-button page-button page-button--secondary" data-modal-button="cancel">Cancel</button>
			<button class="modal__footer-button page-button page-button--primary" data-modal-button="save">Save</button>
		</div>
	</div>
		`;
    create(HTML);
  };

  const remove = (id) => {
    const HTML = `
<div class="modal__content" data-modal-content data-table-element-id="${id}">
<div class="modal__header">
<span class="modal__header-title">Confirmation</span>
<button class="modal__header-button page-button modal__header-button" data-modal-button="close">
<i class="page-button__icon modal__header-button-icon fa-solid fa-xmark fa-2x"></i>
</button>
</div>
<div class="modal__main">
<p class="modal__main-text">Are you sure to delete this item?</p>
</div>
<div class="modal__footer">
<button class="modal__footer-button page-button page-button--secondary" data-modal-button="cancel">Cancel</button>
<button class="modal__footer-button page-button page-button--primary" data-modal-button="delete">Delete</button>
</div>
</div>`;
    create(HTML);
  };

  const render = (type, id) => {
    if (type === "add") add();
    if (type === "edit") edit(id);
    if (type === "remove") remove(id);
  };

  const clear = () => {
    container.innerHTML = "";
  };
  const close = () => {
    toggle();
    clear();
  };

  const handleEvents = () =>
    container.addEventListener("click", ({ target }) => {
      if (
        target.closest('[data-modal-button="close"]') ||
        target.closest('[data-modal-button="cancel"]')
      ) {
        close();
      }

      if (target.closest('[data-modal-button="submit"]')) {
        const form = Form();
        const table = Table();
        const data = form.getData();
        storage.add(data);
        table.render();
        close();
      }

      if (target.closest('[data-modal-button="delete"]')) {
        const { tableElementId: id } = target.closest(
          "[data-table-element-id]"
        ).dataset;
        const table = Table();
        storage.remove(id);
        table.render();
        close();
      }

      if (target.closest('[data-modal-button="save"]')) {
        const { tableElementId: id } = target.closest(
          "[data-table-element-id]"
        ).dataset;
        const table = Table();
        const form = Form();
        const data = form.getData(Number(id));
        storage.edit(id, data);
        table.render();
        close();
      }
    });

  return { toggle, render, handleEvents };
};

export default Modal;
