import runner from './runner/runner'

export default () => {
    return "" +
        runner('+', 1, 1, 2) +
        runner('*', 7, 5, 2) +
        runner('?', 65, 92, 41)
}
