const maxSizeOfSet = 16777215;

export default class HSet { // <- forEach doesn't exist for this atm
    // conseal these values here from being accessed from outside
    // private hObj: {[key: string]: Set<string | number>}
    private hObj: (Set<string | number>)[]

    constructor (...input: (string | number)[]) {
        this.hObj = [new Set()]; // accessible from outside the class
        this.add(...input);
    }

    // add items to HSet -> returns true on success and false on failure
    // returns the elements it has inserted -> no elements inserted means it will return []
    public add (...input: (string | number)[]) {
        // check type
        if (typeof input !== "object" || typeof input?.map !== "function")
            return [];

        // get rid of the values that already exist in the HSet
        input = this.hasNot(...input);

        const lengthOfInput = input.length;
        let currentSet = this.hObj[this.hObj.length - 1],
            currentSetSize = currentSet.size
            
        // if input has no elements -> return empty array
        if (lengthOfInput === 0)
            return [];
    
        // add strings into hObj
        const returnArr = input.map((val, i) => {
            if (val && (typeof val === "string" || typeof val === "number")) {
                // check if current set is overflowing
                if ((currentSetSize + i + 1) > maxSizeOfSet) {
                    // add new set to the end of the array
                    this.hObj.push(new Set());

                    // make the code use the new set
                    currentSet = this.hObj[this.hObj.length - 1] // change current set
                    currentSetSize = 0; // the new set has size 0
                }

                // add the string to the last set in the Array
                currentSet.add(val);

                return val;
            }

            return undefined
        }).filter(n=> !!n) as string[]

        const lengthOfReturnArr = returnArr.length;        

        // check if no new strings were added
        if (lengthOfReturnArr === 0)
            return [];
        else return returnArr;
    }

    // check if the hObj has the string or any of the string array
    // return the elements that exist -> if no elements exists returns empty array
    public has (...input: (string | number)[]) {
        // check type
        if (typeof input !== "object" || typeof input?.map !== "function")
            return [];

        // if input has no elements return false
        if (input.length === 0)
            return [];

        let returnArr: (string | number)[] = [],
            atLestOneStringFound = false; // response from function

        // check if the hObj has the elements in the string array -> return elements found
        returnArr = input.map(val => {
            const response = this.hasString(val);
            if (response) {
                if (!atLestOneStringFound)
                atLestOneStringFound = true;

                return val;
            }
            else return undefined;
        }).filter(n => n) as (string | number)[]
        
        if (atLestOneStringFound)
            return returnArr;
        else return [];
    }

    // just like has, but returns the elements that don't exist in the HSet
    public hasNot (...input: (string | number)[]) {
        // check type
        if (typeof input !== "object" || typeof input?.map !== "function")
            return input;

        // if input has no elements return false
        if (input.length === 0)
            return input;

        let returnArr: (string | number)[] = [],
            atLestOneStringFound = false; // response from function

        // check if the hObj has the elements in the string array -> return elements not found
        returnArr = input.map(val => {
            const response = this.hasString(val);
            if (response) {
                if (!atLestOneStringFound)
                atLestOneStringFound = true;

                return undefined;
            }
            else return val;
        }).filter(n => n) as (string | number)[]
        
        if (atLestOneStringFound)
            return returnArr;
        else return input;
    }

    // delete an item from the HSet -> returns true when atleast one item waas deleted, else returns false if no items were deleted
    public delete (...input: (string | number)[]) { // the number of elements in the parameter cannot be > 4294967296 || 2^32
        // check the type of input
        if (typeof input !== "object" || typeof input.map !== "function")
            return false;
            16777215
        const inputLength = input.length; // the number of items to be deleted

        // if input is empty -> return false
        if (inputLength === 0)
            return false;

        // convert input to set -> these are the list of items to be deleted
        const lengthOfHObj = this.hObj.length;

        let returnResponse = false; // checks if atleast one item was deleted

        // delete the elements from the HSet
        for (let i = 0; i < lengthOfHObj ; i++) {        

            // iterate over each val in the inputSetArray and delete them from the set
            for (let j = 0; j < inputLength ; j++) {
                const valToDelete = input[j]; // get the val to delete

                if (this.hObj[i].delete(valToDelete)) {// item deleted                    
                    if (!returnResponse)
                        returnResponse = true;
                }
            }

        }

        // return response
        return returnResponse;
    }

    // clear all items from HSet -> doesn't return anything
    public clear () {
        this.hObj = [new Set()];
    }

    // get all the values in the HSet -> returns data in the form of an array
    public values() {
        let returnArray: (string | number)[] = [];

        if (this.size > 0) {
            // loop over all the existing Sets in the HSet
            this.hObj.forEach(hObjSet => {
                returnArray.push(...Array.from(hObjSet))
            })
        }

        return returnArray;
    }

    get size (): number {
        // calculate the size of the HSet
        let sizeOfAllSets: number = 0;

        this.hObj.forEach(hObj => {
            sizeOfAllSets += hObj.size;
        })

        return sizeOfAllSets;
    }

    // check if a string exists in the HSet
    protected hasString (val: (string | number)) { // return true || false
        if (typeof val !== "string" && typeof val !== "number") // exit condition
            return false;

        let response = false;

        const lengthOfHObj = this.hObj.length;
        // check if the string exists in any of the sets
        for (let i = 0; i < lengthOfHObj ; i++) {
            if (this.hObj[i].has(val)) {
                response = true;
                break;
            }
        }

        // return the response
        return response;
    }
}