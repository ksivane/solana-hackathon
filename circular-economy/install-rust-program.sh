#!/usr/bin/env bash

set -eux
set -o pipefail


cd ce && solana program deploy dist/program/ce.so && cd ..
