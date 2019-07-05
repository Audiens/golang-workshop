#![feature(test)]

extern crate test;

#[cfg(test)]
mod tests {
    use super::fibonacci;
    use test::Bencher;

    #[bench]
    fn bench_fib(b: &mut Bencher) {
        b.iter(|| fibonacci(50));
    }
}

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
