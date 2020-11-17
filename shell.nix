with import <nixpkgs> {};

stdenv.mkDerivation {
  name = "cip-metadata-communication-example";
  buildInputs = [
    nodejs-12_x
    (yarn.override { nodejs = nodejs-12_x; })
  ];
}
