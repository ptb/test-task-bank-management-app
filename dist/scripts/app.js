import Modal from "./modal.js";
import Table from "./table.js";
import Header from "./header.js";
import Storage from "./storage.js";

const header = Header();
header.handleEvents();

const modal = Modal();
modal.handleEvents();

const table = Table();
table.handleEvents();

const storage = Storage();
storage.init();
