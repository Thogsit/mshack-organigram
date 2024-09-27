{
  description = "Flake utils demo";

  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.simpleFlake {
      inherit self nixpkgs;
      name = "Orga";
      shell = {pkgs}: pkgs.mkShell {
        name = "Orga";
        buildInputs = with pkgs; [nodejs];
      };
    };
}
