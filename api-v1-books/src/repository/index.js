import makeDb from "../db";
import makeBookRepo from "./bookRepo";

const database = makeDb();
const bookRepo = makeBookRepo({ database });

export { bookRepo };

