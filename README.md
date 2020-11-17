## CIP? Metadata on-chain communication example

This repository contains a simple example of CIP? on-chain communication.

### Usage

### Installation

:bulb: Before starting, make sure you have a synced instance of [cardano-db-sync](https://github.com/input-output-hk/cardano-db-sync) running.

First, install the script dependency.

```bash
$ yarn
yarn install v1.22.5
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 0.20s.

```

### Message formatting

The content of the message needs to be split into chunks of 64 bytes strings, as in the [chunks.js](./chunks.js) example.

### Proof of concept: Message board communication

We are providing an example to fetch the related metadata communication labelled as `1990` and therefore the "message
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

### Proof of concept: Direct communication

In this case, we want to list the direct communication to the stake address.

```
$ yarn run 1991 stake_test1uqdh4jvf25ukt3p6h6qqem9qnavl782xsnufpsl93wjxsecsr6wwl
yarn run v1.22.5

Fetching metadata for address stake_test1uqdh4jvf25ukt3p6h6qqem9qnavl782xsnufpsl93wjxsecsr6wwl

TITLE: Let me tell you what is Cardano.
BODY:  Cardano is built by a decentralized community of scientists, engineers, and thought leaders united in a common purpose: to create a technology platform that will ignite the positive change the world needs. We believe the future should not be defined by the past, and that more is possible and, through technology, can be made possible for all. We measure the worth of a task not by its challenge, but by its results. Every ada holder also holds a stake in the Cardano network. Ada stored in a wallet can be delegated to a stake pool to earn rewards to participate in the successful running of the network or pledged to a stake pool to increase the pools likelihood of receiving rewards. In time, ada will also be usable for a variety of applications and services on the Cardano platform.
LINK:  https://cardano.org/

	 ~~ 

TITLE: This is a DM.
BODY:  This is a direct message, not from pool, but from buddies.
LINK:  https://cardano.org/

	 ~~ 

Done in 0.28s.
```

We can also filter these messages based on the stake pool it has come from.


```
$ yarn run 1991 stake_test1uqdh4jvf25ukt3p6h6qqem9qnavl782xsnufpsl93wjxsecsr6wwl 26b17b78de4f035dc0bfce60d1d3c3a8085c38dcce5fb8767e518bed
yarn run v1.22.5
Fetching metadata for address stake_test1uqdh4jvf25ukt3p6h6qqem9qnavl782xsnufpsl93wjxsecsr6wwl


TITLE: Let me tell you what is Cardano.
BODY:  Cardano is built by a decentralized community of scientists, engineers, and thought leaders united in a common purpose: to create a technology platform that will ignite the positive change the world needs. We believe the future should not be defined by the past, and that more is possible and, through technology, can be made possible for all. We measure the worth of a task not by its challenge, but by its results. Every ada holder also holds a stake in the Cardano network. Ada stored in a wallet can be delegated to a stake pool to earn rewards to participate in the successful running of the network or pledged to a stake pool to increase the pools likelihood of receiving rewards. In time, ada will also be usable for a variety of applications and services on the Cardano platform.
LINK:  https://cardano.org/

	 ~~ 

Done in 0.37s.
```