## CIP? Metadata on-chain communication example

This repository contains a simple example of CIP? on-chain communication.

### Usage

### Installation

:bulb: Before starting, make sure you have a synced instance of [cardano-db-sync](https://github.com/input-output-hk/cardano-db-sync) running.

First install the script dependency.

```bash
$ yarn
yarn install v1.22.5
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 0.20s.

```

### Message formating

The content of the message needs to be split into chunks of 64 bytes strings, as in the [chunks.js](./chunks.js) example.

### Proof of concept: Message board communication

We are providing an example to fetch the related metadata communication labeled as `1990` and therefore the "message
board communication" related to the pool id `26b17b78de4f035dc0bfce60d1d3c3a8085c38dcce5fb8767e518bed`.

```
$ yarn run 1990 26b17b78de4f035dc0bfce60d1d3c3a8085c38dcce5fb8767e518bed
yarn run v1.22.5

Fetching metadata for stake pool 26b17b78de4f035dc0bfce60d1d3c3a8085c38dcce5fb8767e518bed

TITLE: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
BODY:  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
LINK:  https://example.com/blog.html

	 	 	 	 	 ~~ 

Done in 0.29s.
```
