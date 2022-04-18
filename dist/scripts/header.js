import Modal from "./modal.js";

const Header = () => {
  const element = document.querySelector("[data-header]");
  const button = element.querySelector('[data-modal-button="add"]');
  const modal = Modal();

  const handleEvents = () =>
    button.addEventListener("click", () => {
      modal.render("add");
      modal.toggle();
    });

  return { handleEvents };
};

export default Header;
