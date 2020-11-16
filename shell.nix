with import <nixpkgs> {};

stdenv.mkDerivation {
  name = "cip-metadata-communication-example";
  buildInputs = [
    (yarn.override { nodejs = nodejs-12_x; })
  ];
}
