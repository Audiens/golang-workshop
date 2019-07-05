fn fibonacci(n: i32) -> i32
{
    if n == 0 {
        return 0;
    }

    if n == 1 {
        return 1;
    }

    return fibonacci((n-2))+fibonacci((n-1));

}

fn main()
{
    println!("Result {}", fibonacci(18));
}

