import {Router} from "express";
import { ContactController } from "../controllers/contact.controller";
export const contactRoutes = Router();

contactRoutes.get('/create', ContactController.getCreatePage);
contactRoutes.post('/create', ContactController.addNewContact);
contactRoutes.get('/', ContactController.getListContact);
contactRoutes.post('/', ContactController.getListContact);
contactRoutes.get('/update', ContactController.getUpdatePage);
contactRoutes.post('/update', ContactController.updateContact);
contactRoutes.get('/delete', ContactController.deleteContact);