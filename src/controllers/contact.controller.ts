import { Contact } from "../models/schemas/contact.model";

export class ContactController {
    static async getCreatePage(req: any, res: any) {
        res.render("create");
    }

    static async addNewContact(req: any, res: any) {
        try {
            const contactNew = new Contact(req.body);
            const contact = await contactNew.save();
            if (contact) {
                res.redirect('/');
            } else res.render("error");
        } catch (err) {
            res.render("error");
        }
    }

    static async getListContact(req: any, res: any) {
        try {
            let size = 3;
            if (req.body.size) {
                size = +req.body.size;
            } else if (req.query.limit) {
                size = +req.query.limit;
            }
            let page = req.query.page ? +req.query.page : 1;
            const contactList = await Contact.find();
            let totalPage = Math.ceil(contactList.length / size);
            let offset = (page - 1) * size;
            const contacts = await Contact.find().limit(size).skip(offset);;
            res.render("home", { contacts: contacts, totalPage: totalPage, pageCurrent: page, limit: size, totalItem: contactList.length });
        } catch (err) {
            res.render('error');
        }
    }

    static async getUpdatePage(req: any, res: any) {
        try {
            let { id, page, limit } = req.query;
            if (id && page && limit) {
                const contact = await Contact.findOne({ _id: id });
                res.render('update', { contact: contact, pageCurrent: page, limit: limit });
            } else {
                res.redirect('/');
            }
        } catch (err) {
            res.render('error');
        }
    }

    static async updateContact(req: any, res: any) {
        try {
            let { id, page, limit } = req.query;
            if (id && page && limit) {
                let { name, address, email, phone } = req.body;
                const contact = await Contact.findOne({ _id: id });
                contact.name = name;
                contact.address = address;
                contact.email = email;
                contact.phone = phone;
                await contact.save();
                res.redirect(`/?page=${page}&limit=${limit}`);
            } else res.redirect('/');
        } catch (err) {
            res.render('error');
        }
    }

    static async deleteContact(req: any, res: any) {
        try {
            let { id, page, limit } = req.query;
            if (id && page && limit) {
                await Contact.deleteOne({_id: id});
                res.redirect(`/?page=${page}&limit=${limit}`);
            } else res.redirect('/');
        } catch (err) {
            res.render('error');
        }
    }
}