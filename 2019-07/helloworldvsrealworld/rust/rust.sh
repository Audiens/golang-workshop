docker run \
-it --rm \
-v "$PWD":/usr/myapp \
-w /usr/myapp \
julia:stretch julia helloWorld.jl
