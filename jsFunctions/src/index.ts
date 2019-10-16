import * as countries from "./countries.json";
import * as school from "./school.json";
import {Conversions} from "./conversions";
import {SchoolConversation} from "./schoolConversion";

console.log(Conversions.exercise8(countries));

console.log(SchoolConversation.getStudents(school));