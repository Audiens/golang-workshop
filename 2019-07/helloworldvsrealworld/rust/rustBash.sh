docker run \
-it --rm \
-v "$PWD":/usr/myapp \
-w /usr/myapp \
rustlang/rust:nightly bash
