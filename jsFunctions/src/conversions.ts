import * as _ from "lodash";
import { pipeline } from "stream";

interface Country {
    name:string;
    region:string;
    population:number;
    area:string;
    languages:Array<Language>;
    subregion:string;
    currencies: Array<Currency>;
}

interface Currency {
    code: string;
    name: string;
    symbol: string;
}

interface Language{
          iso639_1: string;
          iso639_2: string;
          name: string;
          nativeName: string;
}

interface CurrencyOccurance {
    currency:string;
    countries:Array<string>;
    count:number;
}

export class Conversions {
    static excercise1(input: Array<Country>):Array<string>{
        return input.map((country => country.name));
    }

    static excercise2(input: Array<Country>):Array<string>{
        return input
        .filter(({region}) => region === "Europe")
        .map(country => country.name);
    }

    static excercise3(input: Array<Country>):Array<{name:string, area:string}>{
        return input
        .filter(({population}) => population > 100000000)
        .map(({name,area}) => ({name,area:area + "km2"}));
    }

    static excercise4(input: Array<Country>):Array<Language>{
        return input
        .filter(({subregion}) => subregion ==="South America")
        .map(({languages}) => languages)
        .flat()
        .reduce((acc, lang) => {
            return acc.some(langFromAcc => langFromAcc.name === lang.name) ? acc : [...acc, lang]
        }, []);
    }

    static excercise5(input: Array<Country>):{ [key:string]:Array<string> }{

        const addCountry = (
            languages : Array<Language>, 
            country:string
            ) : Array<{language:string; country: string}> => {
            return languages.map(({ name }) => ({language: name, country: country}));
        };

        return input
        .filter(({subregion}) => subregion === "South America")
        .map(({ name, languages }) => addCountry(languages, name))
        .flat() 
        .reduce((acc, pair) => {
            return {...acc,[pair.language]:[...(acc[pair.language] || []), pair.country]};
        }, {});
    }

    // static excercise6(input: Array<Country>):Array<{ language: string, countries: Array<String>}>{
    //     return Object.entries(Conversions.exercise5(input))
    //     .map(([ language, countries ]) => ({ language, countries })
    //     );
    // }


    static excercise6(input: Array<Country>): Array<{language: string; countries: Array<string>}>{
       return Object.entries(Conversions.excercise5(input))
       .map(
           ([ language, countries])=> ({language, countries}));
        //    pair => ({ language: pair[0], countries:pair[1]})
    //    );
    }

    static excercise7(input: Array<Country>): any {
        const addCountry = (currencies: Array<Currency>, country: string):Array<{currency:string; country:string}> => {
          return currencies.map(({ name }) => ({ currency: name, country }));
        };
    
        const getCurrencyAndCountryArray = (input: Array<Country>) : Array<{currency:string; country:string}> => {
          return input.flatMap(({ currencies, name }) =>
            addCountry(currencies, name)
          );
        };
    
        const combineCountries = (input: Array<{currency: string; country: string}>):{[key:string]:Array<string>} => { //[key:string] neviem ako sa budu volat key
          return input.reduce((acc, pair) => {
            return {
              ...acc,
              [pair.currency]: acc[pair.currency] ? [...acc[pair.currency],pair.country] : [pair.country] //per vlastnost napr EURO idem dat novy hodnotu
            };
          }, {});
        };
    
        const arrayOfCurrenciesAndArraysOfCountries = (input: {[key:string]:Array<string>}) : Array<CurrencyOccurance> => {
          return Object.entries(input).map(([currency, countries]) => ({  //prvy prvok si ulozim do premennej currency a countries ([currency, countries])
            currency,
            countries,
            count: countries.length
          }));
        };
    
        const filterFivePlusCurrencies = (input: Array<CurrencyOccurance>):Array<CurrencyOccurance> => {
          return input.filter(({ count }) => count >= 5);
        };
        
        const sortArray = (input: Array<CurrencyOccurance>):Array<CurrencyOccurance> => {
            return input.sort((a,b) => a.count-b.count);
        };


        const pipe = (...fns) =>
      fns.reduceRight((f, g) => (...args) => f(g(...args)));


        return pipe(
            getCurrencyAndCountryArray,
            combineCountries,
            arrayOfCurrenciesAndArraysOfCountries,
            filterFivePlusCurrencies,
            sortArray
        )(input);

        // return sortArray(filterFivePlusCurrencies(
        //   arrayOfCurrenciesAndArraysOfCountries(
        //     combineCountries(getCurrencyAndCountryArray(input))
        //     )
        //   )
        // );

        // return _.flow([
        //     getCurrencyAndCountryArray,
        //     combineCountries,
        //     arrayOfCurrenciesAndArraysOfCountries,
        //     filterFivePlusCurrencies,
        //     sortArray
        // ])(input);
      }


      static exercise8(input:Array<Country>){
          //a
        const populLang = (languages:Array<Language>,population:number)=>{
            return languages.map((input) => ({name:input.name,population:population}));
        };
        
        const languageToCountArray = (input:Array<Country>):Array<{name:string,population:number}> => {
            return input.map(input => populLang(input.languages,input.population))
            .flat();
        };
        //a


        const languageToCountObject = (input:Array<{name:string,population:number}>):{[key:string]:number}=>{
            return input.reduce((acc,{name,population}) => {
                return {...acc,[name]:acc[name]?acc[name]+population : population} 
            },{});
        };
        
        const arrayOfLanguages = (input:{[key:string]:number}):Array<{language:string,count:number}>=>{
            return Object.entries(input).map(([language, count])=>{
                return {
                    language,
                    count:count,
                }
            });
        };
        
        const sortArray = (input:Array<{language:string,count:number}>):Array<{language:string,count:number}>=>{
            return input.sort((a,b) => b.count-a.count);
        };

        const topTen = (input:Array<{language:string,count:number}>):Array<{language:string,count:number}>=>{
            return input.filter((value,index) => index<=9);
        };

        const humanReadable = (input:Array<{language:string,count:number}>):Array<{language:string,count:string}>=>{
            return input.map(input => ({language:input.language,count:Math.round(input.count/1000000)/1000+" mld"}));
        }

        const toString = (input:Array<{language:string,count:string}>):string=>{
            return input.reduce((str,input) => {return str+=input.language+": "+input.count+" \n"},"");
        };

        return toString(humanReadable(topTen(sortArray(arrayOfLanguages(languageToCountObject(languageToCountArray(input)))))));
      }

}
