
// Find the minimum edits needed to transform word A to word B, use the result
// from this function to rank the search results in terms of similarities
// "a" is user input
const minimumEditDistance = (a: string, b: string) => {
    // if a is longer than b, then b definitely doesn't match
    if (a == null || b == null || a.length > b.length) {
        return null;
    };

    // see if a letter in a is not in b,
    // for instance, a = 'pear', b = 'apple', letter 'r' is not in b, therefore, b is not shown in the list
    const bset = new Set(b.split(''));
    const atLeastOneLetterNotInB = a.split('').some((letter)=>!bset.has(letter));
    if (atLeastOneLetterNotInB) {
        return null;
    };

    // same word, therefore 0 eidts needed
    if (a === b) {
        return 0;
    };

    // Below finds the minimal 'distance' between two words using DP,
    // which means how many edits (replace, delete, insert) a takes to become b
    // This is useful in situations when words very similar:
        // if user inputs 'jack', and the choices are 'jackie' and 'jacky',
        // than 'jacky' will be ranked/appear higher on the list than 'jackie', because 'jack' -> 'jacky' takes
        // less edits than 'jackie'

    // construct cache for DP
    const cache = [];
    for (let i = 0; i < a.length + 1; i++) {
        const row = [];
        for (let j = 0; j < b.length + 1; j++) {
            row.push(Number.MAX_VALUE);
        };
        cache.push(row);
    };

    // construct base case
    // bottom row for when word A is empty 
    // should be N, N-1...0, N = B.length
    for (let i = 0; i < b.length + 1; i++) {
        cache[a.length][i] = b.length - i;
    };

    // right most row for when word B is empty
    // should be N, N-1...0, N = A.length
    for (let j = 0; j < a.length + 1; j++) {
        cache[j][b.length] = a.length - j;
    };

    for (let i = a.length - 1; i >= 0; i--) {
        for (let j = b.length - 1; j >=0; j--) {
            if (a[i] === b[j]) {
                cache[i][j] = cache[i+1][j+1];
            } else {
                // use the minimum of all three neighbors:
                // right => insert
                // down => delete
                // diagonal => replace
                cache[i][j] = 1 + Math.min(
                    cache[i+1][j],
                    cache[i][j+1],
                    cache[i+1][j+1]
                );
            };
        };
    };

    return cache[0][0];
}

export { minimumEditDistance };
