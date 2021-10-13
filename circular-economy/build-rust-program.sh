#!/usr/bin/env bash

set -eux
set -o pipefail


cd ce && npm run build:program-rust && cd ..
