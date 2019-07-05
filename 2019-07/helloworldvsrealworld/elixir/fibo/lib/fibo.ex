defmodule Fibo do
  @moduledoc """
  Documentation for Fibo.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Fibo.hello()
      :world

  """
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

Benchee.run(
  %{
    "flat_map" => fn -> Fibo.fib(18) end,
  }
)
