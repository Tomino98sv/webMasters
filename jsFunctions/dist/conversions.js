"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Conversions {
    static excercise1(input) {
        return input.map((country => country.name));
    }
    static excercise2(input) {
        return input
            .filter(({ region }) => region === "Europe")
            .map(country => country.name);
    }
    static excercise3(input) {
        return input
            .filter(({ population }) => population > 100000000)
            .map(({ name, area }) => ({ name, area: area + "km2" }));
    }
    static excercise4(input) {
        return input
            .filter(({ subregion }) => subregion === "South America")
            .map(({ languages }) => languages)
            .flat()
            .reduce((acc, lang) => {
            return acc.some(langFromAcc => langFromAcc.name === lang.name) ? acc : [...acc, lang];
        }, []);
    }
    static excercise5(input) {
        const addCountry = (languages, country) => {
            return languages.map(({ name }) => ({ language: name, country: country }));
        };
        return input
            .filter(({ subregion }) => subregion === "South America")
            .map(({ name, languages }) => addCountry(languages, name))
            .flat()
            .reduce((acc, pair) => {
            return { ...acc, [pair.language]: [...(acc[pair.language] || []), pair.country] };
        }, {});
    }
    // static excercise6(input: Array<Country>):Array<{ language: string, countries: Array<String>}>{
    //     return Object.entries(Conversions.exercise5(input))
    //     .map(([ language, countries ]) => ({ language, countries })
    //     );
    // }
    static excercise6(input) {
        return Object.entries(Conversions.excercise5(input))
            .map(([language, countries]) => ({ language, countries }));
        //    pair => ({ language: pair[0], countries:pair[1]})
        //    );
    }
    static excercise7(input) {
        const addCountry = (currencies, country) => {
            return currencies.map(({ name }) => ({ currency: name, country }));
        };
        const getCurrencyAndCountryArray = (input) => {
            return input.flatMap(({ currencies, name }) => addCountry(currencies, name));
        };
        const combineCountries = (input) => {
            return input.reduce((acc, pair) => {
                return {
                    ...acc,
                    [pair.currency]: acc[pair.currency] ? [...acc[pair.currency], pair.country] : [pair.country] //per vlastnost napr EURO idem dat novy hodnotu
                };
            }, {});
        };
        const arrayOfCurrenciesAndArraysOfCountries = (input) => {
            return Object.entries(input).map(([currency, countries]) => ({
                currency,
                countries,
                count: countries.length
            }));
        };
        const filterFivePlusCurrencies = (input) => {
            return input.filter(({ count }) => count >= 5);
        };
        const sortArray = (input) => {
            return input.sort((a, b) => a.count - b.count);
        };
        const pipe = (...fns) => fns.reduceRight((f, g) => (...args) => f(g(...args)));
        return pipe(getCurrencyAndCountryArray, combineCountries, arrayOfCurrenciesAndArraysOfCountries, filterFivePlusCurrencies, sortArray)(input);
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
    static exercise8(input) {
        //a
        const populLang = (languages, population) => {
            return languages.map((input) => ({ name: input.name, population: population }));
        };
        const languageToCountArray = (input) => {
            return input.map(input => populLang(input.languages, input.population))
                .flat();
        };
        //a
        const languageToCountObject = (input) => {
            return input.reduce((acc, { name, population }) => {
                return { ...acc, [name]: acc[name] ? acc[name] + population : population };
            }, {});
        };
        const arrayOfLanguages = (input) => {
            return Object.entries(input).map(([language, count]) => {
                return {
                    language,
                    count: count,
                };
            });
        };
        const sortArray = (input) => {
            return input.sort((a, b) => b.count - a.count);
        };
        const topTen = (input) => {
            return input.filter((value, index) => index <= 9);
        };
        const humanReadable = (input) => {
            return input.map(input => ({ language: input.language, count: Math.round(input.count / 1000000) / 1000 + " mld" }));
        };
        const toString = (input) => {
            return input.reduce((str, input) => { return str += input.language + ": " + input.count + " \n"; }, "");
        };
        return toString(humanReadable(topTen(sortArray(arrayOfLanguages(languageToCountObject(languageToCountArray(input)))))));
    }
}
exports.Conversions = Conversions;
//# sourceMappingURL=conversions.js.map