import Modal from "./modal.js";
import Table from "./table.js";
import Header from "./header.js";

const header = Header();
header.handleEvents();

const modal = Modal();
modal.handleEvents();

const table = Table();
table.handleEvents();
