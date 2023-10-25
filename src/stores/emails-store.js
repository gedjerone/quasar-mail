import { defineStore } from 'pinia';
import { dateFormater } from 'src/utils/dateFormater';

const baseUrl = 'http://localhost:3000/emails/';
const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

function isIdExists(id) {
    return this?.emails.has(Number(id))
        ? true
        : false;
}

export const useEmailsStore = defineStore('emails', {
    state: () => ({
        emails: new Map(),
    }),
    getters: {
        getEmails: (state) => state.emails,
    },
    actions: {
        getCurrentEmail(id) {
            if (isIdExists.call(this, id)) {
                return this.getEmails.get(Number(id));
            } else {
                fetch(`${baseUrl}${id}`)
                    .then((response) => response.json())
                    .then((json) => {
                        this.emails.set(Number(json.id), {
                            id: json.id,
                            from: json.sentFrom,
                            subject: json.subject,
                            body: json.body,
                            to: json.sentTo,
                            date: json.date,
                            type: json.type,
                            isReaded: json.isReaded
                        });
                    })
                    .catch((err) => { return false })
            }
        },

        getNewEmails() {
            const amount = Math.floor(Math.random() * (10)) + 1;

            return fetch(`${baseUrl}generate?amount=${Number(amount)}`, {
                method: 'POST',
                headers: defaultHeaders
            })
        },

        fetchEmails() {
            fetch(`${baseUrl}`)
                .then((response) => response.json())
                .then((jsonArray) => {
                    jsonArray.map((json) => {
                        this.emails.set(Number(json.id), {
                            id: json.id,
                            from: json.sentFrom,
                            subject: json.subject,
                            body: json.body,
                            to: json.sentTo,
                            date: json.date,
                            type: json.type,
                            isReaded: json.isReaded
                        });
                    })
                })
                .catch((err) => console.err(err))
        },

        setReaded(id) {
            if (isIdExists.call(this, id)) {
                const email = this.emails.get(Number(id))
                return fetch(`${baseUrl}update?id=${Number(id)}`, {
                    method: 'POST',
                    headers: defaultHeaders,
                    body: JSON.stringify({
                        sentFrom: email.from,
                        sentTo: email.to,
                        subject: email.subject,
                        body: email.body,
                        type: email.type,
                        date: email.date,
                        isReaded: true
                    })
                })
            }
        },

        saveToDrafts(to, subject, body) {
            return fetch(`${baseUrl}create`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify({
                    sentFrom: 'me@gmail.com',
                    sentTo: to,
                    subject: subject,
                    body: body,
                    type: 'drafts',
                    date: dateFormater(new Date()),
                    isReaded: false
                })
            })
        },

        updateCurrentDraft(id, to, subject, body) {
            const emailId = Number(id);
            if (isIdExists.call(this, id)) {
                const email = this.emails.get(emailId);
                return fetch(`${baseUrl}update?id=${emailId}`, {
                    method: 'POST',
                    headers: defaultHeaders,
                    body: JSON.stringify({
                        sentFrom: email.from,
                        sentTo: to,
                        subject: subject,
                        body: body,
                        type: email.type,
                        date: email.date,
                        isReaded: email.isReaded
                    })
                })
            }
        },

        sendEmail(id) {
            const emailId = Number(id);
            if (isIdExists.call(this, id)) {
                const email = this.emails.get(emailId);
                return fetch(`${baseUrl}update?id=${emailId}`, {
                    method: 'POST',
                    headers: defaultHeaders,
                    body: JSON.stringify({
                        sentFrom: email.from,
                        sentTo: email.to,
                        subject: email.subject,
                        body: email.body,
                        type: 'sent',
                        date: email.date,
                        isReaded: email.isReaded
                    })
                })
            }
        },

        sendAllDrafts() {
            const promises = [];
            [...this.emails.values()].map((email) => {
                if (email.type === 'drafts') {
                    promises.push(
                        fetch(`${baseUrl}update?id=${Number(email.id)}`, {
                            method: 'POST',
                            headers: defaultHeaders,
                            body: JSON.stringify({
                                sentFrom: email.from,
                                sentTo: email.to,
                                subject: email.subject,
                                body: email.body,
                                type: 'sent',
                                date: email.date,
                                isReaded: email.isReaded
                            })
                        })
                    )
                }
            });
            return Promise.all(promises);
        },
    },
});