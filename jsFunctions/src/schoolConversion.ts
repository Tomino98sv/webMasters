import * as _ from "lodash";

interface Subject{
    predmet:string;
    studenti:Array<string>;
}

export class SchoolConversation{

    static getStudents1(school:Array<Subject>):Array<string>{
        const result: Array<string> = [];
        for(let i =0;i<school.length;i++){
            for(let j=0;j<school[i].studenti.length;j++){
                if(!result.includes(school[i].studenti[j])){
                    result.push(school[i].studenti[j]);
                }
            }
        }
        return result;
    }

    static getStudents(school:Array<Subject>):any{
        
        const sOpakovanie = (school: Array<Subject>): Array<string> => {
            return school.flatMap(({studenti}) => studenti);
        }
        
        const bezOpakovania = (students:Array<string>):Array<string> => {
            return students.reduce((result, name)=> {
                return ( result.includes(name) ? result : [...result,name] );
        },[]);
        }

        const tap = f => value => {
            f(value);
            return value;
        };

        return _.flow([
            sOpakovanie,
            tap(value => console.log('medzivysledok ' + value)),
            bezOpakovania])(school);
    }
}