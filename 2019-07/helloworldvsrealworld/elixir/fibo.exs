defmodule Recursion do

    def fib(n) when n == 0 do
     0
    end

    def fib(n) when n ==1 do
      1
    end

    def fib(n) do
      fib(n-2) + fib(n-1)
    end
end


IO.puts Recursion.fib(10)




