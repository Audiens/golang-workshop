const runner = (what, argument1, argument2, argument3) => {

    let result

    switch (what) {
        case '+':
            result = argument1 + argument2 + argument3;
            break;
        case '*':
            result = argument1 * argument2 * argument3;
            break;
        default:
            result = 0;
            break;
    }

    return result;

}


export default runner

