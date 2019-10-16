"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class SchoolConversation {
    static getStudents1(school) {
        const result = [];
        for (let i = 0; i < school.length; i++) {
            for (let j = 0; j < school[i].studenti.length; j++) {
                if (!result.includes(school[i].studenti[j])) {
                    result.push(school[i].studenti[j]);
                }
            }
        }
        return result;
    }
    static getStudents(school) {
        const sOpakovanie = (school) => {
            return school.flatMap(({ studenti }) => studenti);
        };
        const bezOpakovania = (students) => {
            return students.reduce((result, name) => {
                return (result.includes(name) ? result : [...result, name]);
            }, []);
        };
        const tap = f => value => {
            f(value);
            return value;
        };
        return _.flow([
            sOpakovanie,
            tap(value => console.log('medzivysledok ' + value)),
            bezOpakovania
        ])(school);
    }
}
exports.SchoolConversation = SchoolConversation;
//# sourceMappingURL=schoolConversion.js.map