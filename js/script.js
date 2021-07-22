class User {
    constructor (obj) {
        this.data = obj;
    }
    edit(obj) {
        this.data = obj;
    }
    get() {
        return this.data;
    }
}
class Contacts {
    constructor() {
        this.data = [];
    }
    add(data) {
        let user = new User(data);
        this.data.push(user);
        

    }
    edit(id, obj) {
        let user = this.data.find(function(item) {
          return item.get().id === id
        });
        user.edit(obj);
    }
    remove(id) {
        this.data = this.data.filter(function(item) {
            return item.get().id !== id
        });
    }

}

class ContactsApp extends Contacts {
    constructor() {
        super();
        this.init();
    }
    init() {
        const contactsElem = document.createElement('div');
        contactsElem.classList.add('contacts');

        const contactsForm = document.createElement('div');
        contactsForm.classList.add('contacts__form');

        this.contactsList = document.createElement('div');
        this.contactsList.classList.add('contacts__list');

        const contactsInput = document.createElement('input');
        contactsInput.setAttribute('name', 'contacts_add');

        contactsElem.appendChild(contactsForm);
        contactsForm.appendChild(contactsInput);
        contactsElem.appendChild(this.contactsList);
        document.body.appendChild(contactsElem);

        contactsInput.addEventListener('keyup', event => {
            this.onAdd(event);
        });

        this.contactsList.addEventListener('click', event => {
            if (event.target.nodeName === 'BUTTON') {
                if (event.target.innerHTML === 'delete') {
                    this.onDelete(+event.target.id);
                }
            }
        });
    }

    onDelete(index) {
        this.data.splice(index, 1);
        this.updateList();
    }

    onEdit(index) {
        const user = this.data.find((item) => item.id === index);
        user.content = 
        this.updateList();
    }

    updateList() {
        this.contactsList.innerHTML = '';

        this.data.forEach((user, index) => {
            const contactsElem = document.createElement('div');
            contactsElem.classList.add('contacts__item');
            
            contactsElem.dataset.id = user.data.id;

            contactsElem.innerHTML = user.data.content;

            this.contactsList.appendChild(contactsElem);
            const button = document.createElement('button');
            button.id = index;
            button.innerHTML = 'delete';
            contactsElem.appendChild(button);
        });
    }

    onAdd(event) {
        if (event.ctrlKey != true || event.key != 'Enter') return;
        if (event.target.value.length == 0) return;

        this.add({
            content: event.target.value
        })

        this.updateList();
        event.target.value = '';
    }
}

new ContactsApp();